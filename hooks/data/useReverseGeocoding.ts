import useSWR, { SWRConfiguration } from 'swr'
import { getCityClient } from '../../services/queries/client/getCityClient'

/**
 * Custom hook to get location data by coordinate
 * ex) // https://nominatim.openstreetmap.org/reverse?lat=49.2797907&lon=-123.1156889&format=json&accept-language=en-us
 *
 * @param {number} lat
 * @param {number} lon
 * @param {number} cookie
 * @param {SWRConfiguration<any, any>} [options]
 * @return {*} {
    city: ReverseGeocodingApiResponse;
    error: any;
    isLoading: boolean;
    isValidating: boolean;
  }
 */
export const useReverseGeocoding = (lat: number, lon: number, options?: SWRConfiguration<any, any>) => {
  const { data, error, isLoading, isValidating } = useSWR(
    () => (lat && lon) ? ['reverseGeocoding/get', lat, lon] : null,
    () => getCityClient(lat, lon),
    options,
  )

  return {
    userLocation: data,
    error,
    isLoading,
    isValidating
  }
}
