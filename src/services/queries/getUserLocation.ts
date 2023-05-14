// types
import { GeolocationApiResponse } from '@/types/geolocation'

// constants
import { GEOLOCATION_CACHE_LIFETIME } from '@/constants/constants'

// util
import { getGeolocationApiUrl } from '@/utils/geolocation'

export const getUserLocation = async (fields?: string[]): Promise<Partial<GeolocationApiResponse>> => {
  const res = await fetch(
    getGeolocationApiUrl(fields),
    {
      cache: 'no-store',
      next: {
        revalidate: GEOLOCATION_CACHE_LIFETIME,
      }
    }
  )
  return res.json()
}
