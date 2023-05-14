import { getUserLocation } from '@/services/queries/getUserLocation'

export const useGetUserLocation = async (fields?: string[]) => {
  try {
    const res = await getUserLocation(fields)
    return res
  } catch (err) {
    // TODO: error handling
    console.log('ERROR: useGetUserLocation')
  }
}