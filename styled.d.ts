import 'styled-components'

// themes
import { lightTheme } from './styles/themes'

type LightTheme = typeof lightTheme

declare module 'styled-components' {
  export interface DefaultTheme extends LightTheme {}
}
