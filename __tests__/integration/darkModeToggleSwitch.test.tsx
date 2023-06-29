import React, { ReactElement, ReactNode } from 'react'

import { render, screen , RenderOptions, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom'

import DarkModeToggleSwitch from '../../components/layouts/header/darkModeToggleSwitch'

import { Provider } from 'react-redux'
import { store } from '../../stores/store'

import { ColorTheme } from '../../types/colorTheme'

// mock color theme state
let currentColorTheme: ColorTheme = 'light'

const mockUseColorThemeReturnValue = {
  initColorTheme: () => {},
  getCurrentColorThemeState: () => 'light',
  setColorTheme: (colorTheme) => {currentColorTheme = colorTheme},
  getColorThemeStyle: () => {},
  getCurrentColorThemeStyle: () => {},
}

jest.mock('../../hooks/useColorTheme.ts', () => ({
  useColorTheme: () => {
    return mockUseColorThemeReturnValue
  }
}))

const AllTheProviders: React.FC = ({ children }: { children?: ReactNode }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, {wrapper: AllTheProviders, ...options})

describe('DarkModeToggleSwitch', () => {
  it('can toggle color theme', () => {
    customRender(<DarkModeToggleSwitch />)

    const toggleSwitch = screen.getByTestId('darkMode-checkbox')
    fireEvent.click(toggleSwitch)

    expect(currentColorTheme).toBe('dark')
  })
})
