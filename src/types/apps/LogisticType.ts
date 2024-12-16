export interface ResponseLogistic {
  message: string
  data: LogisticResponData[]
}

export interface LogisticResponData {
  id: string
  inventoryEntryId: string
  changeType: string
  quantity: number
  changeDate: Date
  description: string
  userId: null
  inventoryEntry: InventoryEntry
}

export interface InventoryEntry {
  product: Product
}

export interface Product {
  name: string
  sku: string
}
