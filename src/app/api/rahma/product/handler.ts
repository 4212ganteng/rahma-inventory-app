import { writeFile } from 'fs/promises'

import path from 'path'

import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

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

      console.log({ body })

      // Validasi input
      const { name, sku, categoryId, unitId, description, minStockThreshold } = body

      if (!name || !sku || !categoryId || !unitId) {
        return NextResponse.json({ message: 'Data produk tidak lengkap' }, { status: 400 })
      }

      const newProduct = await this.productService.createProduct({
        name,
        sku,
        categoryId,
        unitId,
        description,
        minStockThreshold: Number(minStockThreshold),
        image: ''
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

  // create product upload file
  async createProductUpfile(req: NextRequest) {
    const formData = await req.formData()

    const file = formData.get('image') as File
    const name = formData.get('name') as string
    const sku = formData.get('sku') as string
    const description = formData.get('description') as string
    const minStockThreshold = formData.get('minStockThreshold') as string
    const categoryId = formData.get('categoryId') as string
    const unitId = formData.get('unitId') as string

    if (!file) {
      console.log(file)
      console.log(typeof file)

      return NextResponse.json({ error: 'Gambar wajib di isi' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())

    const filename = file.name.replaceAll(' ', '_') || 'public/images/products/product1.png'

    console.log(filename)

    if (!name || !sku || !categoryId || !unitId) {
      return NextResponse.json({ message: 'Data produk tidak lengkap' }, { status: 400 })
    }

    try {
      await writeFile(path.join(process.cwd(), 'public/images/products/' + filename), buffer)

      const newProduct = await this.productService.createProduct({
        name,
        image: filename,
        sku,
        categoryId,
        unitId,
        description,
        minStockThreshold: Number(minStockThreshold)
      })

      console.log({ newProduct })

      return NextResponse.json({ message: 'Produk berhasil dibuat', data: newProduct }, { status: 201 })
    } catch (error) {
      console.log('Error occured ', error)

      return NextResponse.json({ message: 'Failed', error }, { status: 500 })
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
  async getProductById(req: NextRequest, id: string) {
    try {
      console.log('beneran id nih bos', id)
      const product = await this.productService.getProductById(id)

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
  async updateProduct(req: NextRequest, id: string) {
    try {
      const body = await req.json()

      const updatedProduct = await this.productService.updateProduct(id, body)

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
  async deleteProduct(req: NextRequest, id: string) {
    try {
      await this.productService.deleteProduct(id)

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
