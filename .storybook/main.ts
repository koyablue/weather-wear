// DOCS:
// https://storybook.js.org/recipes/styled-components
// https://storybook.js.org/docs/react/configure/typescript
// https://storybook.js.org/recipes/next
// https://zenn.dev/yogarasu/scraps/ced566824f0842

import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)', '../**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-styling', // Add color theme toggle feature to storybook view
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['../public'],
}

export default config
