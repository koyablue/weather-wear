import { axiosBase } from '../../axiosBase'
import { FiveDThreeHrForecastApiResponse, Unit } from '../../../types/weatherApi'

/**
 * Call 5 day / 3 hour forecast API in client side code
 *
 * @param {number} lat
 * @param {number} lon
 * @param {Unit} [unit]
 * @return {*}  {Promise<FiveDThreeHrForecastApiResponse>}
 */
export const getForeCastClient = async (lat: number, lon: number, unit?: Unit): Promise<FiveDThreeHrForecastApiResponse> => {
  const res = await axiosBase().get(`api/weathers/forecasts?lat=${lat}&lon=${lon}&unit=${unit || ''}`)
  return res.data
}
