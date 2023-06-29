// svgs
import TankTop from '../../public/images/svgs/tank-top.svg'
import TShirt from '../../public/images/svgs/t-shirt.svg'
import LongSleeve from '../../public/images/svgs/long-sleeve.svg'
import Hoodie from '../../public/images/svgs/hoodie.svg'
import PufferJacket from '../../public/images/svgs/puffer-jacket.svg'

import { ClothingGuidelineScale } from '../../types/clothingGuidelineScale'

type Props = {
  scale: ClothingGuidelineScale
  svgProps: React.SVGProps<SVGElement>
}

/**
 * Returns svg component based on scale.
 * icon source: https://iconscout.com/
 *
 * @param {Props} { scale, svgProps }
 * @return {*} JSX.Element | null
 */
const ClothesIcon = ({ scale, svgProps }: Props) => {
  let icon: JSX.Element | null

  switch (scale) {
    case 5:
      icon = <TankTop {...svgProps} data-testid='tank-top-svg' />
      break
    case 4:
      icon = <TShirt {...svgProps} />
      break
    case 3:
      icon =  <LongSleeve {...svgProps} />
      break
    case 2:
      icon =  <Hoodie {...svgProps} />
      break
    case 1:
      icon =  <PufferJacket {...svgProps} />
      break
    default:
      icon =  null
  }

  return (
    <>
      {icon}
    </>
  )
}

export default ClothesIcon
