import * as React from 'react';

import { TextArea as Component } from '.';

import PreviewWindow from '../PreviewWindow';

export default {
  title: 'ATOMS/TextArea',
  component: Component,
  argTypes: {
    value: {
      control: null,
    },
  },
};

const Template = args => {
  return (
    <PreviewWindow>
      <div style={{ width: 280 }}>
        <Component {...args} />
      </div>
    </PreviewWindow>
  );
};

export const TextArea = Template.bind({});
TextArea.args = {
  placeholder: 'My Text Area',
  name: 'mytextarea',
};

export const TextAreaDisabled = Template.bind({});
TextAreaDisabled.args = {
  placeholder: 'My Text Area',
  name: 'mytextareadisabled',
  disabled: true,
};

export const TextAreaSuccess = Template.bind({});
TextAreaSuccess.args = {
  placeholder: 'My Text Area',
  name: 'mytextareasuccess',
  success: true,
};

export const TextAreaError = Template.bind({});
TextAreaError.args = {
  placeholder: 'My Text Area',
  name: 'mytextareaerror',
  error: true,
};
