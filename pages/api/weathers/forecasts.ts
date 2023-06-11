import { NextApiRequest, NextApiResponse } from 'next'

import { apiRouteErrorMessage, validateMethod } from '../../../utils/api'
import { getForecastApiEndpoint } from '../../../utils/weather'

import { CurrentWeatherApiResponse, Unit } from '../../../types/weatherApi'
import { ApiResponse } from '../../../types/api'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<CurrentWeatherApiResponse>>
) => {
  validateMethod(['GET'])(req, res)

  try {
    // TODO: validation

    const lat = Number(req.query.lat)
    const lon = Number(req.query.lon)
    const unit = req.query.unit as Unit

    const resForecasts = await fetch(getForecastApiEndpoint(lat, lon, unit))
    const resForecastsJson = await resForecasts.json()

    if (!resForecasts.ok) {
      throw new Error('Forecast API request failed')
    }

    res.status(200).json(resForecastsJson)
  } catch(error) {
    const message = apiRouteErrorMessage('/api/weather/forecasts')
    console.error(message, error)
    return res.status(500).json({ message })
  }
}

export default handler
