// types
import { GeolocationApiResponse } from '@/types/geolocation'

// util
import { getGeolocationApiUrl } from '@/utils/geolocation'

export const getUserLocation = async (fields?: string[]): Promise<Partial<GeolocationApiResponse>> => {
  const res = await fetch(
    getGeolocationApiUrl(fields),
    {
      cache: 'no-store',
      next: {
        revalidate: 60,
      }
    }
  )
  return res.json()
}
