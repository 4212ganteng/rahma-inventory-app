import { NextResponse } from 'next/server'

import prisma from '@/utils/prisma'

export async function GET() {
  try {
    const reportStockAddition = await prisma.stockChange.findMany({
      include: {
        inventoryEntry: {
          select: {
            product: {
              select: { name: true, sku: true }
            }
          }
        }
      },
      orderBy: {
        id: 'desc'
      }
    })

    return NextResponse.json({
      message: 'Report Logistic Data',
      data: reportStockAddition
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
