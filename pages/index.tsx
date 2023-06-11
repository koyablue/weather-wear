import { ReactElement } from 'react'
import { GetServerSideProps } from 'next'
import { SWRConfig, unstable_serialize } from 'swr'

// components
import BaseLayout from '../components/layouts/baseLayout'
import Main from '../components/pages/main'

// services
import { getUserLocationServer } from '../services/queries/server/getUserLocationServer'
import { getCurrentWeatherServer } from '../services/queries/server/getCurrentWeatherServer'

// types
import { GeolocationApiResponse } from '../types/geolocationApi'
import { CurrentWeatherApiResponse } from '../types/weatherApi'


export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const fields = []
  let userLocation: Partial<GeolocationApiResponse> | null
  let currentWeather: CurrentWeatherApiResponse | null

  try {
    userLocation = await getUserLocationServer(fields)
    currentWeather = await getCurrentWeatherServer(userLocation.latitude, userLocation.longitude, 'metric')
  } catch(error) {
    userLocation = null
    currentWeather = null
  }

  return {
    props: {
      fallback: {
        [unstable_serialize(['userLocation/get', fields])]: userLocation,
        [unstable_serialize(['currentWeather/get', userLocation?.latitude, userLocation?.longitude, 'metric'])]: currentWeather
      },
    },
  }
}


type PageProps = {
  fallback: {
    [key: string]: any
  }
}

// TODO: global error handling

const Home = ({ fallback }: PageProps) => {
  return (
    <SWRConfig value={{fallback}}>
      <Main />
    </SWRConfig>
  )
}

Home.getLayout = (page: ReactElement) => (
  <BaseLayout>{page}</BaseLayout>
)

export default Home
