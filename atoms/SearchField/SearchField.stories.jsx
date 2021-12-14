import React, { useState } from 'react';

import PreviewWindow from '../PreviewWindow';

import { SearchField as Component } from '..';

export default {
  title: 'ATOMS/SearchField',
  component: Component,
  argTypes: {},
};

const Template = args => {
  const [value, setValue] = useState('');

  return (
    <PreviewWindow isTall>
      <Component
        {...args}
        value={value}
        onChange={({ value: val }) => setValue(val)}
      />
    </PreviewWindow>
  );
};

export const Basic = Template.bind({});
Basic.args = {
  onButtonClick: e => console.log(e),
  name: 'mysearch',
};
