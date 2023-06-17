import { axiosBase } from '../../axiosBase'
import { ReverseGeocodingApiResponse } from '../../../types/reverseGeocoding'

// https://nominatim.openstreetmap.org/reverse?lat=49.2797907&lon=-123.1156889&format=json&accept-language=en-us

/**
 * Call reverse geocoding API in client side code
 *
 * @param {number} lat
 * @param {number} lon
 * @return {*}  {Promise<ReverseGeocodingApiResponse>}
 */
export const getCityClient = async (lat: number, lon: number): Promise<ReverseGeocodingApiResponse> => {
  const res = await axiosBase().get(`/api/locations/city?lat=${lat}&lon=${lon}`)
  return res.data
}
