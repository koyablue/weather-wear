import {
  celsiusToClothingGuidelineScale,
  getClothingAdviceByClothingGuidelineScale,
  getColorByClothingGuidelineScale,
} from '../../services/clothingGuidelineScale'

import { colorThemes } from '../../constants/colorTheme'

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
} from '../../styles/clothingGuidelineScale'

describe('Clothing guideline scale service', () => {
  describe('celsiusToClothingGuidelineScale', () => {
    it('should return the correct clothing guideline scale based on celsius degree', () => {
      expect(celsiusToClothingGuidelineScale(25)).toBe(5)
      expect(celsiusToClothingGuidelineScale(24)).toBe(4)
      expect(celsiusToClothingGuidelineScale(20)).toBe(4)
      expect(celsiusToClothingGuidelineScale(19)).toBe(3)
      expect(celsiusToClothingGuidelineScale(15)).toBe(3)
      expect(celsiusToClothingGuidelineScale(14)).toBe(2)
      expect(celsiusToClothingGuidelineScale(10)).toBe(2)
      expect(celsiusToClothingGuidelineScale(9)).toBe(1)
      expect(celsiusToClothingGuidelineScale(0)).toBe(1)
      expect(celsiusToClothingGuidelineScale(-1)).toBe(1)
      expect(celsiusToClothingGuidelineScale()).toBe(0)
    })
  })

  describe('getClothingAdviceByClothingGuidelineScale', () => {
    it('should return the correct clothing advice based on the clothing guideline scale', () => {
      expect(getClothingAdviceByClothingGuidelineScale(5)).toBe('Wear lightweight and breathable clothes.')
      expect(getClothingAdviceByClothingGuidelineScale(4)).toBe('Choose light and airy clothing.')
      expect(getClothingAdviceByClothingGuidelineScale(3)).toBe('Opt for light layers.')
      expect(getClothingAdviceByClothingGuidelineScale(2)).toBe('Layer up with a light sweater or jacket.')
      expect(getClothingAdviceByClothingGuidelineScale(1)).toBe('Dress warmly in layers.')
      expect(getClothingAdviceByClothingGuidelineScale(0)).toBe('')
    })
  })

  describe('getColorByClothingGuidelineScale', () => {
    it('should return the correct color code based on the clothing guideline scale and color theme', () => {
      expect(getColorByClothingGuidelineScale(5, 'dark')).toBe(clrVeryHotDark);
      expect(getColorByClothingGuidelineScale(4, 'dark')).toBe(clrHotDark);
      expect(getColorByClothingGuidelineScale(3, 'dark')).toBe(clrWarmDark);
      expect(getColorByClothingGuidelineScale(2, 'dark')).toBe(clrColdDark);
      expect(getColorByClothingGuidelineScale(1, 'dark')).toBe(clrVeryColdDark);
      expect(getColorByClothingGuidelineScale(0, 'dark')).toBe(colorThemes.dark.colors.text);
      expect(getColorByClothingGuidelineScale(5, 'light')).toBe(clrVeryHotLight);
      expect(getColorByClothingGuidelineScale(4, 'light')).toBe(clrHotLight);
      expect(getColorByClothingGuidelineScale(3, 'light')).toBe(clrWarmLight);
      expect(getColorByClothingGuidelineScale(2, 'light')).toBe(clrColdLight);
      expect(getColorByClothingGuidelineScale(1, 'light')).toBe(clrVeryColdLight);
      expect(getColorByClothingGuidelineScale(0, 'light')).toBe(colorThemes.light.colors.text);
    });
  });
})
