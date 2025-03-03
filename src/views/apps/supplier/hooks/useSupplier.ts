import { useCallback, useState } from 'react'

import type { Supplier } from '@prisma/client'

import { isRejectedWithValue } from '@reduxjs/toolkit'

import { toast } from 'react-toastify'

import { getErrorMessage } from '@/helper/getErrorMessage'
import type { SupplierRequestForm } from '@/types/apps/suppliertType'
import api_v1 from '@/utils/axios/api_v1'

export const useSupplier = () => {
  const [loading, setLoading] = useState(false)
  const [dataSuppliers, setDataSuppliers] = useState<Supplier[]>([])

  const FetchAllSuppliers = useCallback(async () => {
    try {
      setLoading(true)
      const response = await api_v1.get('rahma/supplier')

      console.log({ response })
      setLoading(false)

      setDataSuppliers(response.data.data)
    } catch (error) {
      setLoading(false)
      const errorMessage = getErrorMessage(error)

      toast.error(errorMessage)

      return isRejectedWithValue(errorMessage)
    }
  }, [])

  const CreateSupplier = async (data: SupplierRequestForm) => {
    setLoading(true)

    try {
      const response = await api_v1.post('rahma/supplier', data)

      console.log({ response })
      setLoading(false)
      toast.success('Supplier added successfully!')

      FetchAllSuppliers()

      return response.data
    } catch (error) {
      setLoading(false)
      const errorMessage = getErrorMessage(error)

      toast.error(errorMessage)

      return isRejectedWithValue(errorMessage)
    }
  }

  return { FetchAllSuppliers, CreateSupplier, loading, dataSuppliers }
}
