import type { Supplier } from '@prisma/client'

export type SupplierRequestForm = Omit<Supplier, 'id'>

export interface SupplierResponseStruct {
  message: string
  data: SupplierResponseData[]
}

export interface SupplierResponseData {
  id: string
  name: string
  contact: string
  email: string
  address: string
}
