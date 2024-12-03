// pages/api/products/index.ts
import { NextResponse } from 'next/server'

import prisma from '@/utils/prisma'

export default async function GET(req: Request, res: NextResponse) {
  try {
    const products = await prisma.product.findMany({
      where: {
        isDeleted: false // Hanya produk yang tidak dihapus
      },
      include: {
        unit: true,
        category: true
      }
    })

    return NextResponse.json({
      message: ['Email or Password is invalid']
    })
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching products' })
  }
}
