import Image from 'next/image'

import styled from 'styled-components'

// styles
import { breakPoint } from '../../styles/breakPoint'

// components
import Header from '../layouts/header'
import ClothingGuidelineScaleChart from '../common/clothingGuidelineScale/clothingGuidelineScaleChart'

// svg
import PufferJacketIcon from '../../public/images/svgs/puffer-jacket.svg'

const ContainerDiv = styled.div`
  /* display: flex;
  flex-direction: column; */
  /* justify-content: center; */
  min-height: 100vh;
  width: 100%;
  max-width: 1400px;
  padding: 0 16px;
  margin: 0 auto;

  @media ${breakPoint.mobileS} {
    padding: 0 16px;
  }

  @media ${breakPoint.mobileM} {
    padding: 0 40px;
  }
`

const ContentsMain = styled.main`
  min-height: calc(100vh - (60px + 16px));
  width: 100%;
  color: #333333;
  display: flex;
  align-items: center;
  justify-content: center;
`

const MainContentsContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  /* height: 100%; */
  width: 100%;
`

const LocationInput = styled.input`
  border-radius: 30px;
  border: 1.5px solid;
  padding: 0 16px;
  width: 75%;
  height: 48px;
`

// TODO: Breakpoint

// TODO: inputの候補はbingの検索inputみたいな感じ

const Main = () => {
  // TODO: 1. implement UI(just markup for now)
  // TODO: 2. celcius<->fharenheit
  // TODO: 3. isVPN
  // TODO: 4. implement useWeatherWearMeasure
  // TODO: 5. implement custom hooks to call third party APIs with SWR(maybe use axios?)
  // TODO: 服装指数style is fine(only tops icon and bar chart) https://tenki.jp/indexes/dress/
  return (
    <ContainerDiv>
      <Header />
      <ContentsMain>
        <MainContentsContainerDiv>
          <LocationInput type='text' name='cityName' placeholder='City name' />
          <Image
            src={PufferJacketIcon}
            alt='Puffer jacket icon'
            width={150}
            height={150}
          />
          <ClothingGuidelineScaleChart />
        </MainContentsContainerDiv>
      </ContentsMain>
    </ContainerDiv>
  )
}

export default Main
