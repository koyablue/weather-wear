// type for q= params of geocoding API
// https://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
export type GeocodingApiQuery = {
  cityName: string
  stateCode?: string
  countryCode?: string
}

export type GeocodingApiResponseItem = {
    name: string
    local_names: { [key: string]: string }
    lat: number
    lon: number
    country: string
    state?: string
}

export type GeocodingApiResponse = GeocodingApiResponseItem[]
