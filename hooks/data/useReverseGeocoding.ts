import useSWR, { SWRConfiguration } from 'swr'
import { getUserLocation } from '../../services/queries/client/getUserLocation'

/**
 * Custom hook to call reverse geocoding api
 *
 * @param {string} apiKey
 * @param {number} lat
 * @param {number} lon
 * @param {SWRConfiguration<any, any>} [options]
 * @return {*} {
    userLocation: {
        cityName: string;
    };
    error: any;
    isLoading: boolean;
    isValidating: boolean;
  }
 */
export const useReverseGeocoding = (apiKey: string, lat: number, lon: number, options?: SWRConfiguration<any, any>) => {
  const { data, error, isLoading, isValidating } = useSWR(
    () => (lat && lon) ? ['reverseGeocoding/get', apiKey, lat, lon] : null,
    () => getUserLocation(apiKey, lat, lon),
    options,
  )

  return {
    userLocation: data,
    error,
    isLoading,
    isValidating
  }
}
