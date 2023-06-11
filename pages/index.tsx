import { ReactElement } from 'react'
import { SWRConfig } from 'swr'

// components
import BaseLayout from '../components/layouts/baseLayout'
import Main from '../components/pages/main'

// TODO: global error handling

const Home = () => {
  return (
    <SWRConfig>
      <Main />
    </SWRConfig>
  )
}

Home.getLayout = (page: ReactElement) => (
  <BaseLayout>{page}</BaseLayout>
)

export default Home
