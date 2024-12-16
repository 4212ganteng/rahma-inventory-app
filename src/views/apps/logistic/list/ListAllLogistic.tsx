'use client'

import { useEffect } from "react"

import { useLogistic } from "../hooks/useLogistic"
import LogisticListTable from "../components/LogisticListTable"

const ListAllLogistic = () => {

  const { FetchLogistic, dataLogistic } = useLogistic()


  useEffect(() => {
    FetchLogistic()
  }, [])


  return (
    <LogisticListTable dataFetch={dataLogistic} />
  )
}

export default ListAllLogistic
