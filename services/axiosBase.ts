import axios, { AxiosInstance } from 'axios'

/**
 * axios instance
 *
 * @param {string} token
 * @return {*}  {AxiosInstance}
 */
export const axiosBase = (): AxiosInstance => {
  return axios.create({
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
}
