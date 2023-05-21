'use client'

import Image from 'next/image'
import styles from './page.module.css'
import { useGetUserLocation } from '@/hooks/data/useGetUserLocation'
import { Suspense } from 'react'
import { useGetCurrentWeather } from '@/hooks/data/useGetCurrentWeather'
import { GlobalStyle } from '@/styles/globalStyle'

const Loading = () => {
  return (
    <div>Loading...</div>
  )
}

const Home = async () => {
  // const { data, isError } = await useGetUserLocation([
  //   'city', 'region','region_iso_code', 'country', 'longitude', 'latitude', 'security'])

  // const { data: currentWeather, isError: isCurrentWeatherError } = await useGetCurrentWeather(Number(data?.latitude), Number(data?.longitude))

  // const data = value

  return (
    <>
      <GlobalStyle />
      <main>
        <div>TEST</div>
        <Suspense fallback={<Loading />}>
          <div>
            {/* Around {`${data?.city} ${data?.region_iso_code} ${data?.country}`} */}
          </div>
        </Suspense>
      </main>
    </>
  )
}

export default Home
