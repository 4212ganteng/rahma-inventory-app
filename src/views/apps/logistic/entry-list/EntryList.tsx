'use client'

import { Fragment, useEffect } from "react"

import { useLogistic } from "../hooks/useLogistic"
import LogisticListTable from "../components/LogisticListTable"
import FallbackSpinner from "@/@core/components/spinner/FallbackSpinner"

const EntryList = () => {

  const { FetchAdiitionalStock, dataLogisticAddition, loading } = useLogistic()


  useEffect(() => {
    FetchAdiitionalStock()
  }, [])


  return (

    <Fragment>
      {loading && <FallbackSpinner />}

      <LogisticListTable dataFetch={dataLogisticAddition} />
    </Fragment>
  )
}

export default EntryList
