import { getCookie, setCookie } from 'cookies-next'

import { COLOR_THEME_COOKIE_NAME } from '../../constants/colorTheme'

import { ColorTheme, isColorTheme } from '../../types/colorTheme'

// because OptionType cannot be exported
type Options = Parameters<typeof setCookie>[2]

/**
 * Set cookie for color theme
 *
 * @param {ColorTheme} value
 * @param {Options} [options]
 */
export const setColorThemeCookie = (value: ColorTheme, options?: Options) => {
  setCookie(COLOR_THEME_COOKIE_NAME, value, options)
}

/**
 * Get color theme config from cookie
 *
 * @param {Options} [options]
 * @return {*}  {(ColorTheme | string)}
 */
export const getColorThemeCookie = (options?: Options): ColorTheme | string => {
  const colorThemeCookie = getCookie(COLOR_THEME_COOKIE_NAME, options)
  return isColorTheme(colorThemeCookie) ? colorThemeCookie : ''
}
