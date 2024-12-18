// MUI Imports
import Grid from '@mui/material/Grid'

// Components Imports

// Data Imports
import Congratulations from './components/Congratulations'
import DonutChartGeneratedLeads from './components/DonutChartGeneratedLeads'
import LineChartProfit from './components/LineChartProfit'
import RadialBarChart from './components/RadialBarChart'
import StatisticsCard from './components/StatisticsCard'

/**
 * ! If you need data using an API call, uncomment the below API code, update the `process.env.API_URL` variable in the
 * ! `.env` file found at root of your project and also update the API endpoints like `/apps/invoice` in below example.
 * ! Also, remove the above server action import and the action itself from the `src/app/server/actions.ts` file to clean up unused code
 * ! because we've used the server action for getting our static data.
 */

/* const getInvoiceData = async () => {
  // Vars
  const res = await fetch(`${process.env.API_URL}/apps/invoice`)

  if (!res.ok) {
    throw new Error('Failed to fetch invoice data')
  }

  return res.json()
}
 */

const HomeDashboard = async () => {
  // Vars
  // const invoiceData = await getInvoiceData()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={4}>
        <Congratulations />
      </Grid>
      <Grid item xs={12} md={8}>
        <StatisticsCard />
      </Grid>
      <Grid item xs={12} xl={4}>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6} md={3} xl={6}>
            <LineChartProfit />
          </Grid>
          <Grid item xs={12} sm={6} md={3} xl={6}>
            <RadialBarChart />
          </Grid>
          <Grid item xs={12} md={6} xl={12}>
            <DonutChartGeneratedLeads />
          </Grid>
        </Grid>
      </Grid>
      {/* <Grid item xs={12} xl={8}>
        <RevenueReport />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <EarningReports />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <PopularProducts />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <Orders />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <Transactions />
      </Grid>
      <Grid item xs={12} lg={8}>
        <InvoiceListTable invoiceData={invoiceData} />
      </Grid> */}
    </Grid>
  )
}

export default HomeDashboard
