import { createSlice } from '@reduxjs/toolkit'

// types
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { ColorTheme } from '../../types/colorTheme'

type ColorThemeState = {
  theme: ColorTheme
}

const initialState: ColorThemeState = {
  theme: 'light',
}

const colorThemeSlice = createSlice({
  name: 'colorTheme',
  initialState,
  reducers: {
    updateColorTheme: (state, action: PayloadAction<ColorTheme>) => {
      state.theme = action.payload
    }
  }
})

// actions
export const { updateColorTheme } = colorThemeSlice.actions

// selector
export const selectColorTheme = (state: RootState) => state.colorTheme.theme

export default colorThemeSlice.reducer
