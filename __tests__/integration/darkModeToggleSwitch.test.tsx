import React, { ReactElement, ReactNode } from 'react'

import { render, screen , RenderOptions, fireEvent} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import DarkModeToggleSwitch from '../../components/layouts/header/darkModeToggleSwitch'

import { celsiusToClothingGuidelineScale, getClothingAdviceByClothingGuidelineScale } from '../../services/clothingGuidelineScale'

import { Provider } from 'react-redux'
import { store } from '../../stores/store'
import { useColorTheme } from '../../hooks/useColorTheme'
import { ColorTheme } from '../../types/colorTheme'
import { getByTestId } from '@storybook/testing-library'

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
  it('DarkModeToggleSwitch can toggle color theme', () => {
    customRender(<DarkModeToggleSwitch />)

    const toggleSwitch = screen.getByTestId('darkMode-checkbox')
    fireEvent.click(toggleSwitch)

    expect(currentColorTheme).toBe('dark')
  })
})
