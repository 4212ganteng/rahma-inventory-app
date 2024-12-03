import type { NextRequest } from 'next/server'

import { ProductController } from './handler'

// Route Handlers
export async function POST(req: NextRequest) {
  const controller = new ProductController()

  return controller.createProduct(req)
}

export async function GET(req: NextRequest) {
  const controller = new ProductController()

  return controller.getAllProducts(req)
}
