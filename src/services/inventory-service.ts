import { PrismaClient, StockStatus } from '@prisma/client'

export class InventoryService {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  // Tambah Stok Produk (Entry Baru)
  async addProductStock(productId: string, supplierId: string, quantity: number, expiryDate: Date) {
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
          supplierId,
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
        },
        include: {
          stockChanges: true
        }
      })

      console.log('inventor entry result', inventoryEntry)

      // create waybill
      const currentDate = new Date()
      const waybillNumber = `WB-${currentDate.getFullYear()}${(currentDate.getMonth() + 1).toString().padStart(2, '0')}${currentDate.getDate().toString().padStart(2, '0')}-${Math.random().toString(36).substr(2, 5)}`

      await tx.waybill.create({
        data: {
          stockChangeId: inventoryEntry.stockChanges[0].id,
          waybillNumber,
          status: 'PENAMBAHAN',
          waybillDate: currentDate
        }
      })

      return inventoryEntry
    })
  }

  // Kurangi Stok Produk (Metode FIFO)
  async reduceProductStock(productId: string, quantityToReduce: number) {
    const currentDate = new Date()
    const waybillNumber = `WB-${currentDate.getFullYear()}${(currentDate.getMonth() + 1).toString().padStart(2, '0')}${currentDate.getDate().toString().padStart(2, '0')}-${Math.random().toString(36).substr(2, 5)}`

    console.log({ waybillNumber })

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

      console.log({ availableEntries })

      // cek total stock
      const totalStock = availableEntries.reduce((total, entry) => total + entry.remainingQuantity, 0)

      // handle if demand is greater than available stock
      if (remainingToReduce > totalStock) {
        throw new Error('Insufficient stock: cannot reduce more than available quantity.')
      }

      for (const entry of availableEntries) {
        if (remainingToReduce <= 0) break //Jika tidak ada lagi yang perlu dikurangi, keluar dari loop.

        console.log({ remainingToReduce })

        console.log('what this', entry.remainingQuantity)

        const reduceQuantity = Math.min(entry.remainingQuantity, remainingToReduce)

        console.log({ reduceQuantity })

        // Update sisa kuantitas
        await tx.inventoryEntry.update({
          where: { id: entry.id },
          data: {
            remainingQuantity: { decrement: reduceQuantity },
            status: this.determineStockStatus(entry.remainingQuantity - reduceQuantity, entry.expiryDate)
          }
        })

        // Catat perubahan stok
        const stockChange = await tx.stockChange.create({
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

        // create waybill
        await tx.waybill.create({
          data: {
            stockChangeId: stockChange.id,
            waybillNumber: waybillNumber,
            status: 'PENGURANGAN',
            waybillDate: new Date()
          }
        })
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
          include: {
            supplier: {
              select: {
                name: true
              }
            }
          },

          orderBy: { fifoSequence: 'desc' }
        }
      }
    })

    return products.map(product => ({
      productId: product.id,
      supplierId: product.id,
      productName: product.name,
      totalStock: product.inventoryEntries.reduce((sum, entry) => sum + entry.remainingQuantity, 0),
      entries: product.inventoryEntries.map(entry => ({
        batchNumber: entry.batchNumber,
        remainingQuantity: entry.remainingQuantity,
        expiryDate: entry.expiryDate,
        status: entry.status,
        supplierName: entry.supplier.name
      }))
    }))
  }
}
