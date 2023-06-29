import { renderHook, act } from '@testing-library/react'

// import { useAppSelector } from '../../../stores/hooks'
import { useColorTheme } from '../../../hooks/useColorTheme'
import { updateColorTheme, selectColorTheme } from '../../../stores/slices/colorThemeSlice'
import { getColorThemeCookie, setColorThemeCookie } from '../../../utils/cookie/colorTheme'
import { colorThemeConfig } from '../../../constants/colorTheme'

const mockDispatch = jest.fn();
const mockSelector = jest.fn()
jest.mock('../../../stores/hooks', () => ({
  useAppSelector: () => mockSelector,
  useAppDispatch: () => mockDispatch
}))

jest.mock('../../../utils/cookie/colorTheme', () => ({
  getColorThemeCookie: jest.fn(),
  setColorThemeCookie: jest.fn(),
  setColorTheme: jest.fn()
}))

jest.mock('../../../stores/slices/colorThemeSlice', () => ({
  updateColorTheme: jest.fn(),
  selectColorTheme: jest.fn(),
}))

describe('useColorTheme', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should initialize color theme to light if cookie is not set', () => {
    (getColorThemeCookie as jest.Mock).mockReturnValue(null)

    const mockUpdateColorTheme = jest.fn();
    jest.mock('../../../stores/slices/colorThemeSlice', () => ({
      updateColorTheme: mockUpdateColorTheme,
    }))

    const { result } = renderHook(() => useColorTheme())

    // comment out act() to prevent "act(...) is not supported in production builds of React" error in Vercel
    // The test passes without act() so I think it's ok for now
    // act(() => {
      result.current.initColorTheme()
    // })

    expect(setColorThemeCookie).toHaveBeenCalledWith(colorThemeConfig.light)
    expect(mockDispatch).toHaveBeenCalled();
    expect(updateColorTheme).toHaveBeenCalledWith(colorThemeConfig.light)
  })

  it('should initialize color theme based on cookie value', () => {
    (getColorThemeCookie as jest.Mock).mockReturnValue(colorThemeConfig.dark)
    mockSelector.mockReturnValue(colorThemeConfig.light)

    const { result } = renderHook(() => useColorTheme())
    // comment out act() to prevent "act(...) is not supported in production builds of React" error in Vercel
    // The test passes without act() so I think it's ok for now
    // act(() => {
      result.current.initColorTheme()
    // })

    expect(setColorThemeCookie).toHaveBeenCalledWith(colorThemeConfig.dark)
    expect(updateColorTheme).toHaveBeenCalledWith(colorThemeConfig.dark)
  })
})
