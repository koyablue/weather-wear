import { ClothingGuidelineScale } from '../types/clothingGuidelineScale'

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
export const celsiusToClothingGuidelineScale = (celsius: number): ClothingGuidelineScale => {
  switch (true) {
    case (celsius >= 25):
      return 5
    case (celsius >= 20 && celsius <= 24):
      return 4
    case (celsius >= 15 && celsius <= 19):
      return 3
    case (celsius >= 10 && celsius <= 14):
      return 2
    case (celsius <= 9):
      return 1
  }
}

// TODO: Implement a function returns icon based on the scale
// TODO: make paths(and filenames) constants

// 5: tank top
// 4: t-shirts
// 3: long sleeve
// 2: jacket
// 1: puffer jacket
