import SyncLoader from 'react-spinners/SyncLoader'
import { LoaderSizeMarginProps } from 'react-spinners/helpers/props'

import { useColorTheme } from '../../hooks/useColorTheme'

/**
 * Wrapper component for SyncLoader of React Spinner
 *
 * @param {LoaderSizeMarginProps} props
 * @return {*} JSX.Element | null
 */
const Loader = (props: LoaderSizeMarginProps) => {
  const { getCurrentColorThemeState, getColorThemeStyle } = useColorTheme()

  let color: string
  switch (getCurrentColorThemeState()) {
    case 'light':
      color = getColorThemeStyle('dark').colors.background
      break
    case 'dark':
      color = getColorThemeStyle('light').colors.background
    default:
      color = '#ffffff'
  }

  return (
    <SyncLoader color={color} {...props} />
  )
}

export default Loader
