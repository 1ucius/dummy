import React from 'react';

import PreviewWindow from '../PreviewWindow';

import { getJSMapKeysArray, spacingMap } from '../../cssMaps';

import { Flex as Component, Typo } from '..';

export default {
  title: 'ATOMS/Flex',
  component: Component,
  argTypes: {
    as: {
      control: null,
    },
    gap: {
      options: getJSMapKeysArray(spacingMap),
    },
    childen: {
      control: null,
    },
  },
};

const Template = args => (
  <PreviewWindow>
    <Component {...args}>
      <div flex={{ basis: '3', key: 1 }}>{1}</div>
      <Component direction='column' flex={{ basis: '2', grow: true }}>
        <div flex={{ basis: '2', key: 2, grow: true }}>{2}</div>
        <div flex={{ basis: '2', key: 3, grow: true }}>{3}</div>
        <Typo label='Label' />
      </Component>
    </Component>
  </PreviewWindow>
);

export const Flex = Template.bind({});
Flex.args = {
  direction: 'row',
  justifyContent: 'start',
  alignItems: 'start',
};
