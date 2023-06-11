import { axiosBase } from '../../axiosBase'
import { FiveDThreeHrForecastApiResponse, Unit } from '../../../types/weatherApi'
import { getForecastApiEndpoint } from '../../../utils/weather'

/**
 * Call 5 day / 3 hour forecast API in server side code
 *
 * @param {number} lat
 * @param {number} lon
 * @return {*}  {Promise<FiveDThreeHrForecastApiResponse>}
 */
export const getForecastServer = async (lat: number, lon: number, unit?: Unit): Promise<FiveDThreeHrForecastApiResponse> => {
  const res = await axiosBase().get(getForecastApiEndpoint(lat, lon, unit))
  return res.data
}
