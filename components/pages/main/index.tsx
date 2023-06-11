import { useEffect, useState } from 'react'
import styled from 'styled-components'
// icon
import { BiErrorCircle } from 'react-icons/bi'

// styles
import { breakPoint } from '../../../styles/breakPoint'

// components
import Header from '../../layouts/header'
import SearchInput from './searchInput'
import ClothingGuidelineScaleChart from '../../common/clothingGuidelineScale/clothingGuidelineScaleChart'
import ClothesIcon from '../../common/clothesIcon'
import SyncLoader from '../../common/loaders/syncLoader'

// services
import { celsiusToClothingGuidelineScale, getClothingAdviceByClothingGuidelineScale, getColorByClothingGuidelineScale } from '../../../services/clothingGuidelineScale'

// hooks
import { useColorTheme } from '../../../hooks/useColorTheme'
import { useValidateBooleanArray } from '../../../hooks/useValidateBooleanArray'
import { useGetCurrentWeather } from '../../../hooks/data/useGetCurrentWeather'
import { useGetUserLocation } from '../../../hooks/data/useGetUserLocation'

const ContainerDiv = styled.div`
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
  /* min-height: calc(100vh - (60px + 16px)); */
  width: 100%;
  /* color: #333333; */
`

const MainContentsContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  width: 100%;
  margin-top: 200px;
`

const SubTextAreaDiv = styled.div`
  text-align: center;
  width: 100%;
`

const SubTextP = styled.p`
`

const ErrorIcon = styled(BiErrorCircle)<{color: string}>`
  font-size: 150px;
  color: ${(props) => props.color};
`;

export type Coordinate = {
  lat: number
  lon: number
}

/**
 * Contents of the main page
 * Get user location, then get current weather by the location
 *
 * @return {*} JSX.Element
 */
const Main = () => {
  const [coordinate, setCoordinate] = useState<Coordinate>({ lat: 0, lon: 0 })
  const [displayBySearched, setDisplayBySearched] = useState<boolean>(false)

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
    isValidating: isCurrentWeatherValidating,
  } = useGetCurrentWeather(
    coordinate.lat,
    coordinate.lon,
    'metric',
    { revalidateOnFocus: false }
  )

  const { getCurrentColorThemeState, getCurrentColorThemeStyle } = useColorTheme()

  const { castAllValuesBoolean, hasTrueValue } = useValidateBooleanArray()

  const isLoading = hasTrueValue([
    isUserLocationLoading,
    isUserLocationValidating,
    isCurrentWeatherLoading,
    isCurrentWeatherValidating,
  ])

  const isError = hasTrueValue(castAllValuesBoolean([userLocationError, currentWeatherError]))

  // TODO: get weather(unit=metric) -> Math.round(main.temp)
  // TODO: if (max - min) >= 5 -> two options or notes()

  // TODO: message is like this: "Big temperature swing today. Dress in adjustable clothing."
  // TODO: or like this: "Stay prepared for temperature changes. Wear adjustable clothing." <- better?
  const currentColorTheme = getCurrentColorThemeState()
  const scale = celsiusToClothingGuidelineScale(currentWeather?.main?.temp)
  const color = getColorByClothingGuidelineScale(scale, currentColorTheme)
  const advise = getClothingAdviceByClothingGuidelineScale(scale)

  // TODO: 2. celsius<->fahrenheit

  // TODO: message: 15 °F - 25 °F (15 °C - 25 °C)
  // TODO: if fahrenheit country(see country code) use fahrenheit
  // TODO: message: Stay prepared for temperature changes (15 °C - 25 °C). Wear adjustable clothing.

  useEffect(() => {
    if (userLocation && !displayBySearched) {
      setCoordinate({
        lat: userLocation?.latitude || 0,
        lon: userLocation?. longitude || 0,
      })
    }
  }, [userLocation])

  return (
    <ContainerDiv>
      <Header />
      <ContentsMain>
        <MainContentsContainerDiv>
          <SearchInput
            defaultCityData={{
              name: userLocation?.city || '',
              lat: userLocation?.latitude || 0,
              lon: userLocation?.longitude || 0,
            }}
            setCoordinate={setCoordinate}
            setDisplayBySearched={setDisplayBySearched}
          />
          {isLoading && <SyncLoader color={color} />}
          {
            !isLoading && !isError && (
              <>
                <ClothesIcon scale={scale} svgProps={{ fill: color, height: 150, width: 150 }} />
                <ClothingGuidelineScaleChart scale={scale} />
                <SubTextAreaDiv>
                  <SubTextP>{advise}</SubTextP>
                </SubTextAreaDiv>
              </>
            )
          }
          {
            isError &&
            <>
              <ErrorIcon color={getCurrentColorThemeStyle().colors.text} />
              <SubTextAreaDiv>
                <SubTextP>Sorry, we couldn't retrieve the weather data right now.</SubTextP>
                <SubTextP>Please try again later.</SubTextP>
              </SubTextAreaDiv>
            </>
          }
        </MainContentsContainerDiv>
      </ContentsMain>
    </ContainerDiv>
  )
}

export default Main
