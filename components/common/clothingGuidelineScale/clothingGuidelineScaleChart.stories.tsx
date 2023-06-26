import type { Meta, StoryObj } from '@storybook/react'
import ClothingGuidelineScaleChart from './clothingGuidelineScaleChart'

import { ClothingGuidelineScale } from '../../../types/clothingGuidelineScale'

import { getColorByClothingGuidelineScale } from '../../../services/clothingGuidelineScale'

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
  },
} as Meta<typeof ClothingGuidelineScaleChart>

type Story = StoryObj<typeof ClothingGuidelineScaleChart>

export const LightTheme: Story = {
  args: {
    scale: 3,
    itemCount: 5,
  },
}

