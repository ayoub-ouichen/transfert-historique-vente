import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import API from '../services/api';
const URL = 'http://localhost:6523/';

const parameters = {
  source_id : '',
  destination_id : '',
  date_debut : '',
  date_fin : ''
}

const initialState = {
  databases: [],
  oldSecteurs: [],
  newSecteurs: [],
  db_status: 'idle',
  sc_status: 'idle',
  parameters,
  error: null
}

// Create the thunk
export const fetchDatabases = createAsyncThunk('agence/getAgences', async () => {
  let response = await API.get(URL + 'agence/getAgences')
  return response.data
})


export const fetchSecteurs = createAsyncThunk('agence/getSecteur', async (params) => {
    let response = await API.post(URL + 'agence/getSecteur', params)
    return response.data
})

export const dataFlowSlice = createSlice({
  name: 'dataFlow',
  initialState,
  reducers: {
    handleSelectClick: (state, action) => {
      state.parameters[action.payload[1]] = action.payload[0]
    }
  },
  //handle actions in extraReducers:
  extraReducers: (builder) => {
    builder
      .addCase(fetchDatabases.pending, (state, action) => {
        state.db_status = 'loading'
      })
      .addCase(fetchDatabases.fulfilled, (state, action) => {
        state.db_status = 'succeeded'
        state.databases = action.payload
      })
      .addCase(fetchDatabases.rejected, (state, action) => {
        state.db_status = 'failed'
        state.error = action.error.message
      })
      .addCase(fetchSecteurs.pending, (state, action) => {
        state.sc_status = 'loading'
      })
      .addCase(fetchSecteurs.fulfilled, (state, action) => {
        state.sc_status = 'succeeded'
        state.newSecteurs = action.payload.new_secteurs
        state.oldSecteurs = action.payload.old_secteurs
      })
      .addCase(fetchSecteurs.rejected, (state, action) => {
        state.sc_status = 'failed'
        state.error = action.error.message
      })
  }
})

// Action creators are generated for each case reducer function
export const getDatabasesList = (state) => state.dataFlow.databases;
export const getOldSecteurs = (state) => state.dataFlow.oldSecteurs;
export const getNewSecteurs = (state) => state.dataFlow.newSecteurs;
export const getDatabasesListStatus = (state) => state.dataFlow.db_status;
export const getParameters = (state) => state.dataFlow.parameters;
export const { handleSelectClick } = dataFlowSlice.actions

export default dataFlowSlice.reducer