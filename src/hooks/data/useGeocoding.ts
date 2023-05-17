import { getCities } from '@/services/queries/getCities'

// types
import { Result, newSuccess, newFailure } from '@/types/result'
import { GeocodingApiResponse, GeocodingApiQuery } from '@/types/geocoding'
import { UseApiReturnType, newUseApiReturnType, ApiError } from '@/types/api'

/**
 * Custom hook to use geocoding api
 *
 * @param {GeocodingApiQuery} q
 * @param {number} [limit]
 * @return {*}  {Promise<UseApiReturnType<GeocodingApiResponse>>}
 */
export const useGeocoding = async (q: GeocodingApiQuery, limit?: number): Promise<UseApiReturnType<GeocodingApiResponse>> => {
  let result: Result<GeocodingApiResponse, ApiError>

  try {
    const res = await getCities(q, limit)
    result = newSuccess(res)
  } catch (error) {
    result = newFailure({ error })
  }

  return newUseApiReturnType(result)
}
