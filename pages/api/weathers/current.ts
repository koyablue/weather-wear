import { NextApiRequest, NextApiResponse } from 'next'

const getCurrentWeather = async () => {
  // TODO: API call
}

// TODO: current weather API
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    // TODO: error response
  }

  // TODO: validation

  // TODO: getCurrentWeather()
}

export default handler
