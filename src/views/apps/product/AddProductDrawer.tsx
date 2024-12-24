// React Imports
import type { ChangeEvent } from 'react'
import { useEffect, useRef, useState } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'

// Third-party Imports
import { Controller, useForm } from 'react-hook-form'

// Type Imports
import type { Product } from '@prisma/client'

import { Box } from '@mui/material'


// Components Imports
import CustomAutocomplete from '@/@core/components/mui/Autocomplete'
import { useStandarizedOptions } from '@/hooks/useStandarizedOptions'
import CustomTextField from '@core/components/mui/TextField'
import { useCategory } from './category/hooks/useCategory'
import { useUnit } from './unit/hooks/useUnit'
import DropzoneWrapper from '@/@core/styles/libs/react-dropzone/DropzoneWrapper'
import FileUploaderSingle from '@/@core/components/file-uploader/FileUploaderSingle'

type ProductForm = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>


type Props = {
  open: boolean
  handleClose: () => void
  product: Product | null
  onDataSubmit: (data: ProductForm) => Promise<void>
}



const AddProductDrawer = (props: Props) => {
  // Props
  const { open, handleClose, product, onDataSubmit } = props

  // States
  const [files, setFiles] = useState<File[]>([])

  // hooks
  const { dataUnit, fetchUnit } = useUnit()
  const { dataCategory, fetchCategory } = useCategory()





  const defaulValues = {
    name: "",
    description: "",
    image: null,
    sku: "",
    categoryId: '',
    minStockThreshold: 0,
    unitId: ""

  }

  // Hooks
  const {
    control,
    reset: resetForm,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<ProductForm>({
    defaultValues: defaulValues
  })


  // Handle Form Submit
  const onSubmit = handleSubmit(async (data: ProductForm) => {
    if (files) {
      data.image = files;
    } else {
      data.image = "";
    }

    await onDataSubmit(data)
    handleClose()
  })


  // Handle Form Reset
  const handleReset = () => {
    handleClose()
    resetForm(defaulValues)
    setFiles([])

  }




  const listOptionsUnit = useStandarizedOptions(dataUnit, 'unit', 'id')
  const listOptionCategory = useStandarizedOptions(dataCategory, 'category', 'id')

  useEffect(() => {
    fetchCategory()
    fetchUnit()
  }, [])

  // Clear file handler
  const clearFile = () => {
    setValue('image', null)
    setImagePreview(null)
  }



  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleReset}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <div className='flex items-center justify-between pli-6 plb-5'>
        <Typography variant='h5'>Add Product</Typography>
        <IconButton size='small' onClick={handleReset}>
          <i className='tabler-x text-textSecondary text-2xl' />
        </IconButton>
      </div>
      <Divider />
      <div className='p-6'>
        <form onSubmit={onSubmit} className='flex flex-col gap-5'>


          <Controller
            name='name'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Title'
                placeholder='Fashion'
                {...(errors.name && { error: true, helperText: 'This field is required.' })}
              />
            )}
          />

          <Controller
            name='sku'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='SKU'
                placeholder='Fashion'
                {...(errors.sku && { error: true, helperText: 'This field is required.' })}
              />
            )}
          />

          <Controller
            name='minStockThreshold'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Minimum Stock Threshold'
                placeholder='Fashion'
                {...(errors.minStockThreshold && { error: true, helperText: 'This field is required.' })}
              />
            )}
          />

          <Controller
            name='unitId'
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, ...field } }) => (

              <CustomAutocomplete
                {...field}
                options={listOptionsUnit}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(e, value) => onChange(value)}
                renderInput={params => (
                  <CustomTextField
                    required
                    {...params}
                    label={'Unit'}
                    {...(errors.unitId && { helperText: errors.unitId.message })}
                  />
                )}
              />
            )}
          />

          <Controller
            name='categoryId'
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, ...field } }) => (

              <CustomAutocomplete
                {...field}
                options={listOptionCategory}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(e, value) => onChange(value)}
                renderInput={params => (
                  <CustomTextField
                    required
                    {...params}
                    label={'Category'}
                    {...(errors.categoryId && { helperText: errors.categoryId.message })}
                  />
                )}
              />
            )}
          />






          <Controller
            name='description'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                multiline
                rows={4}
                label='Description'
                placeholder='Enter a description...'
                {...(errors.description && { error: true, helperText: 'This field is required.' })}
              />
            )}
          />



          <DropzoneWrapper>
            {/* <FileUploaderSingle files={files} setFiles={setFiles} /> */}
            <FileUploaderSingle title={'Product'} files={files} setFiles={setFiles} />
          </DropzoneWrapper>


          <div className='flex items-center gap-4'>
            <Button variant='contained' type='submit'>
              Add
            </Button>
            <Button variant='tonal' color='error' type='reset' onClick={handleReset}>
              Discard
            </Button>
          </div>
        </form>
      </div>
    </Drawer>
  )
}

export default AddProductDrawer
