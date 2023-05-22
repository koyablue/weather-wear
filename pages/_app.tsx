import type { AppProps } from 'next/app'
import { ThemeProvider, DefaultTheme } from 'styled-components'
import GlobalStyle from '../components/globalstyles'

// themes
import { lightTheme } from '../styles/themes'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
