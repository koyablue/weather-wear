import Cookies, { CookieAttributes } from 'js-cookie'

// constants
import { COLOR_THEME_COOKIE_NAME } from '../../constants/colorTheme'

// types
import { ColorTheme } from '../../types/colorTheme'

/**
 * Set cookie
 *
 * @param {string} name
 * @param {string} value
 * @param {CookieAttributes} [options]
 */
export const setCookie = (name: string, value: string, options?: CookieAttributes) => {
  Cookies.set(name, value, options)
}

/**
 * Get cookie by given cookie name
 *
 * @param {string} name
 * @return {*}  {string}
 */
export const getCookie = (name: string): string => Cookies.get(name) || ''
