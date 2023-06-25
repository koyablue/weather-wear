import useSWR, { SWRConfiguration } from 'swr'
import { getUserLocation } from '../../services/queries/client/getUserLocation'

/**
 * Custom hook to use geolocation api to get current location of the user
 *
 * @param {string} apiKey
 * @param {SWRConfiguration<any, any>} [options]
 * @return {*}
 */
export const useGetUserLocation = (apiKey: string, options?: SWRConfiguration<any, any>) => {
  const { data, error, isLoading, isValidating } = useSWR(
    ['geolocation/get', apiKey],
    () => getUserLocation(apiKey),
    { refreshInterval: 600000, ...options }
  )

  return {
    userLocation: data,
    error,
    isLoading,
    isValidating,
  }
}
