import React from 'react';
import BeatLoader from './beatLoader'
import { LoaderSizeMarginProps } from 'react-spinners/helpers/props';
import type { Meta, StoryObj } from '@storybook/react'

export default {
  title: 'Example/BeatLoader',
  component: BeatLoader,
  argTypes: {
    color: { control: 'color' },
    size: { control: 'number' },
    margin: { control: 'number' },
  },
} as Meta<typeof BeatLoader>

type Story = StoryObj<typeof BeatLoader>

export const Default: Story = {
  args: {
    size: 10,
    margin: 2,
    color: '#ffffff',
  },
}
