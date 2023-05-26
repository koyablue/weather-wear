// redux
import { useAppDispatch, useAppSelector } from '../stores/hooks'
import { updateColorTheme, selectColorTheme } from '../stores/slices/colorThemeSlice'

// utils

import { getColorThemeCookie, setColorThemeCookie } from '../utils/cookie/colorTheme'

// constants
import { colorThemeConfig } from '../constants/colorTheme'

// styles
import { darkTheme, lightTheme } from '../styles/themes'

// types
import { ColorTheme, ColorThemeStyle, isColorTheme } from '../types/colorTheme'

/**
 * Custom hook to use color themes
 *
 * @return {*} {
    readonly changeColorTheme: (colorTheme: ColorTheme) => void;
  }
 */
export const useColorTheme = () => {
  const dispatch = useAppDispatch()
  const currentColorThemeState = useAppSelector(selectColorTheme)

  const currentColorThemeCookie = getColorThemeCookie()

  /**
   * Set color theme to cookie and state
   * set new cookie or overwrite existing cookie
   *
   * @param {ColorTheme} colorTheme
   */
  const setColorTheme = (colorTheme: ColorTheme) => {
    setColorThemeCookie(colorTheme)
    dispatch(updateColorTheme(colorTheme))
  }

  /**
   * Initialize color theme
   *
   */
  const initColorTheme = () => {
    // system preference comes first
    // if dark, set dark. else set nothing
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      if (event.matches) {
        setColorTheme(colorThemeConfig.dark)
        return
      }
    })

    // if cookie isn't set, set light mode
    if (!currentColorThemeCookie) {
      setColorTheme(colorThemeConfig.light)
      return
    }

    // if cookie value doesn't match color theme state
    // if cookie value is valid then use that value else set light mode
    if (currentColorThemeCookie !== currentColorThemeState) {
      const themeToApply = isColorTheme(currentColorThemeCookie)
        ? currentColorThemeCookie
        : colorThemeConfig.light

      setColorTheme(themeToApply)
      return
    }

    dispatch(updateColorTheme(currentColorThemeCookie))
  }

  /**
   *
   *
   * @return {*} ColorTheme
   */
  const getCurrentColorTheme = (): ColorTheme => {
    if (currentColorThemeCookie !== currentColorThemeState) {
      initColorTheme()
      return currentColorThemeState
    }
    return currentColorThemeState
  }

  /**
   *
   *
   * @param {ColorTheme} colorTheme
   * @return {*} ColorThemeStyle
   */
  const getColorThemeStyle = (colorTheme: ColorTheme): ColorThemeStyle => {
    switch (colorTheme) {
      case colorThemeConfig.dark:
        return darkTheme
      default:
        return lightTheme
    }
  }

  return {
    initColorTheme,
    getCurrentColorTheme,
    setColorTheme,
    getColorThemeStyle,
  } as const
}
