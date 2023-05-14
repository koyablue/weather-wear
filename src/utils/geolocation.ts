import { geolocationApiKey, geolocationApiUrl } from '@/constants/constants'

/**
 * Returns geolocation API url with params
 *
 * @param {string[]} [fields]
 * @return {*}  {string}
 */
export const getGeolocationApiUrl = (fields?: string[]): string => {
  const fieldsParam = fields && fields.length ? fields.join(',') : ''
  return `${geolocationApiUrl}${geolocationApiKey}&fields=${fieldsParam}`
}
