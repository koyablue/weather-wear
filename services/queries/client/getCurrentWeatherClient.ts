import { axiosBase } from '../../axiosBase'
import { CurrentWeatherApiResponse, Unit } from '../../../types/weatherApi'

type CurrentTemperature = {
  temp: number
}

const selectCurrentTemperature = (currentWeatherApiResponse: CurrentWeatherApiResponse): CurrentTemperature => {
  return {
    temp: currentWeatherApiResponse?.main?.temp || 0
  }
}

/**
 * Call current weather API in client side code
 *
 * @param {number} lat
 * @param {number} lon
 * @param {Unit} [unit]
 * @return {*}  {Promise<CurrentTemperature>}
 */
export const getCurrentWeatherClient = async (lat: number, lon: number, unit?: Unit): Promise<CurrentTemperature> => {
  const res = await axiosBase().get(`api/weathers/current?lat=${lat}&lon=${lon}&unit=${unit || ''}`)
  return selectCurrentTemperature(res.data)
}