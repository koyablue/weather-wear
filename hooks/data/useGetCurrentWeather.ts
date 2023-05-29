import useSWR from 'swr'
import { getCurrentWeatherByCoordinate } from '../../services/queries/getCurrentWeatherByCoordinate'
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
  const { data, error, isLoading, isValidating } = useSWR(['currentWeather/get',lat, lon, unit], () => getCurrentWeatherByCoordinate(lat, lon, unit), { refreshInterval: 1800000 })

  return {
    currentWeather: data,
    error,
    isLoading,
    isValidating,
  }
}
