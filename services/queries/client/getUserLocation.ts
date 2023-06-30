import { axiosBase } from '../../axiosBase'
import { getReverseGeocodingApiEndpoint } from '../../../utils/geocoding'
import { ReverseGeocodingApiResponse } from '../../../types/reverseGeocoding'

/**
 * Filter necessary values from geolocationApiResponse and return UserLocation
 *
 * @param {GeolocationApiResponse} geolocationApiResponse
 * @return {*}  {UserLocation}
 */
const selectUserLocation = (reverseGeocodingApiResponse: ReverseGeocodingApiResponse): { cityName: string } => {
  return {
    cityName: reverseGeocodingApiResponse?.features[0]?.properties?.city || '',
  }
}

/**
 * Call reverse geocoding API in client side code
 *
 * @param {string} apiKey
 * @return {*}  {Promise<{ cityName: string }>}
 */
export const getUserLocation = async (apiKey: string, lat: number, lon: number): Promise<{ cityName: string }> => {
  const res = await axiosBase().get(getReverseGeocodingApiEndpoint(apiKey, lat, lon))
  return selectUserLocation(res.data)
}
