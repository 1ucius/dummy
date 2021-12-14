import React from 'react';

import { ProgressBar as Component } from '.';

import PreviewWindow from '../PreviewWindow';

export default {
  title: 'ATOMS/ProgressBar',
  component: Component,
  argTypes: {
    value: {
      defaultValue: 70,
    },
    max: {
      defaultValue: 100,
    },
    className: {
      defaultValue: '',
    },
  },
};

const Template = args => (
  <PreviewWindow>
    <div style={{ width: '280px' }}>
      <Component {...args} />
    </div>
  </PreviewWindow>
);

export const ProgressBar = Template.bind({});
ProgressBar.args = {};

export const ProgressBarNoUnit = Template.bind({});
ProgressBarNoUnit.args = { noUnit: true };

export const ProgressBarNoTitle = Template.bind({});
ProgressBarNoTitle.args = { useTitle: false };
