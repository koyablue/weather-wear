import useSWR from 'swr'
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
export const useGetCurrentWeather = (lat: number, lon: number, unit?: Unit) => {
  // 30 min to refresh
  // TODO: make millisec constant
  const { data, error, isLoading, isValidating } = useSWR(
    ['currentWeather/get',lat, lon, unit],
    () => getCurrentWeatherClient(lat, lon, unit),
    { refreshInterval: 1800000 }
  )

  return {
    currentWeather: data,
    error,
    isLoading,
    isValidating,
  }
}
