'use client'

import { useState } from 'react'

import { isRejectedWithValue } from '@reduxjs/toolkit'

import { toast } from 'react-toastify'

import { type Category } from '@prisma/client'

import { getErrorMessage } from '@/helper/getErrorMessage'
import api_v1 from '@/utils/axios/api_v1'

type CategoryPayload = Omit<Category, 'id'>

export const useCategory = () => {
  const [dataCategory, setDataCategory] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)

  // get all category
  const fetchCategory = async () => {
    try {
      setLoading(true)
      const response = await api_v1.get('rahma/category')

      setLoading(false)
      setDataCategory(response.data.data)
    } catch (error) {
      setLoading(false)
      const errorMessage = getErrorMessage(error)

      toast.error(errorMessage)

      return isRejectedWithValue(errorMessage)
    }
  }

  // create category
  const createCategory = async (payload: CategoryPayload) => {
    const dataPayload = {
      category: payload.category,
      description: payload.description,
      statusActive: payload.statusActive,
      isDeleted: payload.isDeleted
    }

    try {
      setLoading(true)
      const response = await api_v1.post('rahma/category', dataPayload)

      setLoading(false)
      toast.success('Category added successfully!')
      fetchCategory()

      return response.data
    } catch (error) {
      setLoading(false)
      const errorMessage = getErrorMessage(error)

      toast.error(errorMessage)

      return isRejectedWithValue(errorMessage)
    }
  }

  return { fetchCategory, createCategory, dataCategory, loading }
}
