// import { clothingGuidelineScaleColors } from '../styles/clothingGuidelineScale'
import { colorThemes } from '../constants/colorTheme'
import { ClothingGuidelineScale } from '../types/clothingGuidelineScale'
import { ColorTheme } from '../types/colorTheme'

// colors
import {
  clrVeryHotLight,
  clrVeryHotDark,
  clrHotLight,
  clrHotDark,
  clrWarmLight,
  clrWarmDark,
  clrColdLight,
  clrColdDark,
  clrVeryColdLight,
  clrVeryColdDark,
} from '../styles/clothingGuidelineScale'

/**
 * Convert celsius degree to clothing guideline scale
 *
 * Scales are as follows:
 * 5: 25 -
 * 4: 24 - 20
 * 3: 19 - 15
 * 2: 14 - 10
 * 1: 9 -
 *
 * @param {number} celsius
 * @return {*}  {ClothingGuidelineScale}
 */
export const celsiusToClothingGuidelineScale = (celsius?: number): ClothingGuidelineScale => {
  switch (true) {
    case (celsius >= 25):
      return 5
    case (celsius < 25 && celsius >= 20):
      return 4
    case (celsius < 20 && celsius >= 15):
      return 3
    case (celsius < 15 && celsius >= 10):
      return 2
    case (celsius < 10):
      return 1
    default:
      return 0
  }
}

/**
 * TODO: not necessary. might delete
 *
 * @param {ClothingGuidelineScale} scale
 * @return {*} string
 */
export const getLabelByClothingGuidelineScale = (scale: ClothingGuidelineScale) => {
  switch (scale) {
    case 5:
      return 'Very hot'
    case 4:
      return 'Hot'
    case 3:
      return 'Warm'
    case 2:
      return 'Cool'
    case 1:
      return 'Cold'
    default:
      return ''
  }
}

/**
 *
 *
 * @param {ClothingGuidelineScale} scale
 * @return {*} string
 */
export const getClothingAdviceByClothingGuidelineScale = (scale: ClothingGuidelineScale) => {
  switch (scale) {
    case 5:
      return 'Wear lightweight and breathable clothes.'
    case 4:
      return 'Choose light and airy clothing.'
    case 3:
      return 'Opt for light layers.'
    case 2:
      return 'Layer up with a light sweater or jacket.'
    case 1:
      return 'Dress warmly in layers.'
    default:
      return ''
  }
}

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

const clothingGuidelineScaleColors = (colorTheme: ColorTheme) => {
  return {
    veryHot: returnColor({lightThemeColor: clrVeryHotLight, darkThemeColor: clrVeryHotDark})(colorTheme),
    hot: returnColor({lightThemeColor: clrHotLight, darkThemeColor: clrHotDark})(colorTheme),
    warm: returnColor({lightThemeColor: clrWarmLight, darkThemeColor: clrWarmDark})(colorTheme),
    cold: returnColor({lightThemeColor: clrColdLight, darkThemeColor: clrColdDark})(colorTheme),
    veryCold: returnColor({lightThemeColor: clrVeryColdLight, darkThemeColor: clrVeryColdDark})(colorTheme),
  }
}

/**
 * Returns color code based on the scale and color theme
 *
 * @param {ClothingGuidelineScale} scale
 * @param {ColorTheme} colorTheme
 * @return {*} string
 */
export const getColorByClothingGuidelineScale = (scale: ClothingGuidelineScale, colorTheme: ColorTheme): string => {
  const colors = clothingGuidelineScaleColors(colorTheme)

  switch (scale) {
    case 5:
      return colors.veryHot
    case 4:
      return colors.hot
    case 3:
      return colors.warm
    case 2:
      return colors.cold
    case 1:
      return colors.veryCold
    default:
      return colorThemes[colorTheme].colors.text
  }
}
