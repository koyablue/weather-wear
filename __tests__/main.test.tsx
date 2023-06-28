import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { rest } from 'msw'
import { setupServer } from 'msw/node'
import Main from '../components/pages/main'
import { celsiusToClothingGuidelineScale, getClothingAdviceByClothingGuidelineScale } from '../services/clothingGuidelineScale'
import { Provider } from 'react-redux'
import { store } from '../stores/store'

import '@testing-library/jest-dom'


// const server = setupServer(
//   rest.get()
// )

// beforeAll(() => server.listen())
// afterAll(() => server.close())
// afterEach(() => server.resetHandlers())

const useGetUserLocationMockData = {
  userLocation: {},
  error: null,
  isLoading: false,
  isValidating: false,
}

// export type UserLocation = {
//   cityName: string
//   lat: number
//   lon: number
// }

jest.mock('../hooks/data/useGetUserLocation.ts', () => ({
  useGetUserLocation: () => {
    return useGetUserLocationMockData
  },
}))

const useGetCurrentWeatherMockData = {
  currentTemperature: {},
  error: null,
  isLoading: false,
  isValidating: false,
}

jest.mock('../hooks/data/useGetCurrentWeather.ts', () => ({
  useGetCurrentWeather: () => {
    return useGetCurrentWeatherMockData
  },
}))

describe('Rendering', () => {
  describe('Main page', () => {
    // TODO: fix description later
    it ('main page test', () => {
      useGetUserLocationMockData.userLocation = {
        cityName: 'Tokyo',
        lat: 35.652832,
        lon: 139.839478,
      }

      useGetCurrentWeatherMockData.currentTemperature = {
        temp: 25
      }

      const scale = celsiusToClothingGuidelineScale(25)
      const message = getClothingAdviceByClothingGuidelineScale(scale)


      render(
        <Provider store={store}>
          <Main geolocationApiKey='abc' />
        </Provider>
      )
      expect(screen.getByText(message)).toBeInTheDocument()
    })
  })
})
