import { axiosBase } from '../../axiosBase'
import { getGeolocationApiEndpoint } from '../../../utils/geolocation'
import { GeolocationApiResponse } from '../../../types/geolocation'

/**
 * Call geolocation API in client side code
 *
 * @param {string} apiKey
 * @return {*}  {Promise<GeolocationApiResponse>}
 */
export const getUserLocation = async (apiKey: string): Promise<GeolocationApiResponse> => {
  const res = await axiosBase().get(getGeolocationApiEndpoint(apiKey))
  return res.data
}
