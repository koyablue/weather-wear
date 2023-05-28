import { ReactNode } from 'react'

import InitColorTheme from './includes/InitColorTheme'

import { useAppSelector } from '../../stores/hooks'
import { selectColorThemeInit } from '../../stores/slices/colorThemeSlice'

type Props = {
  children?: ReactNode
}

/**
 *
 *
 * @param {Props} { children }
 * @return {*} JSX.Element
 */
const BaseLayout = ({ children }: Props) => {
  const isColorThemeInit = useAppSelector(selectColorThemeInit)

  return (
    <>
      <InitColorTheme />
      {isColorThemeInit && <>{children}</>}
    </>
  )
}

export default BaseLayout
