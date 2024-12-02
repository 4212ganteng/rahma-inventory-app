// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports

import ProductCard from '@views/apps/product/list/ProductCard'

// Data Imports
import { getEcommerceData } from '@/app/server/actions'
import CategoryListTable from '@/views/apps/product/category/CategoryListTable'



const CategoryList = async () => {
  // Vars
  const data = await getEcommerceData()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ProductCard />
      </Grid>
      <Grid item xs={12}>
        <CategoryListTable productData={data?.products} />
      </Grid>
    </Grid>
  )
}

export default CategoryList
