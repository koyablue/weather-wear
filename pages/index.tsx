import { ReactElement } from 'react'
import { SWRConfig } from 'swr'

// components
import BaseLayout from '../components/layouts/baseLayout'
import Main from '../components/pages/main'
import { GetServerSideProps } from 'next'
import { GEOLOCATION_API_KEY } from '../constants/api'

type PageProps = {
  apiKey: string
}

// SSR to hide API key from client side
export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  const apiKey = GEOLOCATION_API_KEY

  return {
    props: {
      apiKey,
    },
  }
}

// TODO: global error handling

const Home = ({ apiKey }: PageProps) => {
  return (
    <SWRConfig>
      <Main geolocationApiKey={apiKey}  />
    </SWRConfig>
  )
}

Home.getLayout = (page: ReactElement) => (
  <BaseLayout>{page}</BaseLayout>
)

export default Home
