import React from 'react';

import PreviewWindow from '../PreviewWindow';

import { Surface } from '..';

export default {
  title: 'ATOMS/Surface',
  component: Surface,
  argTypes: {
    level: {
      defaultValue: 'level1',
    },
    as: {
      defaultValue: 'div',
    },
  },
};

const Template = args => (
  <PreviewWindow level='level0'>
    <Surface {...args} />
  </PreviewWindow>
);

export const Level1 = Template.bind({});
Level1.args = { level: 'level1' };

export const Level2 = Template.bind({});
Level2.args = { level: 'level2' };

export const Level3 = Template.bind({});
Level3.args = { level: 'level3' };

export const Level4 = Template.bind({});
Level4.args = { level: 'level4' };

export const Level5 = Template.bind({});
Level5.args = {
  level: 'level5',
};
