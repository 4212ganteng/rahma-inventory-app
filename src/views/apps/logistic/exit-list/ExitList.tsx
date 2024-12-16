'use client'

import { useEffect } from "react"

import { useLogistic } from "../hooks/useLogistic"
import LogisticListTable from "../components/LogisticListTable"

const ExitList = () => {

  const { FetchReductionStock, dataLogisticReduction } = useLogistic()


  useEffect(() => {
    FetchReductionStock()
  }, [])


  return (
    <LogisticListTable dataFetch={dataLogisticReduction} />
  )
}

export default ExitList
