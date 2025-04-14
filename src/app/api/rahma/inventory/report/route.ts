import { InventoryController } from '../handler'

export const dynamic = 'force-dynamic'

export async function GET() {
  const controller = new InventoryController()

  return controller.getInventoryReport()
}
