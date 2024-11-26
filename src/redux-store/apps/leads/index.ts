import { toast } from 'react-toastify'

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api_v1 from '@/utils/axios/api_v1'
import { getErrorMessage } from '@/helper/getErrorMessage'

// fetch leads
export const fetchLeads = createAsyncThunk('leads/fetchLeads', async (params, { rejectWithValue }) => {
  try {
    const response = await api_v1.get('/leads', { params })

    return response.data
  } catch (error) {
    const errorMessage = getErrorMessage(error)

    toast.error(errorMessage)

    return rejectWithValue(errorMessage)
  }
})

export const addLead = createAsyncThunk('leads/addLead', async (leadData, { rejectWithValue }) => {
  try {
    const response = await api_v1.post('/leads', leadData)

    toast.success('Lead added successfully!')

    return response.data
  } catch (error) {
    const errorMessage = getErrorMessage(error)

    toast.error(errorMessage)

    return rejectWithValue(errorMessage)
  }
})

const leadsSlice = createSlice({
  name: 'leadsSlice',
  initialState: {
    leads: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    // Fetch Leads
    builder.addCase(fetchLeads.pending, state => {
      state.loading = true
      state.error = null
    })

    builder.addCase(fetchLeads.fulfilled, (state, action) => {
      state.leads = action.payload
      state.loading = false
    })

    builder.addCase(fetchLeads.rejected, (state, action) => {
      state.error = action.payload || action.error.message
      state.loading = false
    })

    // Add Lead
    builder.addCase(addLead.pending, state => {
      state.loading = true
      state.error = null
    })

    builder.addCase(addLead.rejected, (state, action) => {
      state.error = action.payload || action.error.message
      state.loading = false
    })
  }
})

export default leadsSlice.reducer
