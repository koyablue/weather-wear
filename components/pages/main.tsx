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
import TankTopIcon from '../../public/images/svgs/tank-top.svg'
import TShirtIcon from '../public/images/svgs/t-shirt.svg'
import LongSleeveIcon from '../public/images/svgs/long-sleeve.svg'
import HoodieIcon from '../public/images/svgs/hoodie.svg'

import { BiErrorCircle } from 'react-icons/bi'
import { useGetCurrentWeather } from '../../hooks/data/useGetCurrentWeather'
import { celsiusToClothingGuidelineScale, getIconByClothingGuidelineScale } from '../../services/clothingGuidelineScale'

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
  const {
    userLocation,
    error: userLocationError,
    isLoading: isUserLocationLoading,
    isValidating: isUserLocationValidating
  } = useGetUserLocation([])

  const {
    currentWeather,
    error: currentWeatherError,
    isLoading: isCurrentWeatherLoading,
    isValidating: isCurrentWeatherValidating
  } = useGetCurrentWeather(userLocation.latitude, userLocation.longitude, 'metric')

  // TODO: get weather(unit=metric) -> Math.round(main.temp)
  // TODO: if (max - min) >= 5 -> two options or notes()

  // TODO: message is like this: "Big temperature swing today. Dress in adjustable clothing."
  // TODO: or like this: "Stay prepared for temperature changes. Wear adjustable clothing." <- better?

  const scale = celsiusToClothingGuidelineScale(currentWeather.main.temp)
  const clothesIcon = getIconByClothingGuidelineScale(scale)
  console.log(clothesIcon)

  // TODO: get location(lat, lon) -> getCurrentWeather(degree) -> convert to the scale -> show icon and chart

  // TODO: Error message

  // TODO: 1. [WIP]implement UI(just markup for now)
  // TODO: 2. celsius<->fahrenheit
  // TODO: 3. isVPN
  // TODO: 4. implement useWeatherWearMeasure


  // TODO: use SVGR to dynamic color change of svg
  return (
    <ContainerDiv>
      <Header />
      <ContentsMain>
        <MainContentsContainerDiv>
          <LocationInput type='text' name='cityName' placeholder='City name' />
          <Image
            // src={PufferJacketIcon}
            src={clothesIcon}
            // src='images/svgs/long-sleeve.svg'
            alt='clothes icon'
            width={150}
            height={150}
          />
          <ClothingGuidelineScaleChart scale={2} />

          {/* TODO: Implement Error component */}
          {/* <ErrorIcon />
          Woops! */}
        </MainContentsContainerDiv>
      </ContentsMain>
    </ContainerDiv>
  )
}

export default Main
