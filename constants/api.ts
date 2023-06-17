// https://app.abstractapi.com/api/ip-geolocation/documentation
export const GEOLOCATION_API_ENDPOINT = 'https://ipgeolocation.abstractapi.com/v1/?api_key='
export const GEOLOCATION_API_KEY = process.env.GEOLOCATION_API_KEY || ''

export const WEATHER_API_BASE_ENDPOINT = 'https://api.openweathermap.org/data/2.5'
export const GEOCODING_API_ENDPOINT = 'https://api.openweathermap.org/geo/1.0/direct'
export const OPEN_WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY || ''

// reverse geocoding api
export const GEOAPIFY_API_KEY = process.env.GEOAPIFY_API_KEY || ''
export const REVERSE_GEOCODING_API_BASE_ENDPOINT = 'https://api.geoapify.com/v1/geocode/reverse'
