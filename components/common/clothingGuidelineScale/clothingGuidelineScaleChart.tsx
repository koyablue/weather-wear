import styled from 'styled-components'

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
  background-color: #ffffff;
  border-radius: 50%;
  border: 1.5px solid;
`

type Props = {
  itemCount?: number
}

// TODO: props: color, how many items to fill
const ClothingGuidelineScaleChart = ({ itemCount = 5 }: Props) => {
  const items: JSX.Element[] = []

  for (let i = 0; i < itemCount; i++) {
    items.push(<ChartItemDiv key={i} />)
  }

  return (
    <ChartWrapperDiv>
      {items.map(item => item)}
    </ChartWrapperDiv>
  )
}

export default ClothingGuidelineScaleChart
