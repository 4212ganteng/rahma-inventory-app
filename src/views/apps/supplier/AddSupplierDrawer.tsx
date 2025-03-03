// React Imports

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
import type { SupplierRequestForm } from '@/types/apps/suppliertType'
import CustomTextField from '@core/components/mui/TextField'





type Props = {
  open: boolean
  handleClose: () => void
  onDataSubmit: (data: SupplierRequestForm) => Promise<void>
}

const AddSupplierDrawer = (props: Props) => {
  // Props
  const { open, handleClose, onDataSubmit } = props



  const defaulValues = {
    name: "",
    email: "",
    contact: '',
    address: ""

  }

  // Hooks
  const {
    control,
    reset: resetForm,

    handleSubmit,
    formState: { errors },
  } = useForm<SupplierRequestForm>({
    defaultValues: defaulValues
  })


  // // Handle Form Submit
  const onSubmit = handleSubmit(async (data) => {


    await onDataSubmit(data)
    handleClose()
  }, (err) => console.log('err form', err))

  // Handle Form Reset
  const handleReset = () => {
    handleClose()
    resetForm(defaulValues)


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
        <Typography variant='h5'>Add Supplier</Typography>
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
                label='Name'
                placeholder='Jhon'
                {...(errors.name && { error: true, helperText: 'This field is required.' })}
              />
            )}
          />

          <Controller
            name='contact'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                type='number'
                fullWidth
                label='Contact'
                placeholder='081278855'
                {...(errors.contact && { error: true, helperText: 'This field is required.' })}
              />
            )}
          />

          <Controller
            name='email'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Email'
                placeholder='email@mail.com'
                {...(errors.email && { error: true, helperText: 'This field is required.' })}
              />
            )}
          />



          <Controller
            name='address'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                multiline
                rows={4}
                label='address'
                placeholder='Enter a address...'
                {...(errors.address && { error: true, helperText: 'This field is required.' })}
              />
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

export default AddSupplierDrawer
