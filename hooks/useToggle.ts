import { useState } from 'react'

/**
 * Custom hook for switching true/false.
 *
 * @param {boolean} [initialState=false]
 * @return {*}
 */
export const useToggle = (initialState = false) => {
  const [toggleState, setToggleState] = useState(initialState)

  const toggle = () => {
    setToggleState(!toggleState)
  }

  return {
    toggleState,
    setToggleState,
    toggle,
  } as const
}
