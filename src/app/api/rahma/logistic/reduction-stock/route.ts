import { NextResponse } from 'next/server'

import prisma from '@/utils/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const reportStockReduction = await prisma.waybill.findMany({
      where: {
        status: 'PENGURANGAN'
      },
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
      message: 'Report Reduction Data',
      data: reportStockReduction
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
