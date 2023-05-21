// types
import { FiveDThreeHrForecastApiResponse } from '@/types/weatherApi'

import { FIVE_D_THREE_HR_FORECAST_CACHE_LIFETIME } from '@/constants/constants'

import { get5Day3hourForecastApiEndpoint } from '@/utils/weather'

/**
 * Call 5 day / 3 hour forecast API
 *
 * @param {number} lat
 * @param {number} lon
 * @return {*}  {Promise<FiveDThreeHrForecastApiResponse>}
 */
export const get5Day3HourForecastByCoordinate = async (lat: number, lon: number): Promise<FiveDThreeHrForecastApiResponse> => {
  const res = await fetch(get5Day3hourForecastApiEndpoint(lat, lon), { next: { revalidate: FIVE_D_THREE_HR_FORECAST_CACHE_LIFETIME }})
  return res.json()
}
