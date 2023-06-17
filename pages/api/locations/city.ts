import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

import { getReverseGeocodingApiEndpoint } from '../../../utils/geocoding'
import { apiRouteErrorMessage, validateMethod } from '../../../utils/api'

import { ReverseGeocodingApiResponse } from '../../../types/reverseGeocoding'
import { ApiResponse } from '../../../types/api'

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<ReverseGeocodingApiResponse>>
) => {
  validateMethod(['GET'])(req, res)

  try {
    // TODO: validation

    const lat = Number(req.query.lat) || undefined
    const lon = Number(req.query.lon) || undefined

    const resCity = await fetch(getReverseGeocodingApiEndpoint(lat, lon))
    const resCityJson = await resCity.json()

    if (!resCity.ok) {
      throw new Error('Reverse geocoding API request failed')
    }

    return res.status(200).json(resCityJson)
  } catch(error) {
    const message = apiRouteErrorMessage('/api/locations/city')
    console.error(message, error)
    return res.status(500).json({ message })
  }
}

export default handler