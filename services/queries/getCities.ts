import { getGeocodingApiEndpoint } from '@/utils/geocoding'

// types
import { GeocodingApiQuery, GeocodingApiResponse } from '@/types/geocoding'

/**
 * Call geocoding API
 *
 * @param {GeocodingApiQuery} q
 * @param {number} [limit]
 * @return {*}  {Promise<GeocodingApiResponse>}
 */
export const getCities = async (q: GeocodingApiQuery, limit?: number): Promise<GeocodingApiResponse> => {
  const res = await fetch(getGeocodingApiEndpoint(q, limit))
  return res.json()
}
