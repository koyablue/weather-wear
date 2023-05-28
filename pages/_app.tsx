// react
import { ReactElement, ReactNode } from 'react';

// next
import { NextPage, NextPageContext } from 'next';
import type { AppContext, AppProps } from 'next/app'

// libraries
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'

// redux
import { store } from '../stores/store'

import GlobalStyle from '../components/globalstyles'

import { colorThemes } from '../constants/colorTheme';

// hooks
import { useColorTheme } from '../hooks/useColorTheme';
import { getColorThemeCookie } from '../utils/cookie/colorTheme';
import { ColorTheme, isColorTheme } from '../types/colorTheme';
import { useAppDispatch, useAppSelector } from '../stores/hooks';
import { selectColorTheme, updateColorTheme } from '../stores/slices/colorThemeSlice';

// Layout configuration doc
// https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts#with-typescript

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
  initialColorTheme: ColorTheme
}

// interface MyAppProps extends AppProps {
//   initialTheme: object;
// }

/**
 * Takes a component to be wrapped
 * Return the component wrapped by ThemeProvider
 *
 * @param {NextPageWithLayout} Component
 * @return {*} JSX.Element
 */
const withThemeProvider = (Component: NextPageWithLayout, initialColorTheme: ColorTheme) => {
  return (props: any) => {
    // const dispatch = useAppDispatch()
    // const currentColorThemeState = useAppSelector(selectColorTheme)

    const { getColorThemeStyle, getCurrentColorThemeStyle, setColorTheme, getCurrentColorThemeState } = useColorTheme()

    // setColorTheme(initialColorTheme)
    // dispatch(updateColorTheme(initialColorTheme))
    console.log('initialColorTheme in withThemeProvider:',initialColorTheme)

    const currentColorThemeState = getCurrentColorThemeState()
    const colorThemeStyle = getColorThemeStyle(initialColorTheme || currentColorThemeState)
    // const colorThemeStyle = getColorThemeStyle(currentColorThemeState)


    // const theme = initialColorTheme ? getColorThemeStyle(initialColorTheme) : getCurrentColorThemeStyle()

    // const themeToApply = currentColorThemeState

    // const theme = initialColorTheme ? getColorThemeStyle(initialColorTheme) : getCurrentColorThemeStyle()

    return (
      <ThemeProvider theme={getColorThemeStyle(initialColorTheme)}>
        <GlobalStyle />
        <Component {...props} />
      </ThemeProvider>
    );
  };
}

export default function App({ Component, pageProps, initialColorTheme }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  console.log('initialColorTheme in App:',initialColorTheme)

  const ComponentWithThemeProvider = withThemeProvider(Component, initialColorTheme);

  return (
    <Provider store={store}>
      {getLayout(<ComponentWithThemeProvider {...pageProps} />)}
    </Provider>
  )
}

App.getInitialProps = async (appContext: AppContext): Promise<{pageProps: {}; initialColorTheme: ColorTheme }> => {
  const { ctx } = appContext
  const { req, res } = ctx

  const colorThemeCookie = getColorThemeCookie({ req, res })
  const initialColorTheme = isColorTheme(colorThemeCookie) ? colorThemeCookie : 'light'
  console.log('initialColorTheme:', initialColorTheme)
  let pageProps = {};

  // if there are any other components that implement getInitialProps, this code is necessary. If not, remove it.
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(ctx);
  }

  return {
    pageProps,
    initialColorTheme
  }
}
