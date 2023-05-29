import { axiosBase } from '../axiosBase'
import { GeolocationApiResponse } from '../../types/geolocationApi'
import { getGeolocationApiEndpoint } from '../../utils/geolocation'

/**
 * Call Geolocation API
 *
 * @param {string[]} [fields]
 * @return {*}  {Promise<Partial<GeolocationApiResponse>>}
 */
export const getUserLocation = async (fields?: string[]): Promise<Partial<GeolocationApiResponse>> => {
  const res = await axiosBase().get(getGeolocationApiEndpoint(fields))
  return res.data
}
