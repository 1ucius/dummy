import React from 'react';

import { Scrollbar as Component, sizeMap } from '.';

import PreviewWindow from '../PreviewWindow';

import { getJSMapKeysArray } from '../../cssMaps';

import text from './text';

export default {
  title: 'ATOMS/Scrollbar',
  component: Component,
  argTypes: {
    size: {
      options: getJSMapKeysArray(sizeMap),
    },
    children: {
      control: null,
    },
  },
};

const Template = args => (
  <PreviewWindow>
    <div style={{ height: '100%', width: '100%' }}>
      <Component {...args}>{text}</Component>
    </div>
  </PreviewWindow>
);

export const ScrollbarDefault = Template.bind({});
ScrollbarDefault.args = {};

export const ScrollbarMedium = Template.bind({});
ScrollbarMedium.args = { size: 'medium' };

export const ScrollbarLarge = Template.bind({});
ScrollbarLarge.args = { size: 'large' };
