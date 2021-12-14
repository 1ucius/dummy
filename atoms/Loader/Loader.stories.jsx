import React from 'react';

import { Loader as Component } from '.';

import PreviewWindow from '../PreviewWindow';

export default {
  title: 'ATOMS/Loader',
  component: Component,
  argTypes: {
    alt: {
      defaultValue: 'Loading...',
    },
    className: {
      defaultValue: '',
    },
  },
};

const Template = args => (
  <PreviewWindow>
    <Component {...args} />
  </PreviewWindow>
);

export const Loader = Template.bind({});
Loader.args = {};

export const LoaderWithBackdrop = Template.bind({});
LoaderWithBackdrop.args = { useBackdrop: true };
