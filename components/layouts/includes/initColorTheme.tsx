import { useEffect } from 'react'

import { useColorTheme } from '../../../hooks/useColorTheme'

// stores
import { useAppDispatch } from '../../../stores/hooks'
import { updateColorThemeInitState } from '../../../stores/slices/colorThemeSlice'

/**
 * Initialize color theme state and cookie
 *
 * @return {*} null
 */
const InitColorTheme = () => {
  const dispatch = useAppDispatch()

  const { initColorTheme } = useColorTheme()

  useEffect(() => {
    initColorTheme()
    dispatch(updateColorThemeInitState(true))
  }, [])

  return null
}

export default InitColorTheme
