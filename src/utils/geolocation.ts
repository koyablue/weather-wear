import { GEOLOCATION_API_KEY, GEOLOCATION_API_ENDPOINT } from '@/constants/constants'

/**
 * Returns geolocation API url with params
 *
 * @param {string[]} [fields]
 * @return {*}  {string}
 */
export const getGeolocationApiEndpoint = (fields?: string[]): string => {
  const fieldsParam = fields && fields.length ? fields.join(',') : ''
  return `${GEOLOCATION_API_ENDPOINT}${GEOLOCATION_API_KEY}&fields=${fieldsParam}`
}
