import { useState } from 'react'

import type { Product } from '@prisma/client'

import { isRejectedWithValue } from '@reduxjs/toolkit'

import { toast } from 'react-toastify'

import { getErrorMessage } from '@/helper/getErrorMessage'
import api_v1 from '@/utils/axios/api_v1'

type ProductForm = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>

export const UseProduct = () => {
  const [loading, setLoading] = useState(false)
  const [dataProducts, setDataProducts] = useState<Product[]>([])

  // FetchAllProducts
  const FetchAllProducts = async () => {
    try {
      setLoading(true)
      const response = await api_v1.get('rahma/product')

      setLoading(false)

      setDataProducts(response.data.products)
    } catch (error) {
      setLoading(false)
      const errorMessage = getErrorMessage(error)

      toast.error(errorMessage)

      return isRejectedWithValue(errorMessage)
    }
  }

  // create Product
  const CreateproductwithFile = async (payload: ProductForm) => {
    setLoading(true)

    try {
      const formData = new FormData()

      formData.append('name', payload.name)
      formData.append('description', payload.description)
      formData.append('sku', payload.sku)
      formData.append('minStockThreshold', payload.minStockThreshold)
      formData.append('categoryId', payload.categoryId.value)
      formData.append('unitId', payload.unitId.value)
      formData.append('image', payload.image[0])

      const response = await api_v1.post('rahma/product', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      setLoading(false)
      toast.success('Product added successfully!')

      //  fetchUnit()

      return response.data
    } catch (error) {
      setLoading(false)

      console.log({ error })
      const errorMessage = getErrorMessage(error)

      toast.error(errorMessage)

      return isRejectedWithValue(errorMessage)
    }
  }

  // const Createproduct = async (data: ProductForm) => {
  //   setLoading(true)

  //   const payload: ProductForm = {
  //     ...data,
  //     categoryId: data.categoryId.value,
  //     unitId: data.unitId.value
  //   }

  //   try {
  //     const response = await api_v1.post('rahma/product', payload)

  //     console.log({ response })
  //     setLoading(false)
  //     toast.success('Product added successfully!')

  //     //  fetchUnit()

  //     return response.data
  //   } catch (error) {
  //     setLoading(false)
  //     const errorMessage = getErrorMessage(error)

  //     toast.error(errorMessage)

  //     return isRejectedWithValue(errorMessage)
  //   }
  // }

  return { CreateproductwithFile, loading, dataProducts, FetchAllProducts }
}
