import { InventoryController } from '../handler'

export async function GET() {
  const controller = new InventoryController()

  return controller.getInventoryReport()
}
