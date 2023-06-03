import { axiosBase } from '../../axiosBase'
import { CurrentWeatherApiResponse, Unit } from '../../../types/weatherApi'

/**
 * Call current weather API in client side code
 *
 * @param {number} lat
 * @param {number} lon
 * @param {Unit} [unit]
 * @return {*}  {Promise<CurrentWeatherApiResponse>}
 */
export const getCurrentWeatherClient = async (lat: number, lon: number, unit?: Unit): Promise<CurrentWeatherApiResponse> => {
  const res = await axiosBase().get(`api/weathers/current?lat=${lat}&lon=${lon}&unit=${unit || ''}`)
  return res.data
}