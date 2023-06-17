import styled from 'styled-components'
import { ClothingGuidelineScale } from '../../../types/clothingGuidelineScale'
import { getColorByClothingGuidelineScale } from '../../../services/clothingGuidelineScale'
import { useColorTheme } from '../../../hooks/useColorTheme'

const ChartWrapperDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 100%;
`

const ChartItemDiv = styled.div`
  width: 20px;
  height: 20px;
  /* line-height: 20px; */
  background-color: ${props => props.color || '#ffffff'};
  border-radius: 50%;
  /* border: 1.5px solid; */
`

type Props = {
  scale: ClothingGuidelineScale
  itemCount?: number
}

const ClothingGuidelineScaleChart = ({ scale, itemCount = 5 }: Props) => {
  const { getCurrentColorThemeState } = useColorTheme()

  const color = getColorByClothingGuidelineScale(scale, getCurrentColorThemeState())

  const items: JSX.Element[] = []
  for (let i = 0; i < itemCount; i++) {
    if (i < scale) {
      items.push(<ChartItemDiv key={i} color={color} />)
      continue
    }

    items.push(<ChartItemDiv key={i} />)
  }

  return (
    <ChartWrapperDiv>
      {items.map(item => item)}
    </ChartWrapperDiv>
  )
}

export default ClothingGuidelineScaleChart
