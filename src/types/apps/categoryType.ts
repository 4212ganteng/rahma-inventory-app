import type { ThemeColor } from '@/@core/types'

// type status
export type CategoryStatus = 'Active' | 'Inactive'

// interface category
export interface Category {
  id: string
  name: string
  description: string
  status: CategoryStatus
  createdAt?: Date
  updatedAt?: Date
}

export interface CategoryFormData {
  category: string
  description: string
  status: CategoryStatus
}

export type productStatusType = {
  [key: string]: {
    title: string
    color: ThemeColor
  }
}
