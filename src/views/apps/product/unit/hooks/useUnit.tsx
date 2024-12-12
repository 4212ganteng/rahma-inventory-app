'use client'

import { useState } from 'react'

import { isRejectedWithValue } from '@reduxjs/toolkit'

import { toast } from 'react-toastify'



import type { Unit } from '@prisma/client'

import { getErrorMessage } from '@/helper/getErrorMessage'
import api_v1 from '@/utils/axios/api_v1'

type unitForm = Omit<Unit, 'id' | 'isDeleted'>

export const useUnit = () => {
  const [dataUnit, setDataUnit] = useState<Unit[]>([])
  const [loading, setLoading] = useState(false)

  // get all unit
  const fetchUnit = async () => {
    try {
      setLoading(true)
      const response = await api_v1.get('rahma/unit')

      setLoading(false)
      setDataUnit(response.data.data)
    } catch (error) {
      setLoading(false)
      const errorMessage = getErrorMessage(error)

      toast.error(errorMessage)

      return isRejectedWithValue(errorMessage)
    }
  }

  // create unit
  const createUnit = async (payload: unitForm) => {
    setLoading(true)

    try {
      const response = await api_v1.post('rahma/unit', payload)

      console.log({ response })
      setLoading(false)
      toast.success('Lead added successfully!')
      fetchUnit()

      return response.data
    } catch (error) {
      setLoading(false)
      const errorMessage = getErrorMessage(error)

      toast.error(errorMessage)

      return isRejectedWithValue(errorMessage)
    }
  }

  return { fetchUnit, createUnit, dataUnit, loading }
}
