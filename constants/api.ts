export const WEATHER_API_BASE_ENDPOINT = 'https://api.openweathermap.org/data/2.5'
export const GEOCODING_API_ENDPOINT = 'https://api.openweathermap.org/geo/1.0/direct'
export const OPEN_WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY || ''

// reverse geocoding api
export const GEOAPIFY_API_KEY = process.env.GEOAPIFY_API_KEY || ''
export const REVERSE_GEOCODING_API_BASE_ENDPOINT = 'https://api.geoapify.com/v1/geocode/reverse'

// Google API
// parameter ?key=API_KEY is necessary
export const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY || ''
export const GEOLOCATION_API_ENDPOINT = 'https://www.googleapis.com/geolocation/v1/geolocate' // POST req only
export const REVERSE_GEOCODING_API_ENDPOINT = 'https://maps.googleapis.com/maps/api/geocode/json'
