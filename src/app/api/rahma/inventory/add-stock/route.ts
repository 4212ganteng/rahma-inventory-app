import type { NextRequest } from 'next/server'

import { InventoryController } from '../handler'

export async function POST(req: NextRequest) {
  console.log('im here')
  const controller = new InventoryController()

  return controller.addStock(req)
}
