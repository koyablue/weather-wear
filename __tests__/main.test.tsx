import React, { ReactElement, ReactNode } from 'react'
import { render, screen , RenderOptions} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { rest } from 'msw'
import { setupServer } from 'msw/node'
import Main from '../components/pages/main'
import { celsiusToClothingGuidelineScale, getClothingAdviceByClothingGuidelineScale } from '../services/clothingGuidelineScale'
import { Provider } from 'react-redux'
import { store } from '../stores/store'

import '@testing-library/jest-dom'
import { getByTestId, waitForElementToBeRemoved } from '@storybook/testing-library'

jest.mock('../public/images/svgs/tank-top.svg', () => () => <svg data-testid="tank-top-svg" />);
// jest.mock('../public/images/svgs/t-shirt.svg', () => () => <svg data-testid="t-shirt-svg" />);
// jest.mock('../public/images/svgs/long-sleeve.svg', () => () => <svg data-testid="long-sleeve-svg" />);
// jest.mock('../public/images/svgs/hoodie.svg', () => () => <svg data-testid="hoodie-svg" />);
// jest.mock('../public/images/svgs/puffer-jacket.svg', () => () => <svg data-testid="puffer-jacket-svg" />);

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

describe('Rendering', () => {
  describe('Main page', () => {
    // beforeEach(async() => {
    //   useGetUserLocationMockData.userLocation = {
    //     cityName: 'Tokyo',
    //     lat: 35.652832,
    //     lon: 139.839478,
    //   }

    //   useGetCurrentWeatherMockData.currentTemperature = {
    //     temp: 25
    //   }
    //   customRender(<Main geolocationApiKey='abc' />)

    //   // await waitForElementToBeRemoved(() => screen.getByTestId('loading'))
    // })

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


      //  render(
      //   <Provider store={store}>
      //     <Main geolocationApiKey='abc' />
      //   </Provider>
      // )
      customRender(<Main geolocationApiKey='abc' />)
      expect(screen.getByText(message)).toBeInTheDocument()

      expect(screen.getByTestId('tank-top-svg')).toBeInTheDocument();
      // expect(screen.getByTestId('clothing-guideline-scale-chart')).toBeInTheDocument();
      // expect(screen.getByText(/Stay prepared for temperature changes/)).toBeInTheDocument();
    })
  })
})
