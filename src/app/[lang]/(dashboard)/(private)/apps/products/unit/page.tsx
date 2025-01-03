// MUI Imports
import Grid from '@mui/material/Grid'


// Data Imports
import UnitListTable from '@/views/apps/product/unit/UnitListTable'



const UnitList = async () => {


  return (
    <Grid container spacing={6}>

      <Grid item xs={12}>
        <UnitListTable />
      </Grid>
    </Grid>
  )
}

export default UnitList
