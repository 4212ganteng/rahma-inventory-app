import type { Product } from '@prisma/client'
import { PrismaClient, Prisma } from '@prisma/client'

type Tproduct = {
  name: string
  sku: string
  description: string | null
  categoryId: string
  unitId: string
  image: string
  minStockThreshold: number
}

export class ProductService {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  // Tambah Produk Baru
  async createProduct(data: Tproduct) {
    try {
      // Validasi SKU unik
      const existingSku = await this.prisma.product.findUnique({
        where: { sku: data.sku }
      })

      if (existingSku) {
        throw new Error('SKU sudah digunakan')
      }

      return await this.prisma.product.create({ data })
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // Dapatkan Semua Produk
  async getAllProducts(params?: { page?: number; limit?: number; category?: string }) {
    const { page = 1, limit = 10, category } = params || {}

    const where: Prisma.ProductWhereInput = category ? { category: category as any } : {}

    const totalProducts = await this.prisma.product.count({ where })

    const products = await this.prisma.product.findMany({
      where: {
        isDeleted: false
      },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        _count: {
          select: { inventoryEntries: true }
        },
        category: {
          select: { category: true }
        },
        unit: {
          select: { unit: true }
        }
      },

      orderBy: {
        id: 'desc'
      }
    })

    const totByCategory = await this.prisma.product.groupBy({
      by: ['categoryId']
    })

    const totByUnit = await this.prisma.product.groupBy({
      by: ['unitId']
    })

    const totalCategory = totByCategory.length
    const totalUnit = totByUnit.length

    const counttotalInventoryEntries = products.reduce((total, entriesInventory) => {
      return total + (entriesInventory._count.inventoryEntries || 0)
    }, 0)

    return {
      products: products.map(product => ({
        ...product,
        totalInventoryEntries: product._count.inventoryEntries
      })),

      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalProducts / limit),
        totalProducts,
        totalCategory,
        totalUnit,
        counttotalInventoryEntries
      }
    }
  }

  // Dapatkan Produk berdasarkan ID
  async getProductById(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        inventoryEntries: {
          orderBy: { entryDate: 'desc' },
          take: 5
        }
      }
    })

    if (!product) {
      throw new Error('Produk tidak ditemukan')
    }

    return product
  }

  // Update Produk
  async updateProduct(id: string, data: Product) {
    data.minStockThreshold = Number(data.minStockThreshold)

    try {
      return await this.prisma.product.update({
        where: { id },
        data
      })
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // Hapus Produk
  async deleteProduct(id: string) {
    try {
      // Cek apakah produk memiliki entri inventori
      const inventoryCount = await this.prisma.inventoryEntry.count({
        where: { productId: id }
      })

      if (inventoryCount > 0) {
        throw new Error('Tidak dapat menghapus produk yang memiliki entri inventori')
      }

      return await this.prisma.product.delete({
        where: { id }
      })
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // Handler Error
  private handleError(error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return new Error('Produk dengan SKU ini sudah ada')
      }
    }

    return error instanceof Error ? error : new Error('Terjadi kesalahan')
  }
}
