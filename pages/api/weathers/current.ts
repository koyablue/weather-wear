import { NextApiRequest, NextApiResponse } from 'next'

import { getCurrentWeatherApiEndpoint } from '../../../utils/weather'
import { apiRouteErrorMessage, validateMethod } from '../../../utils/api'

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

    const resCurrentWeather = await fetch(getCurrentWeatherApiEndpoint(lat, lon, unit))
    const resCurrentWeatherJson = await resCurrentWeather.json()

    if (!resCurrentWeather.ok) {
      throw Error('Current weather API request failed')
    }

    res.status(200).json(resCurrentWeatherJson)
  } catch(error) {
    const message = apiRouteErrorMessage('/api/weathers/current')
    console.error(message, error)
    return res.status(500).json({ message })
  }
}

export default handler
