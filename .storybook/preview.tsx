// DOCS:
// https://storybook.js.org/recipes/styled-components
// https://storybook.js.org/docs/react/configure/typescript
// https://storybook.js.org/recipes/next

// This import is necessary
// If React isn't imported, this error occurs:
// 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
import React from 'react'

// redux
import { Provider } from 'react-redux'
import { store } from '../stores/store'


import type { Preview } from '@storybook/react'

// to integrate Styled Components
import { withThemeFromJSXProvider } from '@storybook/addon-styling'
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../components/globalstyles'
import { lightTheme, darkTheme } from '../styles/themes'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

export const decorators = [
  withThemeFromJSXProvider({
    themes: {
      light: lightTheme,
      dark: darkTheme,
    },
    defaultTheme: 'light',
    Provider: ThemeProvider,
    GlobalStyles,
  }),
  (Story) => (
    <Provider store={store}>
      <Story />
    </Provider>
  ),
]

export default preview;
