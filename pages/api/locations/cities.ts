import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

import { getGeocodingApiEndpoint } from '../../../utils/geocoding'
import { apiRouteErrorMessage, validateMethod } from '../../../utils/api'

import { GeocodingApiResponse } from '../../../types/geocoding'
import { ApiResponse } from '../../../types/api'

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<GeocodingApiResponse>>
) => {
  validateMethod(['GET'])(req, res)

  try {
    // TODO: validation

    const cityName = req.query.cityName as string
    const stateCode = req.query.stateCode as string
    const countryCode = req.query.countryCode as string
    const limit = Number(req.query.limit) || undefined

    const resCities = await fetch(getGeocodingApiEndpoint({cityName, stateCode, countryCode}, limit))
    const resCitiesJson = await resCities.json()

    if (!resCities.ok) {
      throw new Error('Geocoding API request failed')
    }

    return res.status(200).json(resCitiesJson)
  } catch(error) {
    const message = apiRouteErrorMessage('/api/locations/cities')
    console.error(message, error)
    return res.status(500).json({ message })
  }
}

export default handler
