import { GEOCODING_API_ENDPOINT, OPEN_WEATHER_API_KEY } from '../constants/api'

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
