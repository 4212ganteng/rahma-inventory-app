import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import prisma from '@/utils/prisma'

export async function GET() {
  try {
    const products = await prisma.unit.findMany()

    return NextResponse.json(
      {
        message: 'Unit berhasil ambil',
        data: products
      },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      {
        message: `something wrong ${error}`
      },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    console.log('ingfo body bohai', body)

    const product = await prisma.unit.create({
      data: body
    })

    return NextResponse.json(
      {
        message: 'Unit berhasil dibuat',
        data: product
      },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      {
        message: `something wrong ${error}`
      },
      { status: 500 }
    )
  }
}
