import React from 'react';

import PreviewWindow from '../PreviewWindow';

import { Separator as Component } from '.';

export default {
  title: 'ATOMS/Separator',
  component: Component,
  argTypes: {},
};

const Template = args => (
  <PreviewWindow>
    <Component {...args} />
  </PreviewWindow>
);

export const Horizontal = Template.bind({});
Horizontal.args = {};

export const Vertical = Template.bind({});
Vertical.args = {
  isVertical: true,
};
