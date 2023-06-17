// react
import React, { ReactElement, ReactNode } from 'react'

// next
import { NextPage } from 'next'
import { Nunito } from 'next/font/google'
import type { AppProps } from 'next/app'

// libraries
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'

// stores
import { store } from '../stores/store'

// components
import GlobalStyle from '../components/globalstyles'

import { useColorTheme } from '../hooks/useColorTheme'

import { ColorTheme } from '../types/colorTheme'

// Layout configuration doc
// https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts#with-typescript

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
  initialColorTheme: ColorTheme
}

/**
 * Takes a component to be wrapped
 * Return the component wrapped by ThemeProvider
 *
 * @param {NextPageWithLayout} Component
 * @return {*} JSX.Element
 */
const withThemeProvider = (Component: NextPageWithLayout) => {
  return (props: any) => {
    const { getCurrentColorThemeStyle } = useColorTheme()

    return (
      <ThemeProvider theme={getCurrentColorThemeStyle()}>
        <GlobalStyle />
        <Component {...props} />
      </ThemeProvider>
    );
  };
}

const nunito = Nunito({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  const ComponentWithThemeProvider = withThemeProvider(Component)

  return (
    <Provider store={store}>
      <div className={nunito.className}>
        {getLayout(<ComponentWithThemeProvider {...pageProps} />)}
      </div>
    </Provider>
  )
}
