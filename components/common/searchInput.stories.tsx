import React from 'react';
import { StoryObj, Meta } from '@storybook/react';

import SearchInput from './searchInput'

// TODO: [WIP]
// TODO: need to improve

type SearchInputProps = Parameters<typeof SearchInput>[0]

export default {
  title: 'Components/SearchInput',
  component: SearchInput,
} as Meta;

type Story = StoryObj<SearchInputProps>

export const Default: Story = {
  args: {
    defaultCityName: 'New York',
  }
}