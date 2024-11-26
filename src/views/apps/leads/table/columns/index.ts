'use client'
import { useMemo } from 'react'

import { type MRT_ColumnDef } from 'material-react-table'

type Person = {
  name: {
    firstName: string
    lastName: string
  }
  address: string
  city: string
  state: string
}

const LeadsColumn = useMemo<MRT_ColumnDef<Person>[]>(
  () => [
    {
      accessorKey: 'name.firstName', //access nested data with dot notation
      header: 'First Name',
      size: 150
    },
    {
      accessorKey: 'name.lastName',
      header: 'Last Name',
      size: 150
    },
    {
      accessorKey: 'address', //normal accessorKey
      header: 'Address',
      size: 200
    },
    {
      accessorKey: 'city',
      header: 'City',
      size: 150
    },
    {
      accessorKey: 'state',
      header: 'State',
      size: 150
    }
  ],
  []
)

export default LeadsColumn
