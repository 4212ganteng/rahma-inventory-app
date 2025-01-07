import { NextResponse } from 'next/server'

import prisma from '@/utils/prisma'

export async function GET() {
  try {
    const reportStockAddition = await prisma.waybill.findMany({
      include: {
        stockChange: {
          select: {
            inventoryEntry: {
              select: {
                product: {
                  select: {
                    name: true,
                    sku: true
                  }
                }
              }
            },
            quantity: true,
            description: true
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
