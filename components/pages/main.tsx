import styled from 'styled-components'

// styles
import { breakPoint } from '../../styles/breakPoint'

// components
import Header from '../layouts/header'
import ClothingGuidelineScaleChart from '../common/clothingGuidelineScale/clothingGuidelineScaleChart'
import ClothesIcon from '../common/ClothesIcon'
import Loader from '../common/loader'

// services
import { celsiusToClothingGuidelineScale, getColorByClothingGuidelineScale } from '../../services/clothingGuidelineScale'

// icon
import { BiErrorCircle } from 'react-icons/bi'

// hooks
import { useColorTheme } from '../../hooks/useColorTheme'
import { useValidateBooleanArray } from '../../hooks/useValidateBooleanArray'
import { useGetCurrentWeather } from '../../hooks/data/useGetCurrentWeather'
import { useGetUserLocation } from '../../hooks/data/useGetUserLocation'


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
  /* display: flex; */
  /* align-items: center; */
  /* justify-content: center; */
`

const MainContentsContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  gap: 40px;
  /* height: 100%; */
  width: 100%;
  margin-top: 240px;
`

const LocationInput = styled.input`
  border-radius: 30px;
  /* border: 1.5px solid; */
  border: none;
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

  const { hasTrueValue } = useValidateBooleanArray()

  const isLoading = hasTrueValue([isUserLocationLoading, isCurrentWeatherLoading])

  // TODO: implement useAllValuesTrue

  // TODO: get weather(unit=metric) -> Math.round(main.temp)
  // TODO: if (max - min) >= 5 -> two options or notes()

  // TODO: message is like this: "Big temperature swing today. Dress in adjustable clothing."
  // TODO: or like this: "Stay prepared for temperature changes. Wear adjustable clothing." <- better?
  const currentColorTheme = getCurrentColorThemeState()
  const scale = celsiusToClothingGuidelineScale(currentWeather.main.temp)
  const color = getColorByClothingGuidelineScale(scale, currentColorTheme)

  console.log(color)
  //TODO: color of loading -> color

  // TODO: Error message

  // TODO: 2. celsius<->fahrenheit
  // TODO: 3. isVPN

  // TODO: message: 15 °F - 25 °F (15 °C - 25 °C)
  // TODO: if fahrenheit country(see country code) use fahrenheit
  // TODO: message: Stay prepared for temperature changes (15 °C - 25 °C). Wear adjustable clothing.
  console.log(ClothesIcon)
  return (
    <ContainerDiv>
      <Header />
      <ContentsMain>
        <MainContentsContainerDiv>
          <LocationInput type='text' name='cityName' placeholder='City name' />
          {/* <ClothesIcon fill={color} width={150} height={150} /> */}
          {
            isLoading
              ? <Loader color={color || '#333333'} />
              : <>
                  <ClothesIcon scale={scale} svgProps={{fill:color, height:150, width:150}} />
                  <ClothingGuidelineScaleChart scale={scale} />
                </>
          }
          {/* <Loader color='#333333' /> */}
          {/* TODO: Implement Error component */}
          {/* <ErrorIcon />
          Woops! */}
        </MainContentsContainerDiv>
      </ContentsMain>
    </ContainerDiv>
  )
}

export default Main
