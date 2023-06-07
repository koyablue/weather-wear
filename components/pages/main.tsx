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
import { celsiusToClothingGuidelineScale, getColorByClothingGuidelineScale, getIconByClothingGuidelineScale } from '../../services/clothingGuidelineScale'
import { useColorTheme } from '../../hooks/useColorTheme'

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

const StyledIconWrapper = styled.div`
  svg {
    fill: ${({ color }) => color}; /* Apply the color dynamically */
  }
`;

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

  const { getCurrentColorThemeState } = useColorTheme()

  // TODO: get weather(unit=metric) -> Math.round(main.temp)
  // TODO: if (max - min) >= 5 -> two options or notes()

  // TODO: message is like this: "Big temperature swing today. Dress in adjustable clothing."
  // TODO: or like this: "Stay prepared for temperature changes. Wear adjustable clothing." <- better?

  const scale = celsiusToClothingGuidelineScale(currentWeather.main.temp)
  const ClothesIcon = getIconByClothingGuidelineScale(scale, getCurrentColorThemeState())
  const color = getColorByClothingGuidelineScale(scale, getCurrentColorThemeState())

  // TODO: Error message

  // TODO: 2. celsius<->fahrenheit
  // TODO: 3. isVPN

  // TODO: message: 15 °F - 25 °F (15 °C - 25 °C)
  // TODO: if fahrenheit country(see country code) use fahrenheit
  // TODO: message: Stay prepared for temperature changes (15 °C - 25 °C). Wear adjustable clothing.

  return (
    <ContainerDiv>
      <Header />
      <ContentsMain>
        <MainContentsContainerDiv>
          <LocationInput type='text' name='cityName' placeholder='City name' />
          <ClothesIcon fill={color} width={150} height={150} />
          <ClothingGuidelineScaleChart scale={scale} />

          {/* TODO: Implement Error component */}
          {/* <ErrorIcon />
          Woops! */}
        </MainContentsContainerDiv>
      </ContentsMain>
    </ContainerDiv>
  )
}

export default Main
