import { get5Day3HourForecastByCoordinate } from '@/services/queries/get5Day3hourForecastByCoordinate'

// types
import { Result, newSuccess, newFailure } from '@/types/result'
import { FiveDThreeHrForecastApiResponse } from '@/types/weatherApi'
import { UseApiReturnType, newUseApiReturnType, ApiError } from '@/types/api'

/**
 * Custom hook to get 5 hour / 3day forecast based on the coordinate.
 *
 * @param {number} lat
 * @param {number} lon
 * @return {*}  {Promise<UseApiReturnType<FiveDThreeHrForecastApiResponse>>}
 */
export const useGet5D3HrForecast = async (lat: number, lon: number): Promise<UseApiReturnType<FiveDThreeHrForecastApiResponse>> => {
  let result: Result<FiveDThreeHrForecastApiResponse, ApiError>

  try {
    const res = await get5Day3HourForecastByCoordinate(lat, lon)
    result = newSuccess(res)
  } catch (error) {
    result = newFailure({ error })
  }

  return newUseApiReturnType(result)
}
