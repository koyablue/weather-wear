import type { Meta, StoryObj } from '@storybook/react'

// svgs
// import TankTop  from '../../public/images/svgs/tank-top.svg';
// import TShirt from '../../public/images/svgs/t-shirt.svg';
// import LongSleeve from '../../public/images/svgs/long-sleeve.svg';
// import Hoodie from '../../public/images/svgs/hoodie.svg';
// import PufferJacket from '../../public/images/svgs/puffer-jacket.svg';

import ClothesIcon from './clothesIcon'


type ClothesIconProps = Parameters<typeof ClothesIcon>[0]

export default {
  title: 'ClothingGuideline/ClothesIcon',
  component: ClothesIcon,
  argTypes: {
    scale: {
      options: [0, 1, 2, 3, 4, 5],
      control: {
        type: 'select',
      }
    },
    svgProps: {
      control: {
        type: 'object',
      },
    },
  },
} as Meta<ClothesIconProps>

type Story = StoryObj<ClothesIconProps>

export const Default: Story = {
  args: {
    scale: 3,
    svgProps: {
      fill: '#333333',
      height: 150,
      width: 150,
    }
  }
}


