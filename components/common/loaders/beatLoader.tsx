import BeatLoader from 'react-spinners/BeatLoader'
import { LoaderSizeMarginProps } from 'react-spinners/helpers/props'

import LoaderWrapper from './loaderWrapper'

/**
 * Wrapper component for SyncLoader of React Spinner
 *
 * @param {LoaderSizeMarginProps} props
 * @return {*} JSX.Element | null
 */
const Loader = (props: LoaderSizeMarginProps) => (
  <LoaderWrapper SpinnerComponent={BeatLoader} {...props} />
)

export default Loader
