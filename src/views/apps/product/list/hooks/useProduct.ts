import { useCallback, useState } from 'react'

import type { Product } from '@prisma/client'

import { isRejectedWithValue } from '@reduxjs/toolkit'

import { toast } from 'react-toastify'

import { getErrorMessage } from '@/helper/getErrorMessage'
import api_v1 from '@/utils/axios/api_v1'

type ProductForm = {
  name: string
  sku: string
  description: string | null
  categoryId: string
  unitId: string
  minStockThreshold: number
  image: File[] | null
}

export const UseProduct = () => {
  const [loading, setLoading] = useState(false)
  const [dataProducts, setDataProducts] = useState<Product[]>([])

  // FetchAllProducts

  const FetchAllProducts = useCallback(async () => {
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
  }, [])

  // create Product
  const CreateproductwithFile = useCallback(async (payload: ProductForm) => {
    setLoading(true)

    try {
      const formData = new FormData()

      console.log({ payload })

      formData.append('name', payload.name)

      if (payload.description) {
        formData.append('description', payload.description)
      }

      formData.append('sku', payload.sku)
      formData.append('minStockThreshold', payload?.minStockThreshold.toString())
      formData.append('categoryId', payload?.categoryId)
      formData.append('unitId', payload.unitId)

      if (payload.image && payload.image.length > 0) {
        formData.append('image', payload.image[0])
      }

      const response = await api_v1.post('rahma/product', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      setLoading(false)
      toast.success('Product added successfully!')

      FetchAllProducts()

      return response.data
    } catch (error) {
      setLoading(false)

      console.log({ error })
      const errorMessage = getErrorMessage(error)

      toast.error(errorMessage)

      return isRejectedWithValue(errorMessage)
    }
  }, [])

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
