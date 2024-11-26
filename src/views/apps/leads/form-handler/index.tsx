'use client'

// React Imports
import { useEffect, useState } from 'react'

// MUI Imports

import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

// Third-party Imports
import { valibotResolver } from '@hookform/resolvers/valibot'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import type { InferInput } from 'valibot'
import { email, minLength, nonEmpty, object, pipe, string } from 'valibot'

// Components Imports
import CustomTextField from '@core/components/mui/TextField'
import { getWilayahApi } from '@/utils/wilayah'



type FormData = InferInput<typeof schema>


const schema = object({
  company: pipe(
    string(),
    nonEmpty('This field is required'),
    minLength(3, 'First Name must be at least 3 characters long')

  ),
  industry: pipe(
    string(),
    nonEmpty('This field is required'),
  ),
  picFirstName: pipe(
    string(),
    nonEmpty('This field is required'),
    minLength(3, 'First Name must be at least 3 characters long')
  ),
  picLastName: pipe(
    string(),
    minLength(3, 'First Name must be at least 3 characters long')

  ),
  picEmail: pipe(
    string(),
    minLength(1, 'This field is required'),
    email('Please enter a valid email address')
  ),
  picPhone: pipe(
    string(),
    nonEmpty('This field is required'),
    minLength(1, 'This field is required'),

  ),
  legalEntity: pipe(
    string(),
    nonEmpty('This field is required'),
    minLength(1, 'This field is required'),

  ),

  leadSource: pipe(
    string(),
    nonEmpty('This field is required'),
    minLength(1, 'This field is required'),

  ),
  leadStatus: pipe(
    string(),
    nonEmpty('This field is required'),
    minLength(1, 'This field is required'),

  ),
  city: pipe(
    string(),
    nonEmpty('This field is required'),
    minLength(1, 'This field is required'),

  ),
  province: pipe(
    string(),
    nonEmpty('This field is required'),
    minLength(1, 'This field is required'),

  ),
  address: pipe(
    string(),
    nonEmpty('This field is required'),
    minLength(1, 'This field is required'),

  ),



})

const defaultValues = {
  company: '',
  industry: '',
  picFirstName: '',
  picLastName: '',
  picEmail: '',
  picPhone: '',
  legalEntity: '',
  leadSource: '',
  leadStatus: '',
  city: '',
  province: '',
  address: '',
}



const LeadsFormHandler = ({ isEdit }: { isEdit: boolean }) => {

  // region State
  const [provinces, setProvinces] = useState([])
  const [cities, setCities] = useState([])
  const [districts, setDistricts] = useState([])
  const [villages, setVillages] = useState([])


  useEffect(() => {
    getWilayahApi('/provinces.json').then(resProvince => {
      const dataProvince = resProvince.data

      const formattedData = dataProvince.map(item => ({
        label: item.name,
        code: item.id
      }))

      setProvinces(formattedData)
    })
  }, [])

  const fetchCity = (provinceId: string) => {
    if (provinceId) {
      try {
        getWilayahApi(`/regencies/${provinceId}`).then(resCity => {
          const dataCity = resCity.data

          const formattedData = dataCity.map(item => ({
            label: item.name,
            code: item.id
          }))

          setCities(formattedData)
        })
      } catch (error) {
        console.log(error)
      }

    }
  }

  const fetchDistrict = (cityId: string) => {
    if (cityId) {



    }
  }






  // Hook Form
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues,
    resolver: valibotResolver(schema)
  })

  if (isEdit) { }


  const onSubmit = () => toast.success('Form Submitted')

  return (
    <Card>
      <CardHeader title='Create Lead' />
      <Divider />
      <form onSubmit={handleSubmit(onSubmit)}>

        <CardContent>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Typography>
                Company Details
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='company'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Company Name'
                    placeholder='PT. Company'
                    value={field.value}
                    {...(errors.company && { error: true, helperText: errors.company.message })}
                  />
                )}

              />

            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='industry'
                control={control}
                rules={{ required: true }}
                render={(field) => (
                  <CustomTextField
                    {...field}
                    select
                    fullWidth
                    label='Industry'
                    error={Boolean(errors.industry)}
                  >
                    <MenuItem value=''>Select Country</MenuItem>
                    <MenuItem value='UK'>UK</MenuItem>
                    <MenuItem value='USA'>USA</MenuItem>
                    <MenuItem value='Australia'>Australia</MenuItem>
                    <MenuItem value='Germany'>Germany</MenuItem>
                  </CustomTextField>
                )}

              />

            </Grid>



            <Grid item xs={12} sm={6}>
              <Controller
                name='picFirstName'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Pic First Name'
                    placeholder='Aziz'
                    value={field.value}
                    {...(errors.company && { error: true, helperText: errors.company.message })}
                  />
                )}

              />

            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='picLastName'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Pic Last Name'
                    placeholder='Ganteng'
                    value={field.value}
                    {...(errors.company && { error: true, helperText: errors.company.message })}
                  />
                )}

              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='picEmail'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    type='email'
                    label='Pic Email'
                    placeholder='johndoe@gmail.com'
                    {...(errors.picEmail && { error: true, helperText: 'This field is required.' })}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='picPhone'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Pic Phone'
                    type='number'
                    placeholder='081234567890'
                    value={field.value}
                    {...(errors.picPhone && { error: true, helperText: errors.picPhone.message })}
                  />
                )}

              />
            </Grid>


            <Grid item xs={12} sm={6}>
              <Controller
                name='legalEntity'
                control={control}
                rules={{ required: true }}
                render={(field) => (
                  <CustomTextField
                    {...field}
                    select
                    fullWidth
                    label='Legal Entity'
                    error={Boolean(errors.legalEntity)}
                  >
                    <MenuItem value=''>Select Country</MenuItem>
                    <MenuItem value='UK'>UK</MenuItem>
                    <MenuItem value='USA'>USA</MenuItem>
                    <MenuItem value='Australia'>Australia</MenuItem>
                    <MenuItem value='Germany'>Germany</MenuItem>
                  </CustomTextField>
                )}

              />
            </Grid>


            <Grid item xs={12} sm={6}>
              <Controller
                name='leadSource'
                control={control}
                rules={{ required: true }}
                render={(field) => (
                  <CustomTextField
                    {...field}
                    select
                    fullWidth
                    label='Lead Source'
                    error={Boolean(errors.leadSource)}
                  >
                    <MenuItem value=''>Select Country</MenuItem>
                    <MenuItem value='UK'>UK</MenuItem>
                    <MenuItem value='USA'>USA</MenuItem>
                    <MenuItem value='Australia'>Australia</MenuItem>
                    <MenuItem value='Germany'>Germany</MenuItem>
                  </CustomTextField>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='leadStatus'
                control={control}
                rules={{ required: true }}
                render={(field) => (
                  <CustomTextField
                    {...field}
                    select
                    fullWidth
                    label='Lead Status'
                    error={Boolean(errors.leadStatus)}
                  >
                    <MenuItem value=''>Select Country</MenuItem>
                    <MenuItem value='UK'>UK</MenuItem>
                    <MenuItem value='USA'>USA</MenuItem>
                    <MenuItem value='Australia'>Australia</MenuItem>
                    <MenuItem value='Germany'>Germany</MenuItem>
                  </CustomTextField>
                )}
              />
            </Grid>



            {/* address */}
            <Grid item xs={12}>
            </Grid>
            <Grid item xs={12}>
              <Typography >
                Company Address
              </Typography>
            </Grid>



            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                rows={4}
                multiline
                label='Address'
                placeholder='1456, Liberty Street'

              // value={cardData.address}
              // onChange={e => setCardData({ ...cardData, address: e.target.value })}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='City'
                placeholder='New York'

              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                select
                fullWidth
                label='Country'

              // value={cardData.country}
              // onChange={e => setCardData({ ...cardData, country: e.target.value })}
              >
                <MenuItem value=''>Select Country</MenuItem>
                <MenuItem value='UK'>UK</MenuItem>
                <MenuItem value='USA'>USA</MenuItem>
                <MenuItem value='Australia'>Australia</MenuItem>
                <MenuItem value='Germany'>Germany</MenuItem>
              </CustomTextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                type='number'
                label='ZIP Code'
                placeholder='10005'

              // value={cardData.zipCode}
              // onChange={e => setCardData({ ...cardData, zipCode: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Landmark'
                placeholder='Nr Wall Street'

              // value={cardData.landmark}
              // onChange={e => setCardData({ ...cardData, landmark: e.target.value })}
              />
            </Grid>



          </Grid>


        </CardContent>
        <Divider />
        <CardActions>
          <Button type='submit' variant='contained' className='mie-2'>
            Submit
          </Button>
          <Button
            type='reset'
            variant='tonal'
            color='secondary'

          // onClick={() => {
          //   handleReset()
          // }}
          >
            Reset
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}


export default LeadsFormHandler
