import { useEffect, useState } from 'react'
import styled from 'styled-components'

// icon
import { BiErrorCircle } from 'react-icons/bi'

// styles
import { breakPoint } from '../../../styles/breakPoint'
import { mediaLandscape } from '../../../styles/mediaQueries'

// components
import Header from '../../layouts/header'
import SearchInput from '../../common/searchInput'
import ClothingGuidelineScaleChart from '../../common/clothingGuidelineScale/clothingGuidelineScaleChart'
import ClothesIcon from '../../common/clothesIcon'
import SyncLoader from '../../common/loaders/syncLoader'

// services
import { celsiusToClothingGuidelineScale, getClothingAdviceByClothingGuidelineScale, getColorByClothingGuidelineScale } from '../../../services/clothingGuidelineScale'
import { getUserLocationCoordinate } from '../../../services/queries/client/getUserLocationCoordinate'

// hooks
import { useColorTheme } from '../../../hooks/useColorTheme'
import { useValidateBooleanArray } from '../../../hooks/useValidateBooleanArray'
import { useCalculateHeight } from '../../../hooks/useCalculateHeight'
import { useGetCurrentWeather } from '../../../hooks/data/useGetCurrentWeather'
import { useReverseGeocoding } from '../../../hooks/data/useReverseGeocoding'

// redux
import { useAppDispatch, useAppSelector } from '../../../stores/hooks'
import { selectCityData, updateCityData } from '../../../stores/slices/cityNameSearchInputSlice'
import { useGeolocation } from '../../../hooks/data/useGeolocation'

const ContainerDiv = styled.div`
  min-height: 100vh; // fallback
  min-height: calc(var(--vh, 1vh) * 100);
  width: 100%;
  max-width: 1400px;
  padding: 0 16px;
  margin: 0 auto;
  letter-spacing: 1.5px;

  @media ${breakPoint.mobileS} {
    padding: 0 16px;
  }

  @media ${breakPoint.mobileM} {
    padding: 0 40px;
  }
`

const ContentsMain = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media ${breakPoint.mobileS} {
    height: calc(100vh - 60px);
    height: calc(calc(var(--vh, 1vh) * 100) - 60px);
    padding: 16px 0;
  }

  @media ${breakPoint.mobileM} {
    height: calc(100vh - 80px);
    height: calc(calc(var(--vh, 1vh) * 100) - 80px);
    padding: 40px 0;
  }
`

const MainContentsContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  width: 100%;

  // TODO: Is min-height necessary?
  @media ${breakPoint.mobileS} {
    /* min-height: calc(100vh - 60px); // fallback
    min-height: calc(calc(var(--vh, 1vh) * 100) - 60px); */

    height: calc(100vh - 60px); // fallback
    height: calc(calc(var(--vh, 1vh) * 100) - 60px);
  }

  @media ${breakPoint.mobileM} {
    /* min-height: calc(100vh - 80px); // fallback
    min-height: calc(calc(var(--vh, 1vh) * 100) - 80px); */

    height: calc(100vh - 80px); // fallback
    height: calc(calc(var(--vh, 1vh) * 100) - 80px);
    padding: 40px 0;
  }

  @media ${mediaLandscape} {
   gap: 20px;
  }
`

const MainContentsWrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  width: 100%;
  height: 100%;

  @media ${mediaLandscape} {
    gap: 15px;
  }
`

const SubTextAreaDiv = styled.div`
  text-align: center;
  width: 100%;
`

const SubTextP = styled.p`
  font-weight: 500;
  letter-spacing: 0.5px;
  /* white-space: nowrap; */
  word-break: keep-all;
`

const ErrorIcon = styled(BiErrorCircle)<{color: string}>`
  font-size: 150px;
  color: ${(props) => props.color};
`;

export type Coordinate = {
  lat: number
  lon: number
}

type Props = {
  geolocationApiKey: string
  reverseGeocodingApiKey: string
}

/**
 * Contents of the main page
 * Get user location, then get current weather by the location
 *
 * @return {*} JSX.Element
 */
const Main = ({ geolocationApiKey, reverseGeocodingApiKey }: Props) => {
  useCalculateHeight('--vh')

  const dispatch = useAppDispatch()
  const cityData = useAppSelector(selectCityData)

  // search input value
  const [userLocationCityName, setUserLocationCityName] = useState('')

  // get coordinate of user location
  const { coord, error: geolocationError } = useGeolocation(geolocationApiKey)

  // reverse geocoding to get the name of user location
  const {
    userLocation,
    error: reverseGeocodingError,
    isLoading: isReverseGeocodingLoading,
    isValidating: isReverseGeocodingValidating
  } = useReverseGeocoding(
    reverseGeocodingApiKey,
    coord.lat,
    coord.lon,
    { revalidateOnFocus: false }
  )

  // get current weather data based on the coordinate
  const {
    currentTemperature,
    error: currentWeatherError,
    isLoading: isCurrentWeatherLoading,
    isValidating: isCurrentWeatherValidating,
  } = useGetCurrentWeather(
    cityData.lat,
    cityData.lon,
    'metric',
    { revalidateOnFocus: false }
  )

  const { getCurrentColorThemeState, getCurrentColorThemeStyle } = useColorTheme()

  const { castAllValuesBoolean, hasTrueValue } = useValidateBooleanArray()

  const isLoading = hasTrueValue([
    (coord.lat === 0 && coord.lon === 0),
    isReverseGeocodingLoading,
    isReverseGeocodingValidating,
    isCurrentWeatherLoading,
    isCurrentWeatherValidating,
  ])

  const isError = hasTrueValue(castAllValuesBoolean([
    reverseGeocodingError,
    currentWeatherError,
    geolocationError,
  ]))

  // TODO: message is like this: "Big temperature swing today. Dress in adjustable clothing."
  // TODO: or like this: "Stay prepared for temperature changes. Wear adjustable clothing." <- better?
  const currentColorTheme = getCurrentColorThemeState()
  const scale = celsiusToClothingGuidelineScale(currentTemperature?.temp)
  const color = getColorByClothingGuidelineScale(scale, currentColorTheme)
  const advise = getClothingAdviceByClothingGuidelineScale(scale)


  // TODO: message: Stay prepared for temperature changes (15 °C - 25 °C). Wear adjustable clothing.

  useEffect(() => {
    if (userLocation) {
      setUserLocationCityName(userLocation.cityName)
      dispatch(updateCityData({name: userLocation.cityName, lat: coord.lat, lon: coord.lon}))
    }
  }, [userLocation])

  // TODO: try again view

  return (
    <ContainerDiv>
      <Header />
      <ContentsMain>
        <MainContentsContainerDiv>
          <SearchInput
            defaultCityName={cityData.name || userLocationCityName}
          />
          <MainContentsWrapperDiv>
            {isLoading && !isError && <SyncLoader color={color} data-testid='loading' />}
            {
              !isLoading && !isError && (
                <>
                  <ClothesIcon scale={scale} svgProps={{ fill: color, height: 150, width: 150 }} />
                  <ClothingGuidelineScaleChart scale={scale} colorTheme={currentColorTheme} data-testid='clothing-guideline-scale-chart' />
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
                  <SubTextP>Sorry, the app couldn't fetch the data at the moment.</SubTextP>
                  <SubTextP>Please try again later.</SubTextP>
                </SubTextAreaDiv>
              </>
            }
         </MainContentsWrapperDiv>
        </MainContentsContainerDiv>
      </ContentsMain>
    </ContainerDiv>
  )
}

export default Main
