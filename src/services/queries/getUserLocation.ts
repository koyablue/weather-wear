// types
import { GeolocationApiResponse } from '@/types/geolocationApi'

// constants
import { GEOLOCATION_CACHE_LIFETIME } from '@/constants/constants'

// utils
import { getGeolocationApiEndpoint } from '@/utils/geolocation'

/**
 * Geolocation API call
 *
 * @param {string[]} [fields]
 * @return {*}  {Promise<Partial<GeolocationApiResponse>>}
 */
export const getUserLocation = async (fields?: string[]): Promise<Partial<GeolocationApiResponse>> => {
  const res = await fetch(
    getGeolocationApiEndpoint(fields),
    {
      cache: 'no-store',
      next: {
        revalidate: GEOLOCATION_CACHE_LIFETIME,
      }
    }
  )
  return res.json()
}
