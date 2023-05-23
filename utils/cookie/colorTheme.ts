import { setCookie, getCookie } from '.'

import { COLOR_THEME_COOKIE_NAME } from '../../constants/colorTheme'

import { ColorTheme } from '../../types/colorTheme'

/**
 * Set cookie for color theme
 *
 * @param {ColorTheme} value
 */
export const setColorThemeCookie = (value: ColorTheme) => {
  setCookie(COLOR_THEME_COOKIE_NAME, value)
}

/**
 * Get color theme config from cookie
 *
 * @return {*}  {ColorTheme}
 */
export const getColorThemeCookie = (): ColorTheme | string => {
  return getCookie(COLOR_THEME_COOKIE_NAME) || ''
}
