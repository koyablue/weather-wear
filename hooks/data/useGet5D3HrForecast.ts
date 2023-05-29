import useSWR from 'swr'
import { get5Day3HourForecastByCoordinate } from '../../services/queries/get5Day3hourForecastByCoordinate'
import { Unit } from '../../types/weatherApi'

/**
 * Custom hook to get 5 hour / 3day forecast based on the coordinate.
 *
 * @param {number} lat
 * @param {number} lon
 * @param {Unit} [unit]
 * @return {*} {
    forecast: FiveDThreeHrForecastApiResponse;
    error: any;
    isLoading: boolean;
    isValidating: boolean;
  }
 */
export const useGet5D3HrForecast = (lat: number, lon: number, unit?: Unit) => {
  const { data, error, isLoading, isValidating } = useSWR(['FiveDThreeHrForecast/get', lat, lon, unit], () => get5Day3HourForecastByCoordinate(lat, lon, unit), { refreshInterval: 1800000 })

  return {
    forecast: data,
    error,
    isLoading,
    isValidating,
  }
}
