import { createSlice } from '@reduxjs/toolkit'

// types
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

type CityData = {
  name: string
  lat: number
  lon: number
}

const initialState: CityData = {
  name: '',
  lat: 0,
  lon: 0,
}

const cityNameSearchInputSlice = createSlice({
  name: 'cityNameSearchInput',
  initialState,
  reducers: {
    updateCityData: (state, action: PayloadAction<CityData>) => {
      state.name = action.payload.name
      state.lat = action.payload.lat
      state.lon = action.payload.lon
    },
  },
})

// actions
export const {
  updateCityData,
} = cityNameSearchInputSlice.actions

// selector
export const selectCityData = (state: RootState) => state.cityNameSearchInput

export default cityNameSearchInputSlice.reducer
