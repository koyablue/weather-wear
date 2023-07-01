import { ReactElement } from 'react'
import { GetServerSideProps } from 'next'
import { SWRConfig } from 'swr'

import { GEOAPIFY_API_KEY, GOOGLE_MAPS_API_KEY } from '../constants/api'

// components
import BaseLayout from '../components/layouts/baseLayout'
import Main from '../components/pages/main'

type PageProps = {
  geolocationApiKey: string
  reverseGeocodingApiKey: string
}

// SSR to hide API key from client side
export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  const geolocationApiKey = GOOGLE_MAPS_API_KEY
  const reverseGeocodingApiKey = GEOAPIFY_API_KEY

  return {
    props: {
      geolocationApiKey,
      reverseGeocodingApiKey,
    },
  }
}

// TODO: global error handling

const Home = ({ geolocationApiKey, reverseGeocodingApiKey }: PageProps) => {
  return (
    <SWRConfig>
      <Main
        geolocationApiKey={geolocationApiKey}
        reverseGeocodingApiKey={reverseGeocodingApiKey}
      />
    </SWRConfig>
  )
}

Home.getLayout = (page: ReactElement) => (
  <BaseLayout>{page}</BaseLayout>
)

export default Home
