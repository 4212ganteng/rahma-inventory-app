// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import ProductListTable from '@/views/apps/product/list/ProductListTable'

import ProductCard from '@views/apps/product/list/ProductCard'

// Data Imports
import { getEcommerceData } from '@/app/server/actions'



const ProductsList = async () => {
  // Vars
  const data = await getEcommerceData()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ProductCard />
      </Grid>
      <Grid item xs={12}>
        <ProductListTable productData={data?.products} />
      </Grid>
    </Grid>
  )
}

export default ProductsList
