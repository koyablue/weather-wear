// DOCS:
// https://storybook.js.org/recipes/styled-components
// https://storybook.js.org/docs/react/configure/typescript
// https://storybook.js.org/recipes/next

import type { StorybookConfig } from '@storybook/nextjs'
const config: StorybookConfig = {
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)', '../**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-styling', // Add color theme toggle feature to storybook view
  ],
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['../public'],
}

export default config
