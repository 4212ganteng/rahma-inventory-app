'use client'
import { useState } from 'react'

import { isRejectedWithValue } from '@reduxjs/toolkit'

import { toast } from 'react-toastify'

import { getErrorMessage } from '@/helper/getErrorMessage'
import api_v1 from '@/utils/axios/api_v1'
import type { DashboardResponse } from '@/types/apps/dashboardType'

export const useDashboard = () => {
  const [dataDashboard, setDataDashboard] = useState<DashboardResponse>()
  const [loading, setLoading] = useState(false)

  // get Inventory By ProductId
  const FetchDashboard = async () => {
    try {
      setLoading(true)
      const response = await api_v1.get('rahma/dashboard')

      setLoading(false)
      setDataDashboard(response.data.data)
    } catch (error) {
      setLoading(false)
      const errorMessage = getErrorMessage(error)

      toast.error(errorMessage)

      return isRejectedWithValue(errorMessage)
    }
  }

  return { FetchDashboard, dataDashboard, loading }
}
