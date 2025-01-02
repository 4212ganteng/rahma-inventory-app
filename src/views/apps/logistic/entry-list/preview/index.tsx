import { Grid } from "@mui/material"

import PreviewCard from "./PreviewCard"
import PreviewActions from "./PreviewActions"

const PreviewEntry = ({ id }: { id: string }) => {

  console.log('data id', id)

  // handl button print
  const handlePrint = () => {
    window.print()
  }


  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={9}>
        <PreviewCard />
      </Grid>
      <Grid item xs={12} md={3}>
        {/* <PreviewActions onButtonClick={handlePrint} /> */}


      </Grid>
    </Grid>


  )
}

export default PreviewEntry
