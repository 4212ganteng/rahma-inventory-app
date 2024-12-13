'use client'

import { Fragment, useEffect } from 'react';

import { Card, CardContent, Grid, Typography } from '@mui/material';

import { valibotResolver } from '@hookform/resolvers/valibot';
import { Controller, useForm } from 'react-hook-form';

import LoadingButton from '@mui/lab/LoadingButton';

import CustomAutocomplete from '@/@core/components/mui/Autocomplete';
import CustomTextField from '@/@core/components/mui/TextField';
import { useStandarizedOptions } from '@/hooks/useStandarizedOptions';
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker';
import type { AddStockForm } from '@/types/apps/InventoryType';
import { UseProduct } from '../../product/list/hooks/useProduct';
import { useInventory } from '../hooks/useInventory';
import addStockSchema from '../schema/addStockSchema';


const FormHandlerAddStock = () => {
  const { FetchAllProducts, dataProducts } = UseProduct()
  const { AddStock } = useInventory()



  const defaultValues = {
    productId: "",
    quantity: 0,
    expiryDate: ""
  }


  const listOptionsProduct = useStandarizedOptions(dataProducts, 'name', 'id')




  // React Hook Form
  const {
    control,
    handleSubmit,
    formState: { errors },

  } = useForm<AddStockForm>({
    defaultValues: defaultValues,

    // resolver: valibotResolver(addStockSchema)
  })


  // Handle Form Submit
  const onSubmit = handleSubmit(async (data: AddStockForm) => {

    const payload: AddStockForm = {
      ...data,
      productId: data.productId.value
    }

    AddStock(payload)

    // await onDataSubmit(data)


  })


  useEffect(() => {
    FetchAllProducts()
  }, [])

  return (


    <Fragment>
      <Card>
        {/* <CardHeader title={edited ? t('Edit Allowance') : t('Add Allowance')} /> */}
        <CardContent>
          <div className='p-6'>
            <form onSubmit={onSubmit} className='flex flex-col gap-5'>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={12}>
                  <Controller
                    name='productId'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, ...field } }) => (

                      <CustomAutocomplete
                        {...field}

                        options={listOptionsProduct}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        onChange={(e, value) => onChange(value)}
                        renderInput={params => (
                          <CustomTextField
                            required
                            {...params}
                            label={'Product'}
                            {...(errors.productId && { helperText: errors.productId.message })}
                          />
                        )}
                      />
                    )}
                  />
                </Grid>


                <Grid item xs={12} sm={6}>
                  <Controller
                    name='quantity'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        type="number"
                        fullWidth
                        required
                        label='Quantity'
                        error={Boolean(errors.quantity)}
                        helperText={errors.quantity?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name="expiryDate"
                    control={control}
                    rules={{ required: true }}

                    render={({ field: { onChange, value } }) => (
                      <>
                        <Typography className="min-is-[95px] mie-4" color="text.primary">
                          Expired Date:
                        </Typography>
                        <AppReactDatepicker
                          selected={value ? new Date(value) : null}
                          placeholderText="YYYY-MM-DD"
                          dateFormat="yyyy-MM-dd"
                          onChange={(date) => onChange(date ? date.toISOString().split('T')[0] : '')}
                          customInput={
                            <CustomTextField
                              fullWidth
                              error={!!errors.expiryDate}
                              helperText={errors.expiryDate?.message}
                            />
                          }
                        />
                      </>
                    )}
                  />
                </Grid>




                <Grid item xs={12}>
                  <LoadingButton

                    // loading={loading}
                    type='submit'
                    variant='contained'

                  // disabled={_.isEmpty(dirtyFields) || !isValid}

                  >
                    Submit
                  </LoadingButton>
                </Grid>
              </Grid>
            </form>
          </div>
        </CardContent>
      </Card>
    </Fragment>
  )
}

export default FormHandlerAddStock
