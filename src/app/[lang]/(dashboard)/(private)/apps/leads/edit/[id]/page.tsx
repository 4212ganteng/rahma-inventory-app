import { Grid } from '@mui/material'

import LeadsFormHandler from '@/views/apps/leads/form-handler'



const EditLeads = () => {
  return (
    <Grid container spacing={6} className='match-height'>
      <Grid item xs={12}>
        <LeadsFormHandler isEdit={true} />
      </Grid>
    </Grid>
  )
}

export default EditLeads
