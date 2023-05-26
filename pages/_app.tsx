// react
import type { ReactElement, ReactNode } from 'react';

// next
import { NextPage } from 'next';
import type { AppProps } from 'next/app'

// libraries
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'

// stores
import { store } from '../stores/store'
import { useAppSelector } from '../stores/hooks'
import { selectColorTheme } from '../stores/slices/colorThemeSlice'

import GlobalStyle from '../components/globalstyles'

import { colorThemes } from '../constants/colorTheme';

// Layout configuration doc
// https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts#with-typescript

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
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
    const theme = useAppSelector(selectColorTheme);

    return (
      <ThemeProvider theme={colorThemes[theme]}>
        <GlobalStyle />
        <Component {...props} />
      </ThemeProvider>
    );
  };
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  const ComponentWithThemeProvider = withThemeProvider(Component);

  return (
    <Provider store={store}>
      {getLayout(<ComponentWithThemeProvider {...pageProps} />)}
    </Provider>
  )
}
