import { Result } from './result'

// TODO: Delete this file if it's not necessary anymore(because installed SWR)

export type UseApiReturnType<T> = {
  data: T | undefined
  isError: boolean
  error: unknown
}

/**
 * Constructor for UseApiReturnType
 *
 * @template T
 * @template E
 * @param {Result<T, E>} result
 * @return {*}  {UseApiReturnType<T>}
 */
export const newUseApiReturnType = <T, E>(result: Result<T, E>): UseApiReturnType<T> => (
  {
    data: result.isSuccess ? result.data : undefined,
    isError: result.isFailure,
    error: result.isFailure ? result.data : undefined
  }
)

export type ApiError = {
  error: unknown
}
