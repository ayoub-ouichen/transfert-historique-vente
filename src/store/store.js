import { configureStore } from '@reduxjs/toolkit'
import dataFlowSlice from '../featuers/dataFlowSlice'

export default configureStore({
  reducer: {
    dataFlow: dataFlowSlice
  }
})