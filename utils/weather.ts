import { WEATHER_API_BASE_ENDPOINT, GEOCODING_API_ENDPOINT, OPEN_WEATHER_API_KEY } from '../constants/api'
import { Unit } from '../types/weatherApi'

/**
 * https://openweathermap.org/current
 *
 * https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
 *
 * @param {number} lat
 * @param {number} lon
 */
export const getCurrentWeatherApiEndpoint = (lat: number, lon: number, unit?: Unit) => (
  `${WEATHER_API_BASE_ENDPOINT}/weather?lat=${lat}&lon=${lon}&units=${unit || ''}&appid=${OPEN_WEATHER_API_KEY}`
)

/**
 * https://openweathermap.org/forecast5
 *
 * https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
 *
 * @param {number} lat
 * @param {number} lon
 */
export const get5Day3hourForecastApiEndpoint = (lat: number, lon: number, unit?: Unit) => (
  `${WEATHER_API_BASE_ENDPOINT}/forecast?lat=${lat}&lon=${lon}&units=${unit || ''}&appid=${OPEN_WEATHER_API_KEY}`
)
