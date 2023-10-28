import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import API from '../services/api';
const URL = 'http://localhost:6523/';

const parameters = {
  source_id : '',
  destination_id : '',
  date_debut : '',
  date_fin : ''
}

const chargementRubrique = {
  source_data: {
    secteur: [], 
    vendeur: [], 
    superviseur: []
  }, 
  destination_data: {
    secteur: [], 
    vendeur: [], 
    superviseur: []
  }
}

const initialState = {
  databases: [],
  secteurs: {
    old: [],
    new: []
  },
  vendeurs: {
    old: [],
    new: []
  },
  superviseurs: {
    old: [],
    new: []
  },
  db_status: 'idle',
  sc_status: 'idle',
  vd_status: 'idle',
  sp_status: 'idle',
  cr_status: 'idle',
  parameters,
  chargementRubrique,
  error: null
}

// Create the thunk
export const fetchDatabases = createAsyncThunk('agence/getAgences', async () => {
  let response = await API.get(URL + 'agence/getDatabases')
  return response.data
})

export const fetchSecteurs = createAsyncThunk('agence/getSecteur', async (params) => {
  let response = await API.post(URL + 'agence/getSecteur', params)
  return response.data
})

export const fetchVendeurs = createAsyncThunk('agence/getVendeur', async (params) => {
    let response = await API.post(URL + 'agence/getVendeur', params)
    return response.data
})

export const fetchSuperviseurs = createAsyncThunk('agence/getSuperviseur', async (params) => {
    let response = await API.post(URL + 'agence/getSuperviseur', params)
    return response.data
})

export const dataFlowSlice = createSlice({
  name: 'dataFlow',
  initialState,
  reducers: {
    handleSelectClick: (state, action) => {
      state.parameters[action.payload[1]] = action.payload[0]
    },
    setChargementRubrique: (state, action) => {
      // set source data
      state.chargementRubrique.source_data.secteur = action.payload.src.secteur
      state.chargementRubrique.source_data.vendeur = action.payload.src.vendeur
      state.chargementRubrique.source_data.superviseur = action.payload.src.superviseur
      // set destination data
      state.chargementRubrique.destination_data.secteur = action.payload.dst.secteur
      state.chargementRubrique.destination_data.vendeur = action.payload.dst.vendeur
      state.chargementRubrique.destination_data.superviseur = action.payload.dst.superviseur
      // update chargementRubrique status
      state.cr_status = 'succeeded'
    }
  },
  //handle actions in extraReducers:
  extraReducers: (builder) => {
    builder
      //fetch databases
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
      //fetch secteurs
      .addCase(fetchSecteurs.pending, (state, action) => {
        state.sc_status = 'loading'
      })
      .addCase(fetchSecteurs.fulfilled, (state, action) => {
        state.sc_status = 'succeeded'
        state.secteurs.new = action.payload.new_secteurs
        state.secteurs.old = action.payload.old_secteurs
      })
      .addCase(fetchSecteurs.rejected, (state, action) => {
        state.sc_status = 'failed'
        state.error = action.error.message
      })
      //fetch vendeurs
      .addCase(fetchVendeurs.pending, (state, action) => {
        state.vd_status = 'loading'
      })
      .addCase(fetchVendeurs.fulfilled, (state, action) => {
        state.vd_status = 'succeeded'
        state.vendeurs.new = action.payload.new_vendeurs
        state.vendeurs.old = action.payload.old_vendeurs
      })
      .addCase(fetchVendeurs.rejected, (state, action) => {
        state.vd_status = 'failed'
        state.error = action.error.message
      })
      //fetch superviseurs
      .addCase(fetchSuperviseurs.pending, (state, action) => {
        state.sp_status = 'loading'
      })
      .addCase(fetchSuperviseurs.fulfilled, (state, action) => {
        state.sp_status = 'succeeded'
        state.superviseurs.new = action.payload.new_superviseurs
        state.superviseurs.old = action.payload.old_superviseurs
      })
      .addCase(fetchSuperviseurs.rejected, (state, action) => {
        state.sp_status = 'failed'
        state.error = action.error.message
      })
  }
})

// Action creators are generated for each case reducer function
export const getDatabasesList = (state) => state.dataFlow.databases;
export const getDatabasesListStatus = (state) => state.dataFlow.db_status;
export const getParameters = (state) => state.dataFlow.parameters;
export const getChargementRubrique = (state) => state.dataFlow.chargementRubrique;
export const getChrgRbqStatus = (state) => state.dataFlow.cr_status;

export const getOldSecteurs = (state) => state.dataFlow.secteurs.old;
export const getNewSecteurs = (state) => state.dataFlow.secteurs.new;

export const getOldVendeurs = (state) => state.dataFlow.vendeurs.old;
export const getNewVendeurs = (state) => state.dataFlow.vendeurs.new;

export const getOldSuperviseurs = (state) => state.dataFlow.superviseurs.old;
export const getNewSuperviseurs = (state) => state.dataFlow.superviseurs.new;

export const { handleSelectClick, setChargementRubrique } = dataFlowSlice.actions

export default dataFlowSlice.reducer