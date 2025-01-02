export interface ResponseLogistic {
  message: string
  data: LogisticResponData[]
}

export interface LogisticResponData {
  id: string
  stockChangeId: string
  waybillNumber: string
  waybillDate: Date
  status: string
  stockChange: StockChange
}

export interface StockChange {
  inventoryEntry: InventoryEntry
  quantity: number
  description: string
}

export interface InventoryEntry {
  product: Product
}

export interface Product {
  name: string
  sku: string
}
