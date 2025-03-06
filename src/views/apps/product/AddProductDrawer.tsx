// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

// Third-party Imports
import { Controller, useForm } from 'react-hook-form'

// Type Imports



// Components Imports
import CustomAutocomplete from '@/@core/components/mui/Autocomplete'
import { useStandarizedOptions2 } from '@/hooks/useStandarizedOptions'
import CustomTextField from '@core/components/mui/TextField'
import { useCategory } from './category/hooks/useCategory'
import { useUnit } from './unit/hooks/useUnit'

type ProductForm = {
  name: string;
  sku: string;
  description: string | null;
  categoryId: string;
  unitId: string;
  minStockThreshold: number;
  image: File[] | null;
}


type Props = {
  open: boolean
  handleClose: () => void
  onDataSubmit: (data: ProductForm) => Promise<void>
}

const AddProductDrawer = (props: Props) => {
  // Props
  const { open, handleClose, onDataSubmit } = props

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
  } = useForm<ProductForm>({
    defaultValues: defaulValues
  })


  // Handle Form Submit
  const onSubmit = handleSubmit(async (data: ProductForm) => {
    if (files) {
      data.image = files;
    } else {
      data.image = null;
    }

    await onDataSubmit(data)
    handleClose()
  }, (err) => console.log('err form', err))

  // Handle Form Reset
  const handleReset = () => {
    handleClose()
    resetForm(defaulValues)
    setFiles([])

  }

  const listOptionsUnit = useStandarizedOptions2(dataUnit, (item) => {
    return {
      label: item.unit,
      value: item.id
    }
  })


  const listOptionCategory = useStandarizedOptions2(dataCategory, (item) => {
    return {
      label: item.category,
      value: item.id
    }
  })

  useEffect(() => {
    fetchCategory()
    fetchUnit()
  }, [])





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
            render={({ field: { onChange, value, ...field } }) => (

              <CustomAutocomplete
                {...field}

                value={listOptionsUnit?.find(option => option.value == value)}

                options={listOptionsUnit}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                onChange={(e, value) => value ? onChange(value.value) : null}
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
            render={({ field: { onChange, value, ...field } }) => (

              <CustomAutocomplete
                {...field}
                value={listOptionCategory.find((item) => item.value === value)}
                options={listOptionCategory}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                onChange={(e, value) => value ? onChange(value.value) : null}
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


          {/*
          <DropzoneWrapper>

            <FileUploaderSingle title={'Product'} files={files} setFiles={setFiles} />
          </DropzoneWrapper> */}


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
