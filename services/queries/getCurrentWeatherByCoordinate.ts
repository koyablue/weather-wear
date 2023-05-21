// types
import { CurrentWeatherApiResponse } from '@/types/weatherApi'

// utils
import { getCurrentWeatherApiEndpoint } from '@/utils/weather'

/**
 * Call current weather API
 *
 * @param {number} lat
 * @param {number} lon
 * @return {*}  {Promise<CurrentWeatherApiResponse>}
 */
export const getCurrentWeatherByCoordinate = async (lat: number, lon: number): Promise<CurrentWeatherApiResponse> => {
  const res = await fetch(getCurrentWeatherApiEndpoint(lat, lon), { cache: 'no-store' })
  return res.json()
}
