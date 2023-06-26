import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import BeatLoader from './beatLoader'

import { LoaderSizeMarginProps } from 'react-spinners/helpers/props';

import type { Meta, StoryObj } from '@storybook/react'

// export default {
//   title: 'Example/BeatLoader',
//   component: BeatLoader,
//   argTypes: {
//     color: { control: 'color' },
//     size: { control: 'number' },
//     margin: { control: 'number' },
//   },
// } as ComponentMeta<typeof BeatLoader>;
export default {
  title: 'Example/BeatLoader',
  component: BeatLoader,
  argTypes: {
    color: { control: 'color' },
    size: { control: 'number' },
    margin: { control: 'number' },
  },
} as Meta<typeof BeatLoader>;

type Story = StoryObj<typeof BeatLoader>;


// const Template: ComponentStory<typeof BeatLoader> = (args) => <BeatLoader {...args} />;
// const Template: Story = (args) => <BeatLoader {...args} />;


export const Default: Story = {
  args: {
    size: 10,
    margin: 2,
    color: '#ffffff',
  },
};



// import React from 'react';
// import { Story, Meta } from '@storybook/react/types-6-0';
// import { LoaderSizeMarginProps } from 'react-spinners/helpers/props';

// import Loader from './BeatLoader';

// export default {
//   title: 'Components/Loader',
//   component: Loader,
//   argTypes: {
//     color: { control: 'color' },
//     size: { control: 'number' },
//     margin: { control: 'number' },
//   },
// } as Meta;

// const Template: Story<LoaderSizeMarginProps> = (args) => <Loader {...args} />;

// export const Default = Template.bind({});
// Default.args = {
//   size: 10,
//   margin: 2,
//   color: '#ffffff',
// };

// export { Default };