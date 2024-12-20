import { NextResponse } from 'next/server'

import prisma from '@/utils/prisma'

export async function GET() {
  try {
    // count product
    const totalProduct = await prisma.product.count()

    // count product status Empty
    const emptyProductStatus = await prisma.inventoryEntry.groupBy({
      by: ['productId'],
      where: {
        status: 'KOSONG'
      },
      _count: {
        productId: true
      }
    })

    // count product status Almost out of stock
    const almostOutOfStockProductStatus = await prisma.inventoryEntry.groupBy({
      by: ['productId'],
      where: {
        status: 'HAMPIR_HABIS'
      },
      _count: {
        productId: true
      }
    })

    // count product status Expired
    const expiredProductStatus = await prisma.inventoryEntry.groupBy({
      by: ['productId'],
      where: {
        status: 'KADALUWARSA'
      },
      _count: {
        productId: true
      }
    })

    // count product status Availbale
    const availableProductStatus = await prisma.inventoryEntry.groupBy({
      by: ['productId'],
      where: {
        status: 'TERSEDIA'
      },
      _count: {
        productId: true
      }
    })

    // TOTAL ALL ITEMS
    const totalReamainingStock = await prisma.inventoryEntry.aggregate({
      _sum: {
        remainingQuantity: true
      }
    })

    // total item stock of expired
    const totalRemainingStockExpired = await prisma.inventoryEntry.aggregate({
      where: {
        status: 'KADALUWARSA'
      },
      _sum: {
        remainingQuantity: true
      }
    })

    // total item stock of available
    const totalRemainingStockAvailable = await prisma.inventoryEntry.aggregate({
      where: {
        status: 'TERSEDIA'
      },
      _sum: {
        remainingQuantity: true
      }
    })

    console.log(totalRemainingStockAvailable)

    // total item stock of Almost out off stock
    const totalRemainingStockAlmostOutOfStock = await prisma.inventoryEntry.aggregate({
      where: {
        status: 'HAMPIR_HABIS'
      },
      _sum: {
        remainingQuantity: true
      }
    })

    const calculatePercentage = (part: number, total: number) => {
      if (total === 0) return 0 // Menghindari pembagian dengan nol

      return Math.round((part / total) * 100)
    }

    // Hitung persentase status produk
    const productStatusPercentage = {
      expired: calculatePercentage(expiredProductStatus.length, totalProduct),
      empty: calculatePercentage(emptyProductStatus.length, totalProduct),
      almostOutOfStock: calculatePercentage(almostOutOfStockProductStatus.length, totalProduct),
      available: calculatePercentage(availableProductStatus.length, totalProduct)
    }

    // Hitung persentase stok berdasarkan status
    const stockStatusPercentage = {
      expired: calculatePercentage(
        totalRemainingStockExpired._sum.remainingQuantity || 0,
        totalReamainingStock._sum.remainingQuantity || 0
      ),
      empty: calculatePercentage(0, totalReamainingStock._sum.remainingQuantity || 0), // Tidak ada data stok kosong
      almostOutOfStock: calculatePercentage(
        totalRemainingStockAlmostOutOfStock._sum.remainingQuantity || 0,
        totalReamainingStock._sum.remainingQuantity || 0
      ),
      available: calculatePercentage(
        totalRemainingStockAvailable._sum.remainingQuantity || 0,
        totalReamainingStock._sum.remainingQuantity || 0
      )
    }

    return NextResponse.json({
      data: {
        totalProduct,
        expiredProductStatus: expiredProductStatus.length,
        emptyProductStatus: emptyProductStatus.length,
        almostOutOfStockProductStatus: almostOutOfStockProductStatus.length,
        availableProductStatus: availableProductStatus.length,
        totalReamainingStock: totalReamainingStock._sum.remainingQuantity,
        totalRemainingStockExpired: totalRemainingStockExpired._sum.remainingQuantity,
        totalRemainingStockAvailable: totalRemainingStockAvailable._sum.remainingQuantity,
        totalRemainingStockAlmostOutOfStock: totalRemainingStockAlmostOutOfStock._sum.remainingQuantity,
        productStatusPercentage,
        stockStatusPercentage
      }
    })
  } catch (error) {
    return NextResponse.json(
      {
        message: `something wrong ${error}`
      },
      { status: 500 }
    )
  }
}
