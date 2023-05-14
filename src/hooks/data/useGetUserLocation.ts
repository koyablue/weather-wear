import { getUserLocation } from '@/services/queries/getUserLocation'

// types
import { Result, newSuccess, newFailure } from '@/types/result'
import { GeolocationApiResponse } from '@/types/geolocation'

type UseApiReturnType<T> = {
  data: T | undefined
  isError: boolean
  error: unknown
}

/**
 * Custom hook to get a user's current location
 *
 * @param {string[]} [fields]
 * @return {*}  {Promise<UseApiReturnType<Partial<GeolocationApiResponse>>>}
 */
export const useGetUserLocation = async (fields?: string[]): Promise<UseApiReturnType<Partial<GeolocationApiResponse>>> => {
  let result: Result<Partial<GeolocationApiResponse>, { error: unknown }>
  try {
    const res = await getUserLocation(fields)
    result = newSuccess(res)
  } catch (error) {
    result = newFailure({ error })
  }

  return {
    data: result.isSuccess ? result.data : undefined,
    isError: result.isFailure,
    error: result.isFailure ? result.data : undefined
  }
}