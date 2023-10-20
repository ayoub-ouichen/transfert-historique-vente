import { createSlice } from '@reduxjs/toolkit'

export const dataFlowSlice = createSlice({
  name: 'dataFlow',
  initialState: {
    databases: [],
    parameters: {
        source_id : '',
        destination_id : '',
        date_debut : '',
        date_fin : ''
    }
  },
  reducers: {
    getDatabases: (state) => {
        API.get(URL + 'agence/getAgences')
        .then(function (response) {
            // handle success
            state.databases = response.data;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = dataFlowSlice.actions

export default dataFlowSlice.reducer