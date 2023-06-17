import { ColorTheme, ColorThemeStyle } from "../types/colorTheme"
import { lightTheme, darkTheme } from "../styles/themes"

export const colorThemeConfig = {
  light: 'light',
  dark: 'dark',
} as const

export const colorThemes: { [key in ColorTheme]: ColorThemeStyle } = {
  light: lightTheme,
  dark: darkTheme,
}

export const COLOR_THEME_COOKIE_NAME = 'colorTheme'
