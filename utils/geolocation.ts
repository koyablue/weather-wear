import { GEOLOCATION_API_ENDPOINT } from '../constants/api'

/**
 * Returns geolocation API url
 *
 * https://app.ipgeolocation.io/
 *
 * @param {string[]} [fields]
 * @return {*}  {string}
 */
export const getGeolocationApiEndpoint = (apiKey: string): string => {
  return `${GEOLOCATION_API_ENDPOINT}${apiKey}`
}
