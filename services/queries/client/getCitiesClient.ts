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
  const res = await axiosBase().get(
    `/api/locations/cities?cityName=${q.cityName}&stateCode=${q.stateCode || ''}&countryCode=${q.countryCode || ''}&limit=${limit}`)
  return res.data
}
