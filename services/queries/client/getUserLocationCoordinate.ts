import { axiosBase } from '../../axiosBase'
import { GeolocationApiResponse } from '../../../types/geolocation'
import { getGeolocationApiEndpoint } from '../../../utils/geolocation'

/**
 * Call geolocation API (POST request)
 *
 * @param {string} apiKey
 * @return {*}  {Promise<GoogleGoogleGeolocationApiResponse>}
 */
export const getUserLocationCoordinate = async (apiKey: string): Promise<GeolocationApiResponse> => {
  const res = await axiosBase().post(getGeolocationApiEndpoint(apiKey), {})
  return res.data
}
