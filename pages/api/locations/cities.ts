import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { GeocodingApiResponse } from '../../../types/geocoding'
import { getGeocodingApiEndpoint } from '../../../utils/geocoding'

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<GeocodingApiResponse>
) => {
  if (req.method !== 'GET') {
    // TODO: error response
  }

  // TODO: validation

  const cityName = req.query.cityName as string
  const stateCode = req.query.stateCode as string
  const countryCode = req.query.countryCode as string
  const limit = Number(req.query.limit) || undefined

  const cities = await fetch(getGeocodingApiEndpoint({cityName, stateCode, countryCode}, limit))
    .then(res => res.json())

  return res.status(200).json(cities)
}

export default handler
