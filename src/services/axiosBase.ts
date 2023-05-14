import axios, { AxiosInstance } from 'axios'

/**
 * Returns Axios instance
 * Use this function to make API call
 *
 * @param {string} [baseURL]
 * @return {*}  {AxiosInstance}
 */
export const axiosBase = (baseURL?: string): AxiosInstance => {
  return axios.create({
    baseURL,
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
}
