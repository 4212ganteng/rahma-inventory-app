import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import prisma from '@/utils/prisma'

export async function GET() {
  try {
    const suppliers = await prisma.supplier.findMany()

    console.log('supplier api', suppliers)

    return NextResponse.json(
      {
        message: 'Data Supplier',
        data: suppliers
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
  const body = await req.json()

  console.log({ body })

  try {
    const supplier = await prisma.supplier.create({
      data: body
    })

    return NextResponse.json(
      {
        message: 'Supplier berhasil dibuat',
        data: supplier
      },
      { status: 201 }
    )
  } catch (error) {
    console.log('kok error si', error)

    return NextResponse.json(
      {
        message: `something wrong ${error}`
      },
      { status: 500 }
    )
  }
}

// export async function DELETE(req: NextRequest) {
//   const params = req.nextUrl.searchParams
//   const categoryId = params.get('categoryId')

//   try {
//     if (!categoryId) {
//       return NextResponse.json(
//         {
//           message: `Category id wajib di isi`
//         },
//         { status: 400 }
//       )
//     }

//     const isCategoryExist = await prisma.category.findUnique({
//       where: {
//         id: categoryId
//       }
//     })

//     if (!isCategoryExist) {
//       return NextResponse.json({ message: 'Category tidak di temukan' }, { status: 404 })
//     }

//     const product = await prisma.category.delete({
//       where: {
//         id: categoryId!
//       }
//     })

//     return NextResponse.json(
//       {
//         message: 'Produk berhasil dibuat',
//         data: product
//       },
//       { status: 201 }
//     )
//   } catch (error) {
//     return NextResponse.json(
//       {
//         message: `something wrong ${error}`
//       },
//       { status: 500 }
//     )
//   }
// }
