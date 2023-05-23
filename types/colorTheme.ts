import { colorThemeConfig } from '../constants/colorTheme'

import { ValueOf } from './util'

export type ColorTheme = ValueOf<typeof colorThemeConfig>

/**
 * type guard function for ColorTheme
 *
 * @param {string} val
 * @return {*}  {val is ColorTheme}
 */
export const isColorTheme = (val: string): val is ColorTheme => {
  return Object.keys(colorThemeConfig).includes(val)
}
