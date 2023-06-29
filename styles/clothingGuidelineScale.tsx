// Extension is .tsx to show color preview in the editor

import { ColorTheme } from '../types/colorTheme'

export const clrVeryHotLight = '#ff8982'
export const clrVeryHotDark = '#ff8982'
export const clrHotLight = '#ff8962'
export const clrHotDark = '#ff8962'
export const clrWarmLight = '#7fd1ae'
export const clrWarmDark = '#00ac7c'
export const clrColdLight = '#a1dedb'
export const clrColdDark = '#36b2c3'
export const clrVeryColdLight = '#9e9dff'
export const clrVeryColdDark = '#9e9dff'

/**
 *
 *
 * @param {{lightThemeColor: string; darkThemeColor: string}} colors
 * @return {*} (colors: {
    lightThemeColor: string;
    darkThemeColor: string;
  }) => (colorTheme: ColorTheme) => string
 */
const returnColor = (colors: {lightThemeColor: string; darkThemeColor: string}) => {
  return (colorTheme: ColorTheme) => {
    switch (colorTheme) {
      case 'dark':
        return colors.darkThemeColor
      default:
        return colors.lightThemeColor
    }
  }
}

export const clothingGuidelineScaleColors = (colorTheme: ColorTheme) => {
  return {
    veryHot: returnColor({lightThemeColor: clrVeryHotLight, darkThemeColor: clrVeryHotDark})(colorTheme),
    hot: returnColor({lightThemeColor: clrHotLight, darkThemeColor: clrHotDark})(colorTheme),
    warm: returnColor({lightThemeColor: clrWarmLight, darkThemeColor: clrWarmDark})(colorTheme),
    cold: returnColor({lightThemeColor: clrColdLight, darkThemeColor: clrColdDark})(colorTheme),
    veryCold: returnColor({lightThemeColor: clrVeryColdLight, darkThemeColor: clrVeryColdDark})(colorTheme),
  }
}
