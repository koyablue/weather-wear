import styled from 'styled-components'

// components
import Header from '../header'

const ContainerDiv = styled.div`
  min-height: 100vh;
  max-width: 1400px;
  margin: auto;
  padding: 0 80px;
`

const ContentsMain = styled.main`
  min-height: 100vh;
  color: #333333;
  display: flex;
  align-items: center;
  justify-content: center;
`

const MainContentsContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
`

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
          <input type='text' name='cityName' />
          TEST
        </MainContentsContainerDiv>
      </ContentsMain>
    </ContainerDiv>
  )
}

export default Main
