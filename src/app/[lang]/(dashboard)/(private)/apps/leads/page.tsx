// MUI Imports
import Grid from '@mui/material/Grid'

import LeadsTable from '@/views/apps/leads/table'

const LeadsList = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        {/* <ProductCard /> */}
        <h1>hello</h1>
      </Grid>
      <Grid item xs={12}>
        <LeadsTable />
      </Grid>
    </Grid>
  )
}

export default LeadsList
