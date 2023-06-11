import { useEffect, useRef } from 'react'

/**
 * Detect clicks of the outside of the element and trigger the callback
 *
 * @template T
 * @param {() => void} callback
 * @return {*}  {React.RefObject<T>}
 */
export const useOutsideClick = <T extends HTMLElement>(callback: () => void): React.RefObject<T> => {
  const ref = useRef<T>(null)

  const handleOutsideClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      callback()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick)

    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [])

  return ref
}
