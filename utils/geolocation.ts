import { GEOLOCATION_API_ENDPOINT } from '../constants/api'

/**
 * Returns geolocation API url
 *
 * 'https://www.googleapis.com/geolocation/v1/geolocate'
 *
 * @param {string[]} [fields]
 * @return {*}  {string}
 */
export const getGeolocationApiEndpoint = (apiKey: string): string => {
  return `${GEOLOCATION_API_ENDPOINT}?key=${apiKey}`
}
