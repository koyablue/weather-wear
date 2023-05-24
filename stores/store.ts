// https://redux-toolkit.js.org/tutorials/typescript

import { configureStore } from '@reduxjs/toolkit'

import colorThemeReducer from './slices/colorThemeSlice'

export const store = configureStore({
  reducer: {
    colorTheme: colorThemeReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
