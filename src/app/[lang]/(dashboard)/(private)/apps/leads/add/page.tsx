import { Grid } from '@mui/material'

// import component
import LeadsFormHandler from '@/views/apps/leads/form-handler'


const LeadsAdd = () => {
  return (
    <Grid container spacing={6} className='match-height'>
      <Grid item xs={12}>
        <LeadsFormHandler isEdit={false} />
      </Grid>
    </Grid>
  )
}

export default LeadsAdd
