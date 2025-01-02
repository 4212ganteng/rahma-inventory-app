'use client'

import { useState } from 'react'

import { isRejectedWithValue } from '@reduxjs/toolkit'

import { toast } from 'react-toastify'

import { getErrorMessage } from '@/helper/getErrorMessage'
import type { LogisticResponData } from '@/types/apps/LogisticType'
import api_v1 from '@/utils/axios/api_v1'



export const useLogistic = () => {
  const [dataLogistic, setDataLogistic] = useState<LogisticResponData[]>([])
  const [dataLogisticAddition, setDataLogisticAddition] = useState<LogisticResponData[]>([])
  const [dataLogisticReduction, setDataLogisticReduction] = useState<LogisticResponData[]>([])
  const [dataLogisticPreview, setDataLogisticPreview] = useState<LogisticResponData[]>([])
  const [loading, setLoading] = useState(false)

  // get all report Additional stock
  const FetchAdiitionalStock = async () => {
    try {
      setLoading(true)
      const response = await api_v1.get('rahma/logistic/add-stock')

      setLoading(false)
      setDataLogisticAddition(response.data.data)
    } catch (error) {
      setLoading(false)
      const errorMessage = getErrorMessage(error)

      toast.error(errorMessage)

      return isRejectedWithValue(errorMessage)
    }
  }


  // get all Reduction stock
  const FetchReductionStock = async () => {
    try {
      setLoading(true)
      const response = await api_v1.get('rahma/logistic/reduction-stock')

      setLoading(false)
      setDataLogisticReduction(response.data.data)
    } catch (error) {
      setLoading(false)
      const errorMessage = getErrorMessage(error)

      toast.error(errorMessage)

      return isRejectedWithValue(errorMessage)
    }
  }

  // get all entry and exit stock
  const FetchLogistic = async () => {
    try {
      setLoading(true)
      const response = await api_v1.get('rahma/logistic')

      setLoading(false)
      setDataLogistic(response.data.data)
    } catch (error) {
      setLoading(false)
      const errorMessage = getErrorMessage(error)

      toast.error(errorMessage)

      return isRejectedWithValue(errorMessage)
    }
  }

  // get preview
  const FetchPreview = async (waybillNumber: string) => {
    try {
      setLoading(true)
      const response = await api_v1.get(`rahma/logistic/preview?waybillNumber=${waybillNumber}`)

      setLoading(false)
      setDataLogisticPreview(response.data.data)
    } catch (error) {
      setLoading(false)
      const errorMessage = getErrorMessage(error)

      toast.error(errorMessage)

      return isRejectedWithValue(errorMessage)
    }
  }



  return { dataLogisticReduction, loading, dataLogisticAddition, dataLogistic, FetchLogistic, FetchAdiitionalStock, FetchReductionStock, FetchPreview, dataLogisticPreview }
}
