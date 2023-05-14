import { getUserLocation } from '@/services/queries/getUserLocation'

// types
import { Result, newSuccess, newFailure } from '@/types/result'
import { GeolocationApiResponse } from '@/types/geolocation'

/**
 * Custom hook to get a user's current location
 *
 * @param {string[]} [fields]
 * @return {*}  {Promise<Result<Partial<GeolocationApiResponse>, { error: unknown }>>}
 */
export const useGetUserLocation = async (fields?: string[]): Promise<Result<Partial<GeolocationApiResponse>, { error: unknown }>> => {
  try {
    const res = await getUserLocation(fields)
    return newSuccess(res)
  } catch (error) {
    return newFailure({ error })
  }
}