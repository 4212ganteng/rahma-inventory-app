'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { isRejectedWithValue } from '@reduxjs/toolkit'

import { toast } from 'react-toastify'


import type { Unit } from '@prisma/client'

import { getErrorMessage } from '@/helper/getErrorMessage'
import api_v1 from '@/utils/axios/api_v1'
import type { AddStockForm, DataListInventory } from '@/types/apps/InventoryType'

type unitForm = Omit<Unit, 'id' | 'isDeleted'>

export const useInventory = () => {
  const [dataInventory, setDataInventory] = useState<DataListInventory[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // get all unit
  const FetchListInventory = async () => {
    try {
      setLoading(true)
      const response = await api_v1.get('rahma/inventory/report')

      setLoading(false)
      setDataInventory(response.data.data)
    } catch (error) {
      setLoading(false)
      const errorMessage = getErrorMessage(error)

      toast.error(errorMessage)

      return isRejectedWithValue(errorMessage)
    }
  }

  // create unit
  const AddStock = async (payload: AddStockForm) => {
    setLoading(true)

    try {
      const response = await api_v1.post('rahma/inventory/add-stock', payload)

      console.log({ response })
      setLoading(false)
      toast.success('Lead added successfully!')
      FetchListInventory()

      response.data
      router.back()

      return
    } catch (error) {
      setLoading(false)
      const errorMessage = getErrorMessage(error)

      toast.error(errorMessage)

      return isRejectedWithValue(errorMessage)
    }
  }

  return { FetchListInventory, AddStock, dataInventory, loading }
}
