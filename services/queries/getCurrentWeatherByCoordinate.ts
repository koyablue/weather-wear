import { axiosBase } from '../axiosBase'
import { CurrentWeatherApiResponse, Unit } from '../../types/weatherApi'
import { getCurrentWeatherApiEndpoint } from '../../utils/weather'

/**
 * Call current weather API
 *
 * @param {number} lat
 * @param {number} lon
 * @param {Unit} unit
 * @return {*}  {Promise<CurrentWeatherApiResponse>}
 */
export const getCurrentWeatherByCoordinate = async (lat: number, lon: number, unit?: Unit): Promise<CurrentWeatherApiResponse> => {
  const res = await axiosBase().get(getCurrentWeatherApiEndpoint(lat, lon, unit))
  return res.data
}
