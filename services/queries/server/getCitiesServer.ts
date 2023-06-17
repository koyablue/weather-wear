import { axiosBase } from '../../axiosBase'
import { getGeocodingApiEndpoint } from '../../../utils/geocoding'
import { GeocodingApiQuery, GeocodingApiResponse } from '../../../types/geocoding'

/**
 * Call geocoding API in server side code
 *
 * @param {GeocodingApiQuery} q
 * @param {number} [limit]
 * @return {*}  {Promise<GeocodingApiResponse>}
 */
export const getCitiesServer = async (q: GeocodingApiQuery, limit?: number): Promise<GeocodingApiResponse> => {
  const res = await axiosBase().get(getGeocodingApiEndpoint(q, limit))
  return res.data
}
