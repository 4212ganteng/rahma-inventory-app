'use client'

// React Imports
import { useEffect, useMemo, useState } from 'react'

// Next Imports

// MUI Imports
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TablePagination from '@mui/material/TablePagination'
import type { TextFieldProps } from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

// Third-party Imports
import type { RankingInfo } from '@tanstack/match-sorter-utils'
import { rankItem } from '@tanstack/match-sorter-utils'
import type { ColumnDef, FilterFn } from '@tanstack/react-table'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import classnames from 'classnames'

// Type Imports
import type { ThemeColor } from '@core/types'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

// Style Imports
import TablePaginationComponent from '@/components/TablePaginationComponent'
import type { InventoryByProductID } from '@/types/apps/InventoryType'
import tableStyles from '@core/styles/table.module.css'
import { useInventory } from '../hooks/useInventory'
import FallbackSpinner from '@/@core/components/spinner/FallbackSpinner'


declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}


type productStatusType = {
  [key: string]: {
    title: string
    color: ThemeColor
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<TextFieldProps, 'onChange'>) => {
  // States
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

// Vars
const productStatusObj: productStatusType = {
  TERSEDIA: { title: 'TERSEDIA', color: 'success' },
  KADALUWARSA: { title: 'KADALUWARSA', color: 'warning' },
  HAMPIR_HABIS: { title: 'HAMPIR HABIS', color: 'info' },
  KOSONG: { title: 'KOSONG', color: 'error' }
}

// Column Definitions
const columnHelper = createColumnHelper<InventoryByProductID>()

const InventoryByProductId = ({ productId }: { productId: string }) => {

  const { FetchInventoryByProductId, detailInventory, loading } = useInventory();


  // States
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')



  const columns = useMemo<ColumnDef<InventoryByProductID, any>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler()
            }}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler()
            }}
          />
        )
      },
      columnHelper.accessor('product.name', {
        header: 'Product Name',
        cell: ({ row }) => (

          <Typography variant='body2'> {row.original.product.name}</Typography>

        )
      }),

      columnHelper.accessor('supplier.name', {
        header: 'Supplier Name',
        cell: ({ row }) => (

          <Typography variant='body2' className='uppercase'>{row.original.supplier.name}</Typography>

        )
      }),

      columnHelper.accessor('product.sku', {
        header: 'SKU',
        cell: ({ row }) => <Typography>{row.original.product.sku}</Typography>
      }),

      columnHelper.accessor('batchNumber', {
        header: 'Batch Number',
        cell: ({ row }) => (

          <Typography variant='body2'>{row.original.batchNumber}</Typography>

        )
      }),
      columnHelper.accessor('fifoSequence', {
        header: 'Fifo Sequence',
        cell: ({ row }) => (

          <Typography variant='body2'>{row.original.fifoSequence}</Typography>

        )
      }),
      columnHelper.accessor('quantity', {
        header: 'Quantity',
        cell: ({ row }) => (

          <Typography variant='body2'>{row.original.quantity}</Typography>

        )
      }),

      columnHelper.accessor('remainingQuantity', {
        header: 'Remaining QTY',
        cell: ({ row }) => (

          <Typography variant='body2'>{row.original.remainingQuantity}</Typography>

        )
      }),

      columnHelper.accessor('entryDate', {
        header: 'Entry Date',
        cell: ({ row }) => (
          <Typography>{`${new Date(row.original.entryDate).toDateString()}`}</Typography>
        )
      }),
      columnHelper.accessor('expiryDate', {
        header: 'Expired Date',
        cell: ({ row }) => (

          <Typography>{`${new Date(row.original.expiryDate).toDateString()}`}</Typography>

        )
      }),


      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ row }) => (
          <Chip
            label={productStatusObj[row.original.status].title}
            variant='tonal'
            color={productStatusObj[row.original.status].color}
            size='small'
          />
        )
      }),

    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [detailInventory?.inventoryByProductId]
  )

  const table = useReactTable({
    data: detailInventory?.inventoryByProductId || [],
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      rowSelection,
      globalFilter
    },
    initialState: {
      pagination: {
        pageSize: 10
      }
    },
    enableRowSelection: true, //enable row selection for all rows
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  useEffect(() => {
    FetchInventoryByProductId(productId)
  }, [productId])


  return (
    <>
      {loading && <FallbackSpinner />}

      <Card>
        <CardHeader title='Unit Data' />
        {/* <TableFilters setData={setFilteredData} productData={data} /> */}
        <Divider />
        <div className='flex flex-wrap justify-between gap-4 p-6'>
          <DebouncedInput
            value={globalFilter ?? ''}
            onChange={value => setGlobalFilter(String(value))}
            placeholder='Search Product'
            className='max-sm:is-full'
          />
          <div className='flex flex-wrap items-center max-sm:flex-col gap-4 max-sm:is-full is-auto'>
            <CustomTextField
              select
              value={table.getState().pagination.pageSize}
              onChange={e => table.setPageSize(Number(e.target.value))}
              className='flex-auto is-[70px] max-sm:is-full'
            >
              <MenuItem value='10'>10</MenuItem>
              <MenuItem value='25'>25</MenuItem>
              <MenuItem value='50'>50</MenuItem>
            </CustomTextField>
            <Button
              color='secondary'
              variant='tonal'
              className='max-sm:is-full is-auto'
              startIcon={<i className='tabler-upload' />}
            >
              Export
            </Button>

          </div>
        </div>
        <div className='overflow-x-auto'>
          <table className={tableStyles.table}>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id}>
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            className={classnames({
                              'flex items-center': header.column.getIsSorted(),
                              'cursor-pointer select-none': header.column.getCanSort()
                            })}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {{
                              asc: <i className='tabler-chevron-up text-xl' />,
                              desc: <i className='tabler-chevron-down text-xl' />
                            }[header.column.getIsSorted() as 'asc' | 'desc'] ?? null}
                          </div>
                        </>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            {table.getFilteredRowModel().rows.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                    No data available
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {table
                  .getRowModel()
                  .rows.slice(0, table.getState().pagination.pageSize)
                  .map(row => {
                    return (
                      <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                        {row.getVisibleCells().map(cell => (
                          <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                        ))}
                      </tr>
                    )
                  })}
              </tbody>
            )}
          </table>
        </div>
        <TablePagination
          component={() => <TablePaginationComponent table={table} />}
          count={table.getFilteredRowModel().rows.length}
          rowsPerPage={table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, page) => {
            table.setPageIndex(page)
          }}
        />
      </Card>
    </>
  )
}

export default InventoryByProductId
