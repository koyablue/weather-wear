import { axiosBase } from '../../axiosBase'
import { GeolocationApiResponse } from '../../../types/geolocationApi'
import { getGeolocationApiEndpoint } from '../../../utils/geolocation'

/**
 * Call Geolocation API in server side code
 *
 * @param {string[]} [fields]
 * @return {*}  {Promise<Partial<GeolocationApiResponse>>}
 */
export const getUserLocationServer = async (fields?: string[]): Promise<Partial<GeolocationApiResponse>> => {
  const res = await axiosBase().get(getGeolocationApiEndpoint(fields))
  return res.data
}
