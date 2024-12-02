// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports

import ProductCard from '@views/apps/product/list/ProductCard'

// Data Imports
import { getEcommerceData } from '@/app/server/actions'
import UnitListTable from '@/views/apps/product/unit/UnitListTable'



const UnitList = async () => {
  // Vars
  const data = await getEcommerceData()

  return (
    <Grid container spacing={6}>

      <Grid item xs={12}>
        <UnitListTable productData={data?.products} />
      </Grid>
    </Grid>
  )
}

export default UnitList
