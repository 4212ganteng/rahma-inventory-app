export interface ListInventoryResponse {
  message: string
  data: DataListInventory[]
}

export interface DataListInventory {
  productId: string
  productName: string
  totalStock: number
  entries: InventoryEntry[]
}

export interface InventoryEntry {
  batchNumber: string
  remainingQuantity: number
  expiryDate: Date
  status: Status
}

export enum Status {
  Kadaluwarsa = 'KADALUWARSA',
  Kosong = 'KOSONG',
  Tersedia = 'TERSEDIA'
}

// add stock
export interface AddStockForm {
  productId: string
  quantity: number
  expiryDate: Date
}
