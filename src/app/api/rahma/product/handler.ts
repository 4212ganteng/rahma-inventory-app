import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { ProductCategory } from '@prisma/client'

import { ProductService } from '@/services/product-service'

export class ProductController {
  private productService: ProductService

  constructor() {
    this.productService = new ProductService()
  }

  // Buat Produk Baru
  async createProduct(req: NextRequest) {
    try {
      const body = await req.json()

      // Validasi input
      const { name, sku, category, unit, description, minStockThreshold } = body

      if (!name || !sku || !category || !unit) {
        return NextResponse.json({ message: 'Data produk tidak lengkap' }, { status: 400 })
      }

      // Validasi kategori
      if (!Object.values(ProductCategory).includes(category)) {
        return NextResponse.json({ message: 'Kategori produk tidak valid' }, { status: 400 })
      }

      const newProduct = await this.productService.createProduct({
        name,
        sku,
        categoryId,
        unit,
        description,
        minStockThreshold
      })

      return NextResponse.json(
        {
          message: 'Produk berhasil dibuat',
          data: newProduct
        },
        { status: 201 }
      )
    } catch (error) {
      return this.handleError(error)
    }
  }

  // Dapatkan Semua Produk
  async getAllProducts(req: NextRequest) {
    try {
      const { searchParams } = req.nextUrl

      const page = Number(searchParams.get('page') || '1')
      const limit = Number(searchParams.get('limit') || '10')
      const category = searchParams.get('category') || undefined

      const result = await this.productService.getAllProducts({
        page,
        limit,
        category
      })

      return NextResponse.json(result, { status: 200 })
    } catch (error) {
      return this.handleError(error)
    }
  }

  // Dapatkan Produk berdasarkan ID
  async getProductById(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const product = await this.productService.getProductById(params.id)

      return NextResponse.json(
        {
          message: 'Produk ditemukan',
          data: product
        },
        { status: 200 }
      )
    } catch (error) {
      return this.handleError(error)
    }
  }

  // Update Produk
  async updateProduct(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const body = await req.json()

      const updatedProduct = await this.productService.updateProduct(params.id, body)

      return NextResponse.json(
        {
          message: 'Produk berhasil diupdate',
          data: updatedProduct
        },
        { status: 200 }
      )
    } catch (error) {
      return this.handleError(error)
    }
  }

  // Hapus Produk
  async deleteProduct(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      await this.productService.deleteProduct(params.id)

      return NextResponse.json(
        {
          message: 'Produk berhasil dihapus'
        },
        { status: 200 }
      )
    } catch (error) {
      return this.handleError(error)
    }
  }

  // Handler Error Umum
  private handleError(error: unknown) {
    console.error('Product Error:', error)

    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : 'Terjadi kesalahan dalam memproses permintaan'
      },
      { status: 500 }
    )
  }
}
