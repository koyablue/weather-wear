import { ClothingGuidelineScale } from '../types/clothingGuidelineScale'
import { ColorTheme } from '../types/colorTheme'

// svgs
import TankTop from '../public/images/svgs/tank-top.svg'
import TShirt from '../public/images/svgs/t-shirt.svg'
import LongSleeve from '../public/images/svgs/long-sleeve.svg'
import Hoodie from '../public/images/svgs/hoodie.svg'
import PufferJacket from '../public/images/svgs/puffer-jacket.svg'

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
        return '#a52a2a'
      case 4:
        return '#d2691e'
      case 3:
        return '#5b7e68'
      case 2:
        return '#4d7586'
      case 1:
        return '#295773'
    }
  }

  // light theme　as the default
  switch (scale) {
    case 5:
      return '#ffa6a6'
    case 4:
      return '#ffd3a5'
    case 3:
      return '#a1c9b0'
    case 2:
      return '#a8c5d6'
    case 1:
      return '#4f6a89'
  }
}

/**
 * Returns svg path based on scale for Next.js Image component
 * icon source: https://iconscout.com/
 *
 * @param {ClothingGuidelineScale} scale
 * @param {ColorTheme} colorTheme
 * @return {*}  {React.FC<React.SVGProps<SVGElement>>}
 */
export const getIconByClothingGuidelineScale = (scale: ClothingGuidelineScale, colorTheme: ColorTheme): React.FC<React.SVGProps<SVGElement>> => {
  const createIconComponent = (Element: React.FC<React.SVGProps<SVGElement>>) => {
    return (props: React.SVGProps<SVGElement>) => <Element {...props} />;
  }

  switch (scale) {
    case 5:
      return createIconComponent(TankTop)
    case 4:
      return createIconComponent(TShirt)
    case 3:
      return createIconComponent(LongSleeve)
    case 2:
      return createIconComponent(Hoodie)
    case 1:
      return createIconComponent(PufferJacket)
  }
}
