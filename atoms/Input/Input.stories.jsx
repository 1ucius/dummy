import React, { useState } from 'react';

import { Input as Component, inputSizeMap } from '..';

import PreviewWindow from '../PreviewWindow';

import { getJSMapKeysArray } from '../../cssMaps';

export default {
  title: 'ATOMS/Input',
  component: Component,
  argTypes: {
    size: {
      options: getJSMapKeysArray(inputSizeMap),
    },
    value: {
      control: null,
    },
  },
};

const Template = args => {
  const [value, setValue] = useState(null);

  return (
    <PreviewWindow>
      <Component
        {...args}
        value={value}
        onChange={({ value: val }) => setValue(val)}
      />
    </PreviewWindow>
  );
};

export const Input = Template.bind({});
Input.args = { placeholder: 'My input', name: 'myinput' };

export const InputSmall = Template.bind({});
InputSmall.args = { placeholder: 'My input', name: 'myinput', size: 'small' };

export const InputDisabled = Template.bind({});
InputDisabled.args = {
  placeholder: 'My input',
  name: 'myinputdisabled',
  disabled: true,
};

export const InputSuccess = Template.bind({});
InputSuccess.args = {
  placeholder: 'My input',
  name: 'myinputsuccess',
  success: true,
};

export const InputError = Template.bind({});
InputError.args = {
  placeholder: 'My input',
  name: 'myinputerror',
  error: true,
};
