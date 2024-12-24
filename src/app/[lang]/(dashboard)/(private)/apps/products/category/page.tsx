// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports

import ProductCard from '@views/apps/product/list/ProductCard'

// Data Imports
import CategoryListTable from '@/views/apps/product/category/CategoryListTable'



const CategoryList = async () => {


  return (
    <Grid container spacing={6}>
      {/* <Grid item xs={12}>
        <ProductCard />
      </Grid> */}
      <Grid item xs={12}>
        <CategoryListTable />
      </Grid>
    </Grid>
  )
}

export default CategoryList
