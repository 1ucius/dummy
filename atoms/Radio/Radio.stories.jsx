import * as React from 'react';

import PreviewWindow from '../PreviewWindow';

import { Radio, RadioGroup as Component } from '..';

export default {
  title: 'ATOMS/Radio',
  component: Component,
  argTypes: {},
};

const options = [
  {
    label: 'Locations',
    value: 'option 1',
  },
  {
    label: 'Groups',
    value: 'option 2',
  },
  {
    label: 'Access to pages',
    value: 'option 3',
  },
];

const Template = args => {
  const [val, setVal] = React.useState('option 1');

  return (
    <PreviewWindow>
      <div style={{ width: 360 }}>
        <Component
          {...args}
          name='radioexample'
          value={val}
          onChange={value => setVal(value)}
        >
          {options.map(option => (
            <Radio
              key={option.label}
              name={option.label}
              value={option.value}
              label={option.label}
              flex={{ shrink: true }}
            />
          ))}
        </Component>
      </div>
    </PreviewWindow>
  );
};

export const RadioGroup = Template.bind({});
RadioGroup.args = {};
