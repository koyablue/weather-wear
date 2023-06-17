import { GEOAPIFY_API_KEY, GEOCODING_API_ENDPOINT, OPEN_WEATHER_API_KEY, REVERSE_GEOCODING_API_BASE_ENDPOINT } from '../constants/api'

// types
import { GeocodingApiQuery } from '../types/geocoding'

/**
 * https://openweathermap.org/api/geocoding-api
 *
 * https://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
 *
 * @param {GeocodingApiQuery} q
 * @param {number} limit
 * @return {*} string
 */
export const getGeocodingApiEndpoint = (
  q: GeocodingApiQuery, limit?: number) => {
    const qString = `${q.cityName},${q.stateCode || ''},${q.countryCode || ''}`
    return `${GEOCODING_API_ENDPOINT}?q=${qString}&limit=${limit || ''}&appid=${OPEN_WEATHER_API_KEY}`
  }

/**
 * Geoapify API
 * https://www.geoapify.com/
 * https://api.geoapify.com/v1/geocode/reverse?lat=51.21709661403662&lon=6.7782883744862374&apiKey=yourApiKey
 *
 * @param {number} lat
 * @param {number} lon
 * @param {string} [lang='en-us']
 * @return {*} string
 */
export const getReverseGeocodingApiEndpoint = (lat: number, lon: number) => {
  return `${REVERSE_GEOCODING_API_BASE_ENDPOINT}?lat=${lat}&lon=${lon}&apiKey=${GEOAPIFY_API_KEY}`
}
