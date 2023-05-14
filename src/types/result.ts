// Return this type from API call try-catch functions
export type Result<T, E> = Success<T> | Failure<E>

type Success<T> = {
  readonly isSuccess: true
  readonly isFailure: false
  readonly value: T
}

/**
 * Constructor for Success type
 *
 * @template T
 * @param {T} value
 * @return {*}  {Success<T>}
 */
export const newSuccess = <T>(value: T): Success<T> => (
  {
    isSuccess: true,
    isFailure: false,
    value
  }
)

type Failure<E> = {
  readonly isSuccess: false
  readonly isFailure: true
  readonly value: E
}

/**
 * Constructor for Failure type
 *
 * @template E
 * @param {E} value
 * @return {*}  {Failure<E>}
 */
export const newFailure = <E>(value: E): Failure<E> => (
  {
    isSuccess: false,
    isFailure: true,
    value
  }
)
