export type CurrentWeatherApiResponse = {
  coord?: {
    lon?: number
    lat?: number
  }
  weather?: WeatherElement[]
  base?: string
  main?: {
    temp?: number
    feels_like?: number
    temp_min?: number
    temp_max?: number
    pressure?: number
    humidity?: number
    sea_level?: number
    grnd_level?: number
  }
  visibility?: number
  wind?: {
    speed?: number
    deg?: number
    gust?: number
  }
  rain?: {
    '1h'?: number
    '3h'?: number
  }
  clouds?: {
    all?: number
  }
  dt?: number
  sys?: {
    type?: number
    id?: number
    message?: number
    country?: string
    sunrise?: number
    sunset?: number
  }
  timezone?: number
  id?: number
  name?: string
  cod?: number
}

type WeatherElement = {
  id?: number
  main?: string
  description?: string
  icon?: string
}

export type FiveDThreeHrForecastApiResponse = {
  cod: string
  message: number
  cnt: number
  list: Forecast[]
  city: {
    id: number
    name: string
    coord: {
      lon: number
      lat: number
    }
    country: string
    population: number
    timezone: number
    sunrise: number
    sunset: number
  }
}

export type Forecast = {
  dt: number
  main: {
    temp: number
    feels_like: number
    pressure: number
    humidity: number
    temp_min: number
    temp_max: number
    sea_level: number
    grnd_level: number
    temp_kf: number
  }
  weather: {
    id: number
    main: string
    description: string
    icon: string
  }[]
  clouds: {
    all: number
  }
  wind: {
    speed: number
    deg: number
    gust?: number
  }
  visibility: number
  pop: number
  rain?: {
    '3h': number
  }
  snow?: {
    '3h': number
  }
  sys: {
    pod: string // Part of the day (d = day, n = night)
  }
  dt_txt: string
}

// https://openweathermap.org/current#data
// unit type for the parameter of OpenWeather API.
// standard: Kelvin
// imperial: Fahrenheit
// metric: Celsius

// default(''): standard
export type Unit = '' | 'standard' | 'metric' | 'imperial'
