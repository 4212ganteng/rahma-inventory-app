'use client'

import { Fragment, useEffect } from "react"

import { Grid } from "@mui/material"

import PreviewCard from "./PreviewCard"
import PreviewActions from "./PreviewActions"
import { useLogistic } from "../../hooks/useLogistic"
import FallbackSpinner from "@/@core/components/spinner/FallbackSpinner"

const PreviewEntry = ({ id }: { id: string }) => {
  const { FetchPreview, loading, dataLogisticPreview } = useLogistic()

  // handl button print
  const handlePrint = () => {
    window.print()
  }

  useEffect(() => {
    FetchPreview(id)
  }, [id])


  console.log({ dataLogisticPreview })

  return (

    <Fragment>
      {loading && <FallbackSpinner />}


      <Grid container spacing={6}>
        <Grid item xs={12} md={9}>
          <PreviewCard previewData={dataLogisticPreview} />
        </Grid>
        <Grid item xs={12} md={3}>
          <PreviewActions onButtonClick={handlePrint} />
        </Grid>
      </Grid>
    </Fragment>



  )
}

export default PreviewEntry
