import React from 'react';

import PreviewWindow from '../PreviewWindow';

import { Chip as Component } from '..';

export default {
  title: 'ATOMS/Chip',
  component: Component,
  argTypes: {
    as: {
      control: null,
    },
    icon: {
      control: null,
    },
  },
};

const Template = args => (
  <PreviewWindow>
    <Component {...args} />
  </PreviewWindow>
);

export const Chip = Template.bind({});
Chip.args = {
  label: 'Some text',
  tooltip: false,
};

export const ChipOverflow = Template.bind({});
ChipOverflow.args = {
  as: 'div',
  label: 'Some text that is toooooooooooooo loooooooong to fit',
  tooltip: true,
  onClick: () => console.log('Chip cross click'),
};
