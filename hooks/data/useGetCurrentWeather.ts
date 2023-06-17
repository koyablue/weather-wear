import useSWR, { SWRConfiguration, mutate } from 'swr'
import { getCurrentWeatherClient } from '../../services/queries/client/getCurrentWeatherClient'
import { Unit } from '../../types/weatherApi'

/**
 * Custom hook to get current weather data based on the coordinate.
 *
 * @param {number} lat
 * @param {number} lon
 * @param {Unit} unit
 * @return {*} {
    currentWeather: CurrentWeatherApiResponse;
    error: any;
    isLoading: boolean;
    isValidating: boolean;
  }
 */
export const useGetCurrentWeather = (lat: number, lon: number, unit?: Unit, options?: SWRConfiguration<any, any>) => {
  // 30 min to refresh
  // TODO: make millisec constant
  const { data, error, isLoading, isValidating } = useSWR(
    // only fetch data if lat and lon is not 0
    () => (lat && lon) ? ['currentWeather/get', lat, lon, unit] : null,
    () => getCurrentWeatherClient(lat, lon, unit),
    { refreshInterval: 1800000, ...options }
  )

  return {
    currentWeather: data,
    error,
    isLoading,
    isValidating,
  }
}
