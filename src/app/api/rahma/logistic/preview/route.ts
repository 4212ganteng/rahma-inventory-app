import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import prisma from '@/utils/prisma'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const waybillNumber = searchParams.get('waybillNumber') || ''

  try {
    // validate waybillNumber
    if (!waybillNumber) {
      return NextResponse.json(
        {
          message: 'Waybill number is required'
        },
        { status: 400 }
      )
    }

    const waybill = await prisma.waybill.findMany({
      where: {
        waybillNumber: waybillNumber
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
      }
    })

    return NextResponse.json({
      message: 'Report Detail Waybill',
      data: waybill
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
