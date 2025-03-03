'use client'

import { object, string, number, pipe, nonEmpty, minLength, maxLength, custom, transform } from 'valibot'

const addStockSchema = object({
  productId: pipe(
    string(),
    nonEmpty('Product ID is required'),
    minLength(3, 'Product ID must be at least 3 characters long'),
    maxLength(20, 'Product ID cannot exceed 20 characters')
  ),
  supplierId: pipe(
    string(),
    nonEmpty('Supplier ID is required'),
    minLength(3, 'Supplier ID must be at least 3 characters long'),
    maxLength(20, 'Supplier ID cannot exceed 20 characters')
  ),
  quantity: pipe(
    string(),
    transform(parseInt),
    number(),
    custom((value: any) => {
      if (value < 1) {
        throw new Error('Quantity must be at least 1')
      }

      if (value > 1000) {
        throw new Error('Quantity cannot exceed 1000')
      }

      return true
    })
  ),
  expiryDate: pipe(
    string(),
    nonEmpty('Expiry Date is required'),

    custom((value: any) => {
      const currentDate = new Date()
      const inputDate = new Date(value)

      if (isNaN(inputDate.getTime())) {
        throw new Error('Invalid date format')
      }

      if (inputDate <= currentDate) {
        throw new Error('Expiry Date must be in the future')
      }

      // Optional: Validate date is not too far in the future (e.g., max 5 years)
      const maxExpiryDate = new Date()

      maxExpiryDate.setFullYear(maxExpiryDate.getFullYear() + 5)

      if (inputDate > maxExpiryDate) {
        throw new Error('Expiry Date cannot be more than 5 years in the future')
      }

      return true
    })
  )
})

export default addStockSchema
