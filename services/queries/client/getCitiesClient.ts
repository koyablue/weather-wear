import { axiosBase } from '../../axiosBase'
import { GeocodingApiQuery, GeocodingApiResponse } from '../../../types/geocoding'

/**
 * Call geocoding API in client side code
 *
 * @param {GeocodingApiQuery} q
 * @param {number} [limit]
 * @return {*}  {Promise<GeocodingApiResponse>}
 */
export const getCitiesClient = async (q: GeocodingApiQuery, limit?: number): Promise<GeocodingApiResponse> => {
  const qStr = `${q.cityName},${q.stateCode || ''},${q.countryCode || ''}`
  const res = await axiosBase().get(`/api/locations/cities?q=${qStr}&limit=${limit}`)
  return res.data
}
