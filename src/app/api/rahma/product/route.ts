import type { NextRequest } from 'next/server'

import { ProductController } from './handler'

// Route Handlers
export async function POST(req: NextRequest) {
  console.log('im here')
  const controller = new ProductController()

  return controller.createProduct(req)

  // return controller.createProductUpfile(req)
}

export async function GET(req: NextRequest) {
  const controller = new ProductController()

  return controller.getAllProducts(req)
}

export async function PATCH(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams

  const productId = searchParams.get('productId') || ''

  const controller = new ProductController()

  return controller.updateProduct(req, productId)
}

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams

  const productId = searchParams.get('productId') || ''

  const controller = new ProductController()

  return controller.deleteProduct(req, productId)
}
