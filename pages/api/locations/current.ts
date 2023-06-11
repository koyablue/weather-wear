import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

import { getGeolocationApiEndpoint } from '../../../utils/geolocation'
import { apiRouteErrorMessage, validateMethod } from '../../../utils/api'

import { GeolocationApiResponse } from '../../../types/geolocationApi'
import { ApiResponse } from '../../../types/api'

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<GeolocationApiResponse>>
) => {
  validateMethod(['GET'])(req, res)

  try {
    // TODO: validation

    const fields = typeof req.query.fields === 'string' ? req.query.fields.split(',') : []

    const resCurrentLocation = await fetch(getGeolocationApiEndpoint(fields))
    const resCurrentLocationJson = await resCurrentLocation.json()

    if (!resCurrentLocation.ok) {
      throw new Error('Geolocation API request failed')
    }

    res.status(200).json(resCurrentLocationJson)
  } catch(error) {
    const message = apiRouteErrorMessage('/api/locations/current')
    console.error(message, error)
    return res.status(500).json({ message })
  }
}

export default handler
