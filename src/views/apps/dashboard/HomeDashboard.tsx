'use client'

// MUI Imports
import { Fragment, useEffect } from 'react'

import Grid from '@mui/material/Grid'

// Data Imports
import { useSession } from 'next-auth/react'

import { useLogistic } from '../logistic/hooks/useLogistic'
import Congratulations from './components/Congratulations'
import DonutChartGeneratedLeads from './components/DonutChartGeneratedLeads'
import LineChartProfit from './components/LineChartProfit'
import RadialBarChart from './components/RadialBarChart'
import RevenueReport from './components/RevenueReport'
import StatisticsCard from './components/StatisticsCard'
import { useDashboard } from './hooks/useDashboard'
import type { ThemeColor } from '@/@core/types'
import FallbackSpinner from '@/@core/components/spinner/FallbackSpinner'



const HomeDashboard = () => {
  const { FetchDashboard, dataDashboard, loading } = useDashboard()
  const { FetchAdiitionalStock, FetchReductionStock, dataLogisticAddition, dataLogisticReduction } = useLogistic()
  const { data: session } = useSession()




  const dataStat = [
    {
      stats: dataDashboard?.totalReamainingStock ?? 0,
      title: 'Stock All',
      color: 'primary' as ThemeColor,
      icon: 'tabler-article'
    },
    {
      color: 'info' as ThemeColor,
      stats: dataDashboard?.totalRemainingStockAvailable ?? 0,
      title: 'Stock Ready',
      icon: 'tabler-shopping-cart'
    },
    {
      color: 'error' as ThemeColor,
      stats: dataDashboard?.totalRemainingStockAlmostOutOfStock ?? 0,
      title: 'Hampir Habis',
      icon: 'tabler-package-export'
    },
    {
      stats: dataDashboard?.totalRemainingStockExpired ?? 0,
      color: 'success' as ThemeColor,
      title: 'Stock Expired',
      icon: 'tabler-chart-pie-2'
    }
  ]

  useEffect(() => {
    FetchDashboard()
    FetchAdiitionalStock()
    FetchReductionStock()
  }, [])




  return (
    <Fragment>
      {loading && <FallbackSpinner />}

      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <Congratulations name={session?.user?.name ?? 'Guest'} />
        </Grid>
        <Grid item xs={12} md={8}>
          <StatisticsCard data={dataStat} />
        </Grid>
        <Grid item xs={12} xl={4}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6} md={3} xl={6}>
              <LineChartProfit />
            </Grid>
            <Grid item xs={12} sm={6} md={3} xl={6}>
              <RadialBarChart stockReady={dataDashboard?.totalRemainingStockAvailable ?? 0} stockReadyPercentage={dataDashboard?.stockStatusPercentage?.available ?? 0} />
            </Grid>
            <Grid item xs={12} md={6} xl={12}>
              <DonutChartGeneratedLeads stockAvailablePercentage={dataDashboard?.stockStatusPercentage?.available ?? 0} stockAvailable={dataDashboard?.totalRemainingStockAvailable ?? 0} series={
                [
                  dataDashboard?.totalRemainingStockAvailable ?? 0,
                  dataDashboard?.totalRemainingStockAlmostOutOfStock ?? 0,
                  dataDashboard?.totalRemainingStockExpired ?? 0
                ]
              } />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} xl={8}>
          <RevenueReport
            dataStockAdditions={dataLogisticAddition.map(item => item.stockChange?.quantity)}
            dataStockReductions={dataLogisticReduction.map(item => item.stockChange?.quantity)}
            dataProduct={[
              dataDashboard?.productStatusPercentage.available ?? 0,
              dataDashboard?.productStatusPercentage.almostOutOfStock ?? 0,
              dataDashboard?.productStatusPercentage.expired ?? 0,
              dataDashboard?.productStatusPercentage.empty ?? 0,
            ]}
            dataStockItems={[
              dataDashboard?.totalRemainingStockAvailable ?? 0,
              dataDashboard?.totalRemainingStockAlmostOutOfStock ?? 0,
              dataDashboard?.totalRemainingStockExpired ?? 0,
              70,
            ]}
          />
        </Grid>

      </Grid>

    </Fragment>
  )
}

export default HomeDashboard
