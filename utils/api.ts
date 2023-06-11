import { NextApiRequest, NextApiResponse } from "next";
import { ApiError, ErrorMessage } from "../types/api";

/**
 * HTTP method validation
 *
 * @param {string[]} allowedMethods
 */
export const validateMethod = (allowedMethods: string[]) => (
  req: NextApiRequest,
  res: NextApiResponse<ErrorMessage>
) => {
  if (!allowedMethods.includes(req.method)) {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }
}

/**
 * Generate error message
 * ex) Error in API route [/api/locations/cities]
 *
 * @param {string} apiRoutePath
 * @return {*}  {string}
 */
export const apiRouteErrorMessage = (apiRoutePath: string): string => (
  `Error in API route [${apiRoutePath}]`
)
