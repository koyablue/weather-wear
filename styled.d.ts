import 'styled-components'

// themes
import { ColorThemeStyle } from './types/colorTheme'

declare module 'styled-components' {
  export interface DefaultTheme extends ColorThemeStyle {}
}
