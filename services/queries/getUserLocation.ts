// types
import { GeolocationApiResponse } from '../../types/geolocationApi'

// constants
import { GEOLOCATION_CACHE_LIFETIME } from '../../constants/api'

// utils
import { getGeolocationApiEndpoint } from '../../utils/geolocation'

/**
 * Call Geolocation API
 *
 * @param {string[]} [fields]
 * @return {*}  {Promise<Partial<GeolocationApiResponse>>}
 */
export const getUserLocation = async (fields?: string[]): Promise<Partial<GeolocationApiResponse>> => {
  const res = await fetch(getGeolocationApiEndpoint(fields), { next: { revalidate: GEOLOCATION_CACHE_LIFETIME }})
  return res.json()
}
