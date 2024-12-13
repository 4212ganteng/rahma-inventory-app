import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { number } from 'valibot'

import { InventoryService } from '@/services/inventory-service'

export class InventoryController {
  private inventoryService: InventoryService

  constructor() {
    this.inventoryService = new InventoryService()
  }

  // Tambah Stok Produk
  async addStock(req: NextRequest) {
    try {
      const { productId, quantity, expiryDate } = await req.json()

      const newEntry = await this.inventoryService.addProductStock(productId, Number(quantity), new Date(expiryDate))

      return NextResponse.json(
        {
          message: 'Stok berhasil ditambahkan',
          data: newEntry
        },
        { status: 201 }
      )
    } catch (error) {
      return this.handleError(error)
    }
  }

  // Kurangi Stok Produk
  async reduceStock(req: NextRequest) {
    try {
      const { productId, quantity } = await req.json()

      const reducedEntries = await this.inventoryService.reduceProductStock(productId, quantity)

      return NextResponse.json(
        {
          message: 'Stok berhasil dikurangi',
          data: reducedEntries
        },
        { status: 200 }
      )
    } catch (error) {
      return this.handleError(error)
    }
  }

  // Dapatkan Laporan Stok
  async getInventoryReport() {
    try {
      const report = await this.inventoryService.getInventoryReport()

      return NextResponse.json(
        {
          message: 'Laporan stok berhasil diambil',
          data: report
        },
        { status: 200 }
      )
    } catch (error) {
      return this.handleError(error)
    }
  }

  // Handler Error Umum
  private handleError(error: unknown) {
    console.error('Inventory Error:', error)

    return NextResponse.json(
      {
        message: 'Terjadi kesalahan dalam memproses permintaan',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
