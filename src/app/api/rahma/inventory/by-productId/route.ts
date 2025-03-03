import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import prisma from '@/utils/prisma'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const productId = searchParams.get('productId') || ''

  try {
    const inventoryByProductId = await prisma.inventoryEntry.findMany({
      where: {
        productId: productId
      },
      include: {
        product: {
          select: {
            name: true,
            sku: true
          }
        },
        supplier: {
          select: {
            name: true
          }
        }
      },

      orderBy: {
        fifoSequence: 'desc'
      }
    })

    console.log({ inventoryByProductId })

    const productName = inventoryByProductId[0].product?.name
    const productSku = inventoryByProductId[0].product?.sku
    const totalStock = inventoryByProductId.reduce((sum, entry) => sum + entry.remainingQuantity, 0)

    const result = {
      productName,
      productSku,
      totalStock,
      totalData: inventoryByProductId.length,
      inventoryByProductId
    }

    return NextResponse.json({ data: result })
  } catch (error) {
    return NextResponse.json(
      {
        message: `something wrong ${error}`
      },
      { status: 500 }
    )
  }
}
