import { getCurrentWeatherByCoordinate } from '@/services/queries/getCurrentWeatherByCoordinate'

// types
import { Result, newSuccess, newFailure } from '@/types/result'
import { CurrentWeatherApiResponse } from '@/types/weatherApi'
import { UseApiReturnType, newUseApiReturnType } from '@/types/api'

/**
 * Custom hook to get current weather data based on the coordinate.
 *
 * @param {number} lat
 * @param {number} lon
 * @return {*}  {Promise<UseApiReturnType<CurrentWeatherApiResponse>>}
 */
const useGetCurrentWeather = async (lat: number, lon: number): Promise<UseApiReturnType<CurrentWeatherApiResponse>> => {
  let result: Result<CurrentWeatherApiResponse, { error: unknown }>

  try {
    const res = await getCurrentWeatherByCoordinate(lat, lon)
    result = newSuccess(res)
  } catch (error) {
    result = newFailure({ error })
  }

  return newUseApiReturnType(result)
}
