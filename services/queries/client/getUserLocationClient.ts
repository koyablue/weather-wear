import { axiosBase } from '../../axiosBase'
import { GeolocationApiResponse } from '../../../types/geolocationApi'

/**
 * Call Geolocation API
 * Use this only in client side
 *
 * @param {string[]} [fields]
 * @return {*}  {Promise<Partial<GeolocationApiResponse>>}
 */
export const getUserLocationClient = async (fields?: string[]): Promise<Partial<GeolocationApiResponse>> => {
  const fieldsStr = fields && fields.length ? fields.join(',') : ''
  const res = await axiosBase().get(`/api/locations/current?fields=${fieldsStr}`)
  return res.data
}
