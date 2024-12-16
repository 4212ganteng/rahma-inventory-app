import { NextResponse } from 'next/server'

import prisma from '@/utils/prisma'

export async function GET() {
  try {
    const reportStockReduction = await prisma.stockChange.findMany({
      where: {
        changeType: 'PENGURANGAN'
      },
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
