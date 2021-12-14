import * as React from 'react';

import PreviewWindow from '../PreviewWindow';

import {
  Field as Component,
  fieldDirectionMap,
  Input,
  Select,
  Checkbox,
} from '..';

import { getJSMapKeysArray } from '../../cssMaps';

export default {
  title: 'ATOMS/Field',
  component: Component,
  argTypes: {
    as: {
      control: null,
    },
    children: {
      control: null,
    },
    errors: {
      control: null,
    },
    direction: {
      options: getJSMapKeysArray(fieldDirectionMap),
    },
  },
};

const Template = args => {
  const [value, setValue] = React.useState(null);

  const { name, label, as: Child, isCheckbox, ...rest } = args;

  return (
    <PreviewWindow>
      <div style={{ width: '280px', maxWidth: '100%' }}>
        <Component
          name={name}
          label={isCheckbox ? null : label}
          {...rest}
          style={{ maxWidth: '100%' }}
        >
          <Child
            name={name}
            onChange={({ value: val }) => {
              setValue(val);
            }}
            value={value}
            label={!isCheckbox ? null : label}
            checked={!!value}
            placeholder={label}
          />
        </Component>
      </div>
    </PreviewWindow>
  );
};

export const FieldBasic = Template.bind({});
FieldBasic.args = {
  name: 'xxx',
  label: 'Basic',
  message: 'Message',
  errors: {
    xxx: ['Error 1', 'Error 2'],
  },
  direction: 'column',
  as: props => <Input fluid {...props} />,
};

export const FieldInput = Template.bind({});
FieldInput.args = {
  name: 'xxx',
  label: 'Label',
  message: 'Message',
  errors: {
    xxx: ['Error 1', 'Error 2'],
  },
  direction: 'column',
  as: props => <Input fluid {...props} />,
};

export const FieldSelect = Template.bind({});
FieldSelect.args = {
  name: 'xxx',
  label: 'Label',
  message: 'Message',
  errors: {
    xxx: ['Error 1', 'Error 2'],
  },
  direction: 'column',
  as: props => (
    <Select
      options={[
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
      ]}
      {...props}
    />
  ),
};

export const FieldSelectMultiple = Template.bind({});
FieldSelectMultiple.args = {
  name: 'xxx',
  label: 'Label',
  message: 'Message',
  errors: {
    xxx: ['Error 1', 'Error 2'],
  },
  direction: 'column',
  as: props => (
    <Select
      options={[
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
      ]}
      multiple
      {...props}
    />
  ),
};

export const FieldCheckbox = Template.bind({});
FieldCheckbox.args = {
  name: 'xxx',
  message: 'Message',
  label: 'Label',
  errors: {
    xxx: ['Error 1', 'Error 2'],
  },
  direction: 'column',
  isCheckbox: true,
  as: props => <Checkbox {...props} />,
};
