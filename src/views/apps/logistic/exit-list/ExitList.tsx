'use client'

import { Fragment, useEffect } from "react"

import { useLogistic } from "../hooks/useLogistic"
import LogisticListTable from "../components/LogisticListTable"
import FallbackSpinner from "@/@core/components/spinner/FallbackSpinner"

const ExitList = () => {

  const { FetchReductionStock, dataLogisticReduction, loading } = useLogistic()


  useEffect(() => {
    FetchReductionStock()
  }, [])


  return (

    <Fragment>

      {loading && <FallbackSpinner />}

      <LogisticListTable dataFetch={dataLogisticReduction} />
    </Fragment>
  )
}

export default ExitList
