import { colorThemes } from '../constants/colorTheme'
import { ClothingGuidelineScale } from '../types/clothingGuidelineScale'
import { ColorTheme } from '../types/colorTheme'

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

/**
 * Returns color code based on the scale and color theme
 *
 * @param {ClothingGuidelineScale} scale
 * @param {ColorTheme} colorTheme
 * @return {*} string
 */
export const getColorByClothingGuidelineScale = (scale: ClothingGuidelineScale, colorTheme: ColorTheme): string => {
  if (colorTheme === 'dark') {
    switch (scale) {
      case 5:
        return '#ff8982'
      case 4:
        return '#ff8962'
      case 3:
        return '#00ac7c'
      case 2:
        return '#36b2c3'
      case 1:
        return '#9e9dff'
      default:
        colorThemes[colorTheme].colors.text
    }
  }

  // light theme　as the default
  switch (scale) {
    case 5:
      return '#ff8982'
    case 4:
      return '#ff8962'
    case 3:
      return '#7fd1ae'
    case 2:
      return '#a1dedb'
    case 1:
      return '#9e9dff'
    default:
      colorThemes[colorTheme].colors.text
  }
}
