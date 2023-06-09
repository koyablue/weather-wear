import type { Meta, StoryObj } from '@storybook/react'
import ClothingGuidelineScaleChart from './clothingGuidelineScaleChart'

export default {
  title: 'ClothingGuideline/ClothingGuidelineScaleChart',
  component: ClothingGuidelineScaleChart,
  argTypes: {
    scale: {
      options: [0, 1, 2, 3, 4, 5],
      control: {
        type: 'select',
      }
    },
    itemCount: { control: 'number' },
    colorTheme: {
      control: { type: 'radio' },
      options: ['light', 'dark'],
    }
  },
} as Meta<typeof ClothingGuidelineScaleChart>

type Story = StoryObj<typeof ClothingGuidelineScaleChart>

export const Default: Story = {
  args: {
    scale: 3,
    itemCount: 5,
    colorTheme: 'light',
  },
}
