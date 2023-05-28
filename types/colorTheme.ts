import { colorThemeConfig } from '../constants/colorTheme'

import { ValueOf } from './util'

export type ColorThemeStyle = {
  colors: {
    text: string
    background: string
  },
}

export type ColorTheme = ValueOf<typeof colorThemeConfig>

/**
 * type guard function for ColorTheme
 *
 * @param {string} val
 * @return {*}  {val is ColorTheme}
 */
export const isColorTheme = (val: any): val is ColorTheme => {
  return Object.keys(colorThemeConfig).includes(val)
}
