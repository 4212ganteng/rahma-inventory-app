'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { isRejectedWithValue } from '@reduxjs/toolkit'

import { toast } from 'react-toastify'



import { getErrorMessage } from '@/helper/getErrorMessage'
import type { AddStockForm, DataListInventory, DataResponseInvetoryDetail, reduceStockForm } from '@/types/apps/InventoryType'
import api_v1 from '@/utils/axios/api_v1'


export const useInventory = () => {
  const [dataInventory, setDataInventory] = useState<DataListInventory[]>([])
  const [detailInventory, setDetailInventory] = useState<DataResponseInvetoryDetail[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // get all Inventory
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

  // AddStock
  const AddStock = async (payload: AddStockForm) => {
    setLoading(true)

    try {
      const response = await api_v1.post('rahma/inventory/add-stock', payload)


      setLoading(false)
      toast.success('Add Stock successfully!')
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


  // Reduce stock
  const ReduceStock = async (payload: reduceStockForm) => {
    setLoading(true)

    try {
      const response = await api_v1.post('rahma/inventory/reduce-stock', payload)


      setLoading(false)
      toast.success('Reduce stock successfully!')
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

  // get Inventory By ProductId
  const FetchInventoryByProductId = async (id: string) => {
    try {
      setLoading(true)
      const response = await api_v1.get('rahma/inventory/by-productId', { params: { productId: id } })

      setLoading(false)
      setDetailInventory(response.data.data)
    } catch (error) {
      setLoading(false)
      const errorMessage = getErrorMessage(error)

      toast.error(errorMessage)

      return isRejectedWithValue(errorMessage)
    }
  }

  return { FetchListInventory, FetchInventoryByProductId, AddStock, dataInventory, loading, ReduceStock, detailInventory }
}
