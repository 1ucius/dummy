import React from 'react';

import PreviewWindow from '../PreviewWindow';

import { Checkbox as Component, checkboxSizeMap } from '..';

import * as icons from '../icons';

import { getJSMapKeysArray } from '../../cssMaps';
import { getComponentsMap } from '../../helpers';

export default {
  title: 'ATOMS/Checkbox',
  component: Component,
  argTypes: {
    checked: {
      control: null,
    },
    icon: {
      options: getComponentsMap(icons, true),
    },
    size: {
      options: getJSMapKeysArray(checkboxSizeMap),
    },
  },
};

const Template = args => {
  const { checked: isChecked } = args;

  const [checked, setChecked] = React.useState(isChecked ?? false);

  return (
    <PreviewWindow>
      <Component
        {...args}
        onChange={({ value }) => {
          setChecked(value);
        }}
        checked={checked}
      />
    </PreviewWindow>
  );
};

export const CheckboxNormal = Template.bind({});
CheckboxNormal.args = {
  size: 'normal',
  icon: 'CheckIcon',
};

export const CheckboxSmall = Template.bind({});
CheckboxSmall.args = {
  size: 'small',
  icon: 'CheckIcon',
};
