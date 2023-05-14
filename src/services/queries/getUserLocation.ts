import { GeolocationApiResponse } from '@/types/geolocation'
import { getGeolocationApiUrl } from '@/utils/geolocation'

// fetch("http://localhost:3000/api/users", { cache: 'no-store' });
export const getUserLocation = async (fields?: string[]): Promise<Partial<GeolocationApiResponse>> => {
  const res = await fetch(getGeolocationApiUrl(fields), { cache: 'no-store' })
  return res.json()
}

// TODO: make it clear later. this is just a test for now.
export const useGetUserLocation = async (fields?: string[]) => {
  try {
    const res = await getUserLocation(fields)
    return res
  } catch (err) {
    console.log('ERROR: useGetUserLocation')
  }
}