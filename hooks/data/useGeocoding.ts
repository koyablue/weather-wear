import useSWR, { SWRConfiguration } from 'swr'
import { getCitiesClient } from '../../services/queries/client/getCitiesClient'
import { GeocodingApiQuery } from '../../types/geocoding'

/**
 * Custom hook to use geocoding api
 *
 * @param {GeocodingApiQuery} q
 * @param {number} [limit]
 * @param {SWRConfiguration<any, any>} [options]
 * @return {*}
 */
export const useGeocoding = (q: GeocodingApiQuery, limit?: number, options?: SWRConfiguration<any, any>) => {
  const { data, error, isLoading, isValidating } = useSWR(
    // only fetch data if cityName is not empty
    q.cityName ? ['geocoding/get', q, limit] : null,
    () => getCitiesClient(q, limit),
    options,
  )

  return {
    geocodingResult: data,
    error,
    isLoading,
    isValidating,
  }
}
