import { geolocationApiKey, GEOLOCATION_API_URL } from '@/constants/constants'

/**
 * Returns geolocation API url with params
 *
 * @param {string[]} [fields]
 * @return {*}  {string}
 */
export const getGeolocationApiUrl = (fields?: string[]): string => {
  const fieldsParam = fields && fields.length ? fields.join(',') : ''
  return `${GEOLOCATION_API_URL}${geolocationApiKey}&fields=${fieldsParam}`
}
