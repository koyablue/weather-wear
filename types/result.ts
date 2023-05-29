// TODO: Delete this file if it's not necessary anymore(because installed SWR)

// Return this type from API call try-catch functions
export type Result<T, E> = Success<T> | Failure<E>

export type Success<T> = {
  readonly isSuccess: true
  readonly isFailure: false
  readonly data: T
}

/**
 * Constructor for Success type
 *
 * @template T
 * @param {T} value
 * @return {*}  {Success<T>}
 */
export const newSuccess = <T>(data: T): Success<T> => (
  {
    isSuccess: true,
    isFailure: false,
    data
  }
)

export type Failure<E> = {
  readonly isSuccess: false
  readonly isFailure: true
  readonly data: E
}

/**
 * Constructor for Failure type
 *
 * @template E
 * @param {E} value
 * @return {*}  {Failure<E>}
 */
export const newFailure = <E>(data: E): Failure<E> => (
  {
    isSuccess: false,
    isFailure: true,
    data
  }
)
