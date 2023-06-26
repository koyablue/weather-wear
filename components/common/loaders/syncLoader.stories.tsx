import React from 'react';
import SyncLoader from './syncLoader'
import { LoaderSizeMarginProps } from 'react-spinners/helpers/props';
import type { Meta, StoryObj } from '@storybook/react'

export default {
  title: 'Loaders/SyncLoader',
  component: SyncLoader,
  argTypes: {
    color: { control: 'color' },
    size: { control: 'number' },
    margin: { control: 'number' },
  },
} as Meta<typeof SyncLoader>

type Story = StoryObj<typeof SyncLoader>

export const Default: Story = {
  args: {
    size: 10,
    margin: 2,
    color: '#333333',
  },
}
