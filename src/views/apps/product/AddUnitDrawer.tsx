import type { FC } from 'react';

import { valibotResolver } from '@hookform/resolvers/valibot';
import { Button, Divider, Drawer, IconButton, MenuItem, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { minLength, nonEmpty, object, pipe, string } from 'valibot';



import type { Unit } from '@prisma/client';

import CustomTextField from '@/@core/components/mui/TextField';


type unitForm = Omit<Unit, 'id' | 'isDeleted'>


type Props = {
  open: boolean
  title: string
  handleClose: () => void
  unit?: Unit | null
  onDataSubmit: (data: unitForm) => Promise<void>
}


const schema = object({
  unit: pipe(
    string(),
    nonEmpty('This field is required'),
    minLength(3, 'First Name must be at least 3 characters long')
  ),
  description: pipe(
    string(), minLength(0)
  ),
  statusActive: pipe(
    string(),
    nonEmpty('This field is required'),
    minLength(3, 'First Name must be at least 3 characters long')
  )
})


const defaultValues: unitForm = {
  unit: '',
  description: '',
  statusActive: 'Active'
}

// start func
const AddUnitDrawer: FC<Props> = ({ title, open, handleClose, onDataSubmit }) => {

  // React Hook Form
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: resetForm
  } = useForm<unitForm>({
    defaultValues: defaultValues,
    resolver: valibotResolver(schema)
  })



  // Handle form submission
  const onSubmit = handleSubmit(async (data) => {
    await onDataSubmit(data)
    handleClose() // Close the drawer after successful submission
  })

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
        <form onSubmit={onSubmit} className='flex flex-col gap-5'>

          {/* category name */}
          <Controller
            name='unit'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Unit'
                placeholder='Fashion'
                value={field.value}
                {...(errors.unit && { error: true, helperText: errors.unit.message })}
              />
            )}

          />

          {/* description */}
          <Controller
            name='description'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                rows={4}
                multiline
                label='Description'
                placeholder='Enter a description...'
                {...(errors.description && { error: true, helperText: 'This field is required.' })}
              />
            )}
          />

          {/* status */}
          <Controller
            name='statusActive'
            control={control}
            rules={{ required: true }}
            render={(field) => (
              <CustomTextField
                {...field}
                select
                fullWidth
                label='statusActive'
                error={Boolean(errors.statusActive)}
              >
                <MenuItem value=''>Select Status</MenuItem>
                <MenuItem value='Active'>Active</MenuItem>
                <MenuItem value='Inactive'>Inactive</MenuItem>
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

export default AddUnitDrawer

