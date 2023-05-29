import useSWR from 'swr'
import { getUserLocation } from '../../services/queries/getUserLocation'

/**
 * Custom hook to get a user's current location.
 *
 * @param {string[]} [fields]
 * @return {*} {
      userLocation: Partial<GeolocationApiResponse>;
      error: any;
      isLoading: boolean;
      isValidating: boolean;
    }
 */
export const useGetUserLocation = (fields?: string[]) => {
  // 10 min to refresh
  // TODO: make millisec constant
  const { data, error, isLoading, isValidating } = useSWR(['userLocation/get', fields], () => getUserLocation(fields), { refreshInterval: 600000 })

  return {
    userLocation: data,
    error,
    isLoading,
    isValidating
  }
}
