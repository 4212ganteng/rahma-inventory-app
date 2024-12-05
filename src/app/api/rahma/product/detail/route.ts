import type { NextRequest } from 'next/server'

import { ProductController } from '../handler'

// Route Handlers
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams

  console.log({ searchParams })
  const productId = searchParams.get('productId') || ''

  const controller = new ProductController()

  return controller.getProductById(req, productId)
}
