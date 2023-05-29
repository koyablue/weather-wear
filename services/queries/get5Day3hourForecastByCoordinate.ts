import { axiosBase } from '../axiosBase'
import { FiveDThreeHrForecastApiResponse, Unit } from '../../types/weatherApi'
import { get5Day3hourForecastApiEndpoint } from '../../utils/weather'

/**
 * Call 5 day / 3 hour forecast API
 *
 * @param {number} lat
 * @param {number} lon
 * @return {*}  {Promise<FiveDThreeHrForecastApiResponse>}
 */
export const get5Day3HourForecastByCoordinate = async (lat: number, lon: number, unit?: Unit): Promise<FiveDThreeHrForecastApiResponse> => {
  const res = await axiosBase().get(get5Day3hourForecastApiEndpoint(lat, lon, unit))
  return res.data
}
