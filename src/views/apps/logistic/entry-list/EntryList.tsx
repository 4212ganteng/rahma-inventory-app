'use client'

import { useEffect } from "react"

import { useLogistic } from "../hooks/useLogistic"
import LogisticListTable from "../components/LogisticListTable"

const EntryList = () => {

  const { FetchAdiitionalStock, dataLogisticAddition } = useLogistic()


  useEffect(() => {
    FetchAdiitionalStock()
  }, [])


  return (
    <LogisticListTable dataFetch={dataLogisticAddition} />
  )
}

export default EntryList
