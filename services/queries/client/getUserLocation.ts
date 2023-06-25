import { axiosBase } from '../../axiosBase'
import { getGeolocationApiEndpoint } from '../../../utils/geolocation'
import { GeolocationApiResponse } from '../../../types/geolocation'
import { UserLocation } from '../../../types/userLocation'

/**
 * Filter necessary values from geolocationApiResponse and return UserLocation
 *
 * @param {GeolocationApiResponse} geolocationApiResponse
 * @return {*}  {UserLocation}
 */
const selectUserLocation = (geolocationApiResponse: GeolocationApiResponse): UserLocation => {
  return {
    cityName: geolocationApiResponse.city,
    lat: Number(geolocationApiResponse.latitude),
    lon: Number(geolocationApiResponse.longitude),
  }
}

/**
 * Call geolocation API in client side code
 *
 * @param {string} apiKey
 * @return {*}  {Promise<UserLocation>}
 */
export const getUserLocation = async (apiKey: string): Promise<UserLocation> => {
  const res = await axiosBase().get(getGeolocationApiEndpoint(apiKey))
  return selectUserLocation(res.data)
}
