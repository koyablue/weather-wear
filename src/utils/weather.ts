import { WEATHER_API_BASE_ENDPOINT, GEOCODING_API_ENDPOINT, OPEN_WEATHER_API_KEY } from '@/constants/constants'

/**
 * https://openweathermap.org/current
 *
 * https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
 *
 * @param {number} lat
 * @param {number} lon
 */
export const getCurrentWeatherApiEndpoint = (lat: number, lon: number) => (
  `${WEATHER_API_BASE_ENDPOINT}/weather?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}`
)

/**
 * https://openweathermap.org/forecast5
 *
 * https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
 *
 * @param {number} lat
 * @param {number} lon
 */
export const get5Day3hourForecastApiEndpoint = (lat: number, lon: number) => (
  `${WEATHER_API_BASE_ENDPOINT}/forecast?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}`
)

/**
 * https://openweathermap.org/api/geocoding-api
 *
 * https://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
 *
 * @param {{ cityName: string, stateCode?: string, countryCode?: string }} q
 * @param {number} limit
 * @return {*} string
 */
export const getGeocodingApiEndpoint = (
q: { cityName: string, stateCode?: string, countryCode?: string }, limit: number) => {
  const qString = `${q.cityName},${q.stateCode},${q.countryCode}`
  return `${GEOCODING_API_ENDPOINT}?q=${qString}&limit=${limit}&appid=${OPEN_WEATHER_API_KEY}`
}