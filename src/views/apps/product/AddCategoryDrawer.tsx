import type { FC } from 'react';

import { Button, Divider, Drawer, IconButton, MenuItem, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

import CustomTextField from '@/@core/components/mui/TextField';

type ProductType = {
  name: string
  description: string
  status: string
}

type FormValues = {
  name: string
  description: string
  status: string
}

type Props = {
  title: string
  open: boolean
  handleClose: () => void
  categoryData: ProductType[]
  setData: (data: ProductType[]) => void
}

const AddCategoryDrawer: FC<Props> = ({ title, open, handleClose, categoryData, setData }) => {

  const defVal = {
    name: '',
    description: '',
    status: 'Published'
  }


  // React Hook Form
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: resetForm
  } = useForm<FormValues>({
    defaultValues: defVal
  })

  // Handle form submission
  const handleFormSubmit = async (data: FormValues) => {
    try {

      console.log("data to post", data)


      const response = await fetch('/api/categories', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const newCategory = await response.json()

        setData([...categoryData, newCategory])
        handleClose() // Close the drawer after successful submission
      } else {
        console.error('Failed to create category')
      }
    } catch (error) {
      console.error('Error creating category:', error)
    }
  }



  // Handle form reset
  const handleReset = () => {
    handleClose()
    resetForm()
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
      <div className="flex items-center justify-between pli-6 plb-5">
        <Typography variant='h5'>{title}</Typography>
        <IconButton size='small' onClick={handleReset}>
          <i className='tabler-x text-textSecondary text-2xl' />
        </IconButton>
      </div>


      <Divider />
      <div className='p-6'>
        <form onSubmit={handleSubmit(data => handleFormSubmit(data))} className='flex flex-col gap-5'>
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

export default AddCategoryDrawer
