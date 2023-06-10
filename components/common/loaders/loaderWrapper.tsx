import { LoaderSizeMarginProps } from 'react-spinners/helpers/props'
import { useColorTheme } from '../../../hooks/useColorTheme'

type Props = LoaderSizeMarginProps & {
  // To avoid "JSX element type 'SpinnerComponent' does not have any construct or call signatures." error, use ComponentType instead of JSX.Element
  SpinnerComponent: React.ComponentType<LoaderSizeMarginProps>
}

/**
 * Wrapper component for any react-spinner components.
 *
 * @param {Props} { SpinnerComponent, ...props }
 * @return {*} JSX.Element
 */
const LoaderWrapper = ({ SpinnerComponent, ...props }: Props) => {
  const { getCurrentColorThemeState, getColorThemeStyle } = useColorTheme()

  let color = props.color || ''
  if (!color) {
    switch (getCurrentColorThemeState()) {
      case 'light':
        color = getColorThemeStyle('dark').colors.background
        break
      case 'dark':
        color = getColorThemeStyle('light').colors.background
        break
      default:
        color = '#ffffff'
    }
  }

  return <SpinnerComponent color={color} {...props} />
}

export default LoaderWrapper
