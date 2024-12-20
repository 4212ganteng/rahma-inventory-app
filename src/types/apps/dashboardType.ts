export interface DashboardResponse {
  totalProduct: number
  expiredProductStatus: number
  emptyProductStatus: number
  almostOutOfStockProductStatus: number
  availableProductStatus: number
  totalReamainingStock: number
  totalRemainingStockExpired: number
  totalRemainingStockAvailable: number
  totalRemainingStockAlmostOutOfStock: number
  productStatusPercentage: StatusPercentage
  stockStatusPercentage: StatusPercentage
}

export interface StatusPercentage {
  expired: number
  empty: number
  almostOutOfStock: number
  available: number
}
