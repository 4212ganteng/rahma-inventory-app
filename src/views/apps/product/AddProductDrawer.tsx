// React Imports
import { useState, useRef } from 'react'
import type { ChangeEvent } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import InputAdornment from '@mui/material/InputAdornment'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'

// Type Imports
import type { ProductType } from '@/types/apps/productTypes'

// Components Imports
import CustomTextField from '@core/components/mui/TextField'

type Props = {
  open: boolean
  handleClose: () => void
  categoryData: ProductType[]
  setData: (data: ProductType[]) => void
}

type FormValues = {
  product_title: string
  description: string
  status: string
  comment: string
  image: string
}

const AddProductDrawer = (props: Props) => {
  // Props
  const { open, handleClose, productData, setData } = props

  // States
  const [fileName, setFileName] = useState('')


  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Hooks
  const {
    control,
    reset: resetForm,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      product_title: "",
      description: "",
      status: "",
      comment: "",
      image: ""

    }
  })

  // Handle Form Submit
  const handleFormSubmit = (data: FormValues) => {
    const newData = {
      id: productData.length + 1,
      categoryTitle: data.product_title,
      description: data.description,
      totalProduct: Math.floor(Math.random() * 9000) + 1000,
      totalEarning: Math.floor(Math.random() * 90000) + 10000,
      image: `/images/apps/ecommerce/product-${Math.floor(Math.random() * 20) + 1}.png`
    }

    setData([...productData, newData])
    handleReset()
  }

  // Handle Form Reset
  const handleReset = () => {
    handleClose()
    resetForm({ product_title: '', description: '' })
    setFileName('')

  }

  // Handle File Upload
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target

    if (files && files.length !== 0) {
      setFileName(files[0].name)
    }
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
        <Typography variant='h5'>Add Category</Typography>
        <IconButton size='small' onClick={handleReset}>
          <i className='tabler-x text-textSecondary text-2xl' />
        </IconButton>
      </div>
      <Divider />
      <div className='p-6'>
        <form onSubmit={handleSubmit(data => handleFormSubmit(data))} className='flex flex-col gap-5'>
          <Controller
            name='product_title'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Title'
                placeholder='Fashion'
                {...(errors.product_title && { error: true, helperText: 'This field is required.' })}
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
                label='Description'
                placeholder='Enter a description...'
                {...(errors.description && { error: true, helperText: 'This field is required.' })}
              />
            )}
          />
          <div className='flex items-end gap-4'>
            <CustomTextField
              label='Attachment'
              placeholder='No file chosen'
              value={fileName}
              className='flex-auto'
              InputProps={{
                readOnly: true,
                endAdornment: fileName ? (
                  <InputAdornment position='end'>
                    <IconButton size='small' edge='end' onClick={() => setFileName('')}>
                      <i className='tabler-x' />
                    </IconButton>
                  </InputAdornment>
                ) : null
              }}
            />
            <Button component='label' variant='tonal' htmlFor='contained-button-file' className='min-is-fit'>
              Choose
              <input hidden id='contained-button-file' type='file' onChange={handleFileUpload} ref={fileInputRef} />
            </Button>
          </div>
          <Controller
            name='comment'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}

                fullWidth
                label='Comment'


                multiline
                rows={4}
                placeholder='Write a Comment...'
              />
            )}
          />



          <Controller
            name="status"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <CustomTextField
                {...field}
                select
                fullWidth
                name='status'
                label='Category Status'
                value={status}
              >
                <MenuItem value='Published'>Published</MenuItem>
                <MenuItem value='Inactive'>Inactive</MenuItem>
                <MenuItem value='Scheduled'>Scheduled</MenuItem>
              </CustomTextField>
            )}
          />


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
