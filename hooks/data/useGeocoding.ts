import useSWR from 'swr'
import { getCitiesClient } from '../../services/queries/client/getCitiesClient'
import { GeocodingApiQuery } from '../../types/geocoding'

/**
 * Custom hook to use geocoding api
 *
 * @param {GeocodingApiQuery} q
 * @param {number} [limit]
 * @return {*} {
    geocodingResult: GeocodingApiResponse;
    error: any;
    isLoading: boolean;
    isValidating: boolean;
  }
 */
export const useGeocoding = (q: GeocodingApiQuery, limit?: number) => {
  const { data, error, isLoading, isValidating } = useSWR(
    ['geocoding/get', q, limit],
    () => getCitiesClient(q, limit),
  )

  return {
    geocodingResult: data,
    error,
    isLoading,
    isValidating,
  }
}
