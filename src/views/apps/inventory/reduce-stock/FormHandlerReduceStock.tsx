'use client'

import { Fragment, useEffect } from 'react';

import { Card, CardContent, Grid } from '@mui/material';

import { Controller, useForm } from 'react-hook-form';

import LoadingButton from '@mui/lab/LoadingButton';

import CustomAutocomplete from '@/@core/components/mui/Autocomplete';
import CustomTextField from '@/@core/components/mui/TextField';
import { useStandarizedOptions2 } from '@/hooks/useStandarizedOptions';
import type { reduceStockForm } from '@/types/apps/InventoryType';
import { UseProduct } from '../../product/list/hooks/useProduct';
import { useInventory } from '../hooks/useInventory';


const FormHandlerReduceStock = () => {
  const { FetchAllProducts, dataProducts } = UseProduct()
  const { ReduceStock } = useInventory()

  const defaultValues = {
    productId: "",
    quantity: 0,
  }

  const listOptionsProduct = useStandarizedOptions2(dataProducts, (item) => {
    return {
      label: item.name,
      value: item.id
    }
  })

  // React Hook Form
  const {
    control,
    handleSubmit,
    formState: { errors },

  } = useForm<reduceStockForm>({
    defaultValues: defaultValues,

    // resolver: valibotResolver(addStockSchema)
  })


  // Handle Form Submit
  const onSubmit = handleSubmit(async (data: reduceStockForm,) => {

    const payload: reduceStockForm = {
      ...data,
      productId: data.productId
    }

    ReduceStock(payload)

  }, err => console.log(err))


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

                        value={listOptionsProduct.find((item) => item.value === field.value)}

                        options={listOptionsProduct}
                        isOptionEqualToValue={(option, value) => option.value === value.value}
                        onChange={(e, value) => onChange(value?.value)}
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

export default FormHandlerReduceStock
