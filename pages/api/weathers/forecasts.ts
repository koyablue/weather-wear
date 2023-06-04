import { NextApiRequest, NextApiResponse } from 'next'
import { getForecastApiEndpoint } from '../../../utils/weather'
import { CurrentWeatherApiResponse, Unit } from '../../../types/weatherApi'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<CurrentWeatherApiResponse>
) => {
  if (req.method !== 'GET') {
    // TODO: error response
  }

  // TODO: validation

  const lat = Number(req.query.lat)
  const lon = Number(req.query.lon)
  const unit = req.query.unit as Unit

  const forecasts = await fetch(getForecastApiEndpoint(lat, lon, unit))
    .then(res => res.json())

  res.status(200).json(forecasts)
}

export default handler
