export interface ProductResponseData {
  products: ProductRes[]
  pagination: Pagination
}

export interface Pagination {
  currentPage: number
  totalPages: number
  totalProducts: number
  totalCategory: number
  totalUnit: number
  counttotalInventoryEntries: number
}

export interface ProductRes {
  id: string
  name: string
  sku: string
  description: string
  categoryId: string
  unitId: string
  minStockThreshold: number
  image: string
  createdAt: Date
  updatedAt: Date
  _count: Count
  category: Category
  unit: Unit
  totalInventoryEntries: number
}

export interface Count {
  inventoryEntries: number
}

export interface Category {
  category: string
}

export interface Unit {
  unit: string
}
