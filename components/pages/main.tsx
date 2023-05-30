import Image from 'next/image'

import styled from 'styled-components'

// styles
import { breakPoint } from '../../styles/breakPoint'

// components
import Header from '../layouts/header'
import ClothingGuidelineScaleChart from '../common/clothingGuidelineScale/clothingGuidelineScaleChart'

import { useGetUserLocation } from '../../hooks/data/useGetUserLocation'

// svg
import PufferJacketIcon from '../../public/images/svgs/puffer-jacket.svg'

import { BiErrorCircle } from 'react-icons/bi'

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

const ErrorIcon = styled(BiErrorCircle)`
  font-size: 150px;
`

// TODO: inputの候補はbingの検索inputみたいな感じ

const Main = () => {
  const { userLocation, error, isLoading, isValidating } = useGetUserLocation([])

  // console.log(userLocation.security.is_vpn)

  // TODO: get location(lat, lon) -> getCurrentWeather(degree) -> convert to the scale -> show icon and chart

  // TODO: Error message

  // TODO: 1. [WIP]implement UI(just markup for now)
  // TODO: 2. celsius<->fahrenheit
  // TODO: 3. isVPN
  // TODO: 4. implement useWeatherWearMeasure

  // TODO: api won't work in client side because no NEXT_PUBLIC prefix
  // TODO: but adding the prefix means make the api key public
  // TODO: to avoid that, Implement API route and call that from client side

  // TODO: API routes for currentWeather, geolocation, geocoding, forecast
  // to hide api key

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

          {/* TODO: Implement Error component */}
          {/* <ErrorIcon />
          Woops! */}
        </MainContentsContainerDiv>
      </ContentsMain>
    </ContainerDiv>
  )
}

export default Main
