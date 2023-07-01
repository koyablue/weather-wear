import React, { ReactElement, ReactNode } from 'react'

import { render, screen , RenderOptions} from '@testing-library/react'
import '@testing-library/jest-dom'

import Main from '../../components/pages/main'

import { celsiusToClothingGuidelineScale, getClothingAdviceByClothingGuidelineScale } from '../../services/clothingGuidelineScale'

import { Provider } from 'react-redux'
import { store } from '../../stores/store'

jest.mock('../public/images/svgs/tank-top.svg', () => () => <svg data-testid="tank-top-svg" />)

// svg mocks are always overwritten by Jest somehow.
// If this mock exists, the test always get t-shirt svg.
// jest.mock('../public/images/svgs/t-shirt.svg', () => () => <svg data-testid="t-shirt-svg" />)

const useGeolocationMockData = {
  coord: { lat: 0, lon: 0, },
  error: null,
}

jest.mock('../../hooks/data/useGeolocation.ts', () => ({
  useGeolocation: () => {
    return useGeolocationMockData
  }
}))

const useReverseGeocodingMockData = {
  userLocation: { cityName: '' },
  error: null,
  isLoading: false,
  isValidating: false,
}

jest.mock('../../hooks/data/useReverseGeocoding.ts', () => ({
  useReverseGeocoding: () => {
    return useReverseGeocodingMockData
  }
}))

const useGetCurrentWeatherMockData = {
  currentTemperature: {},
  error: null,
  isLoading: false,
  isValidating: false,
}

jest.mock('../../hooks/data/useGetCurrentWeather.ts', () => ({
  useGetCurrentWeather: () => {
    return useGetCurrentWeatherMockData
  },
}))

// https://testing-library.com/docs/react-testing-library/setup/
const AllTheProviders: React.FC = ({ children }: { children?: ReactNode }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}

// https://testing-library.com/docs/react-testing-library/setup/
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, {wrapper: AllTheProviders, ...options})

describe('Main page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('Loading component should be in the document while lat and lon of coord are both 0', () => {
    customRender(<Main geolocationApiKey='abc' reverseGeocodingApiKey='def' />)

    expect(screen.getByTestId('loading')).toBeInTheDocument()
  })

  it('Loading component should be in the document when the data is loading', () => {
    useGetCurrentWeatherMockData.isLoading = true
    useGetCurrentWeatherMockData.isValidating = false

    customRender(<Main geolocationApiKey='abc' reverseGeocodingApiKey='def' />)

    expect(screen.getByTestId('loading')).toBeInTheDocument()
  })

  it('Loading component should not be in the document when the data is loaded', () => {
    useGeolocationMockData.coord.lat = 35.652832
    useGeolocationMockData.coord.lon = 139.839478

    useReverseGeocodingMockData.isLoading = false
    useReverseGeocodingMockData.isValidating = false

    useGetCurrentWeatherMockData.isLoading = false
    useGetCurrentWeatherMockData.isValidating = false

    customRender(<Main geolocationApiKey='abc' reverseGeocodingApiKey='def' />)

    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
  })

  it ('The clothes icon and scale chart are in the document', () => {
    useGeolocationMockData.coord.lat = 35.652832
    useGeolocationMockData.coord.lon = 139.839478
    useGetCurrentWeatherMockData.currentTemperature = {
      temp: 25
    }

    const scale = celsiusToClothingGuidelineScale(25)
    const message = getClothingAdviceByClothingGuidelineScale(scale)

    customRender(<Main geolocationApiKey='abc' reverseGeocodingApiKey='def' />)

    expect(screen.getByText(message)).toBeInTheDocument()
    expect(screen.getByTestId('tank-top-svg')).toBeInTheDocument();
    expect(screen.getByTestId('clothing-guideline-scale-chart')).toBeInTheDocument()
  })
})
