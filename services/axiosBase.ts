import axios, { AxiosInstance } from 'axios'

/**
 * axiosで通信する際のベースとなるaxios instance
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
