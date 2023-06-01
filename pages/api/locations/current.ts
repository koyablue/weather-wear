import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { getGeolocationApiEndpoint } from '../../../utils/geolocation'

import { GeolocationApiResponse } from '../../../types/geolocationApi'

// TODO: current weather API
const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<GeolocationApiResponse>
) => {
  if (req.method !== 'GET') {
    // TODO: error response
  }

  // TODO: validation

  // TODO: fields = req.fields
  const fields = typeof req.query.fields === 'string' ? req.query.fields.split(',') : []
  const currentLocation = await fetch(getGeolocationApiEndpoint(fields))
    .then(res => res.json())

  res.status(200).json(currentLocation)
}

export default handler
