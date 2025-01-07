'use client'

import { Fragment, useEffect } from "react"

import { useLogistic } from "../hooks/useLogistic"
import LogisticListTable from "../components/LogisticListTable"
import FallbackSpinner from "@/@core/components/spinner/FallbackSpinner"

const ListAllLogistic = () => {

  const { FetchLogistic, dataLogistic, loading } = useLogistic()


  useEffect(() => {
    FetchLogistic()
  }, [])


  return (

    <Fragment>

      {loading && <FallbackSpinner />}

      <LogisticListTable dataFetch={dataLogistic} />
    </Fragment>
  )
}

export default ListAllLogistic
