import { PrismaClient, StockStatus } from '@prisma/client'

export class InventoryService {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  // Tambah Stok Produk (Entry Baru)
  async addProductStock(productId: string, quantity: number, expiryDate: Date) {
    return this.prisma.$transaction(async tx => {
      // Generate batch number unik
      const batchNumber = `BATCH-${Date.now()}`

      // Hitung urutan FIFO
      const lastEntry = await tx.inventoryEntry.findFirst({
        orderBy: { fifoSequence: 'desc' },
        select: { fifoSequence: true }
      })

      const fifoSequence = (lastEntry?.fifoSequence || 0) + 1

      // Tentukan status stok
      const status = this.determineStockStatus(quantity, expiryDate)

      // Buat entri inventori
      const inventoryEntry = await tx.inventoryEntry.create({
        data: {
          productId,
          batchNumber,
          quantity,
          remainingQuantity: quantity,
          expiryDate,
          status,
          fifoSequence,
          stockChanges: {
            create: {
              changeType: 'PENAMBAHAN',
              quantity,
              description: 'Stok Awal'
            }
          }
        }
      })

      return inventoryEntry
    })
  }

  // Kurangi Stok Produk (Metode FIFO)
  async reduceProductStock(productId: string, quantityToReduce: number) {
    return this.prisma.$transaction(async tx => {
      // Ambil entri inventori berdasarkan FIFO (urutan terawal)
      const availableEntries = await tx.inventoryEntry.findMany({
        where: {
          productId,
          remainingQuantity: { gt: 0 }
        },
        orderBy: { fifoSequence: 'asc' }
      })

      let remainingToReduce = quantityToReduce

      const reducedEntries: {
        entryId: string
        reducedQuantity: number
      }[] = []

      for (const entry of availableEntries) {
        if (remainingToReduce <= 0) break

        const reduceQuantity = Math.min(entry.remainingQuantity, remainingToReduce)

        // Update sisa kuantitas
        await tx.inventoryEntry.update({
          where: { id: entry.id },
          data: {
            remainingQuantity: { decrement: reduceQuantity },
            status: this.determineStockStatus(entry.remainingQuantity - reduceQuantity, entry.expiryDate)
          }
        })

        // Catat perubahan stok
        await tx.stockChange.create({
          data: {
            inventoryEntryId: entry.id,
            changeType: 'PENGURANGAN',
            quantity: reduceQuantity,
            description: 'Pengurangan Stok'
          }
        })

        reducedEntries.push({
          entryId: entry.id,
          reducedQuantity: reduceQuantity
        })

        remainingToReduce -= reduceQuantity
      }

      return reducedEntries
    })
  }

  // Cek Status Stok
  private determineStockStatus(quantity: number, expiryDate: Date): StockStatus {
    const today = new Date()
    const daysUntilExpiry = this.calculateDaysBetween(today, expiryDate)

    if (quantity === 0) return StockStatus.KOSONG
    if (quantity < 10) return StockStatus.HAMPIR_HABIS
    if (daysUntilExpiry <= 30) return StockStatus.KADALUWARSA

    return StockStatus.TERSEDIA
  }

  // Hitung Hari Antara Dua Tanggal
  private calculateDaysBetween(startDate: Date, endDate: Date): number {
    const millisecondsPerDay = 1000 * 60 * 60 * 24
    const timeDiff = endDate.getTime() - startDate.getTime()

    return Math.ceil(timeDiff / millisecondsPerDay)
  }

  // Dapatkan Laporan Stok
  async getInventoryReport() {
    const products = await this.prisma.product.findMany({
      include: {
        inventoryEntries: {
          orderBy: { fifoSequence: 'desc' }
        }
      }
    })

    return products.map(product => ({
      productId: product.id,
      productName: product.name,
      totalStock: product.inventoryEntries.reduce((sum, entry) => sum + entry.remainingQuantity, 0),
      entries: product.inventoryEntries.map(entry => ({
        batchNumber: entry.batchNumber,
        remainingQuantity: entry.remainingQuantity,
        expiryDate: entry.expiryDate,
        status: entry.status
      }))
    }))
  }
}
