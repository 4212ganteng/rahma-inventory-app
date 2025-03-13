import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import prisma from '@/utils/prisma'

export async function PATCH(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams

  const productId = searchParams.get('productId') || ''

  console.log({ productId })

  // Update Produk

  try {
    const deletedProduct = await prisma.product.update({
      where: {
        id: productId
      },
      data: {
        isDeleted: true
      }
    })

    return NextResponse.json(
      {
        message: 'Produk berhasil dihapus',
        data: deletedProduct
      },
      { status: 200 }
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
