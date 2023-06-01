import useSWR, { SWRConfiguration } from 'swr'
import { getUserLocationClient } from '../../services/queries/client/getUserLocationClient'
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
export const useGetUserLocation = (fields?: string[], options?: SWRConfiguration<any, any>) => {
  // 10 min to refresh
  // TODO: make millisec constant
  const { data, error, isLoading, isValidating } = useSWR(
    ['userLocation/get', fields],
    () => getUserLocationClient(fields),
    options || { refreshInterval: 600000, revalidateOnFocus: false }
  )

  return {
    userLocation: data,
    error,
    isLoading,
    isValidating
  }
}
