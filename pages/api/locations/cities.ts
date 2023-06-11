import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { GeocodingApiResponse } from '../../../types/geocoding'
import { getGeocodingApiEndpoint } from '../../../utils/geocoding'

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<GeocodingApiResponse | { message: string }>
) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    // TODO: validation

    const cityName = req.query.cityName as string
    const stateCode = req.query.stateCode as string
    const countryCode = req.query.countryCode as string
    const limit = Number(req.query.limit) || undefined

    const response = await fetch(getGeocodingApiEndpoint({cityName, stateCode, countryCode}, limit))
    const responseJson = await response.json()

    if (!response.ok) {
      throw new Error('Geocoding API request failed')
    }

    return res.status(200).json(responseJson)
  } catch(error) {
    console.error('Error in API route [/api/locations/cities]:', error)
    return res.status(500).json({ message: 'Error in API route [/api/locations/cities].' })
  }
}

export default handler
