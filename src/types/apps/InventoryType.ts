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

// reduce stock
export interface reduceStockForm {
  productId: string
  quantity: number
}

// inventory detail by productId
export interface DataResponseInvetoryDetail {
  productName: string
  productSku: string
  totalStock: number
  totalData: number
  inventoryByProductId: InventoryByProductID[]
}

export interface InventoryByProductID {
  id: string
  productId: string
  batchNumber: string
  quantity: number
  remainingQuantity: number
  entryDate: Date
  expiryDate: Date
  status: Status
  fifoSequence: number
  product: Product
}

export interface Product {
  name: string
  sku: string
}
