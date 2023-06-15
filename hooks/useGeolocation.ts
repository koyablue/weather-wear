import { useEffect, useState } from 'react'

/**
 * Custom hook to use browser built-in geolocation API.
 *
 * @param {number} [intervalMillisec=600000]
 * @return {*} {
    isLoading: boolean;
    error: string;
    location: GeolocationCoordinates;
    permissionStatus: PermissionState;
  }
 */
export const useGeolocation = (intervalMillisec = 600000) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')
  const [location, setLocation] = useState<GeolocationCoordinates | null>(null)
  const [permissionStatus, setPermissionStatus] = useState<PermissionState>('prompt')

  useEffect(() => {
    let watchId: number | null = null

    /**
     * Ask permission and set the result to the state
     * Get current location and set the result to the state
     * Set loading state
     * Set error state
     *
     */
    const startWatchingPosition = async () => {
      try {
        if ('permissions' in navigator) {
          const status = await navigator.permissions.query({ name: 'geolocation' })
          setPermissionStatus(status.state)

          switch (status.state) {
            case 'granted':
              watchId = navigator.geolocation.watchPosition(
                (position: GeolocationPosition) => {
                  setLocation(position.coords)
                },
                (error: GeolocationPositionError) => {
                  setError(error.message)
                },
                { enableHighAccuracy: true }
              )
              setIsLoading(false)
              break
            case 'prompt':
              navigator.geolocation.getCurrentPosition(
                (position: GeolocationPosition) => {
                  setLocation(position.coords)
                },
                (error: GeolocationPositionError) => {
                  setError(error.message)
                },
                { enableHighAccuracy: true }
              )
              break
            default:
              setIsLoading(false)

          }
        } else {
          setError('Geolocation permissions are not supported')
          setIsLoading(false)
        }
      } catch (error) {
        setError(error.message)
        setIsLoading(false)
      }
    }

    const stopWatchingPosition = () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId)
      }
    }

    startWatchingPosition()

    const timer = setInterval(() => {
      stopWatchingPosition()
      startWatchingPosition()
    }, intervalMillisec)

    return () => {
      stopWatchingPosition()
      clearInterval(timer)
    }
  }, [])

  return { isLoading, error, location, permissionStatus }
}
