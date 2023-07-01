import { useState, useEffect } from 'react'
import { getUserLocationCoordinate } from '../../services/queries/client/getUserLocationCoordinate'

type Coord = {
  lat: number
  lon: number
}

/**
 * Custom hook to use geolocation api
 *
 * @param {string} geolocationApiKey
 * @return {*} {
    coord: Coord;
    error: any;
  }
 */
export const useGeolocation = (geolocationApiKey: string) => {
  const [coord, setCoord] = useState<Coord>({ lat: 0, lon: 0, })
  const [error, setError] = useState(null)

  /**
   * Call geolocation api and set result to the states
   *
   */
  const getCoord = async () => {
    try {
      const res = await getUserLocationCoordinate(geolocationApiKey)
      setCoord({
        lat: res.location.lat,
        lon: res.location.lng,
      })
    } catch (error) {
      setError(error)
    }
  }
  useEffect(() => {
    getCoord()
  }, [])

  return {
    coord,
    error,
  }
}
