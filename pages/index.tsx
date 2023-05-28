import { ReactElement } from 'react'

import Head from 'next/head'
import {
  Container,
  // Main,
  Title,
  Description,
  CodeTag,
} from '../components/sharedstyles'
import Cards from '../components/cards'

import Main from '../components/pages/main'
import { GetServerSideProps } from 'next'
import { cookies } from 'next/dist/client/components/headers'
import BaseLayout from '../components/layouts/baseLayout'


export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  // const cookieStore = cookies()
  // console.log('ALL COOKIES: ', cookieStore.getAll())
  console.log('SSR index.tsx')
  return {
    props: {
    },
  }
}

const Home = () => {
  return (
    <>
      <Main />
    </>
    // <Container>
    //   <Head>
    //     <title>Create Next App</title>
    //     <meta name="description" content="Generated by create next app" />
    //     <link rel="icon" href="/favicon.ico" />
    //   </Head>
    //   <Main>
    //     <Title>
    //       Welcome to <a href="https://nextjs.org">Next.js!</a>
    //     </Title>

    //     <Description>
    //       Get started by editing
    //       <CodeTag>pages/index.tsx</CodeTag>
    //     </Description>

    //     <Cards />
    //   </Main>
    // </Container>
  )
}

Home.getLayout = (page: ReactElement) => (
  <BaseLayout>{page}</BaseLayout>
)

export default Home
