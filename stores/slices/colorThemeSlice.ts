import { createSlice } from '@reduxjs/toolkit'

// types
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { ColorTheme } from '../../types/colorTheme'

type ColorThemeState = {
  theme: ColorTheme
  isInit: boolean
}

const initialState: ColorThemeState = {
  theme: 'light',
  isInit: false,
}

const colorThemeSlice = createSlice({
  name: 'colorTheme',
  initialState,
  reducers: {
    updateColorTheme: (state, action: PayloadAction<ColorTheme>) => {
      state.theme = action.payload
    },
    updateColorThemeInitState: (state, action: PayloadAction<boolean>) => {
      state.isInit = action.payload
    },
  },
})

// actions
export const {
  updateColorTheme,
  updateColorThemeInitState
} = colorThemeSlice.actions

// selector
export const selectColorTheme = (state: RootState) => state.colorTheme.theme
export const selectColorThemeInit = (state: RootState) => state.colorTheme.isInit

export default colorThemeSlice.reducer
