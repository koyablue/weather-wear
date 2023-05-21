import { getUserLocation } from '@/services/queries/getUserLocation'

// types
import { Result, newSuccess, newFailure } from '@/types/result'
import { GeolocationApiResponse } from '@/types/geolocationApi'
import { UseApiReturnType, newUseApiReturnType, ApiError } from '@/types/api'

/**
 * Custom hook to get a user's current location.
 *
 * @param {string[]} [fields]
 * @return {*}  {Promise<UseApiReturnType<Partial<GeolocationApiResponse>>>}
 */
export const useGetUserLocation = async (fields?: string[]): Promise<UseApiReturnType<Partial<GeolocationApiResponse>>> => {
  let result: Result<Partial<GeolocationApiResponse>, ApiError>
  try {
    const res = await getUserLocation(fields)
    result = newSuccess(res)
  } catch (error) {
    result = newFailure({ error })
  }

  return newUseApiReturnType(result)
}
