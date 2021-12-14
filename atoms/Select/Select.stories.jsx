import * as React from 'react';

import { Select as Component } from '..';

import PreviewWindow from '../PreviewWindow';

import { selectSizeMap } from './Select';

import { getJSMapKeysArray } from '../../cssMaps';

export default {
  title: 'ATOMS/Select',
  component: Component,
  argTypes: {
    size: {
      options: getJSMapKeysArray(selectSizeMap),
    },
    value: {
      control: null,
    },
  },
};

const options = [
  {
    label: 'Option 1',
    value: 'option 1',
  },
  {
    label: 'Long label for Option 2',
    value: 'option 2',
  },
  {
    label: 'Option 3',
    value: 'option 3',
  },
  {
    label: 'Option 4',
    value: 'option 4',
  },
  {
    label: 'Option 5',
    value: 'option 5',
  },
  {
    label: 'Option 6',
    value: 'option 6',
  },
  {
    label: 'Option 7',
    value: 'option 7',
  },
  {
    label: 'Option 8',
    value: 'option 8',
  },
];

const Template = args => {
  const [value, setValue] = React.useState(null);

  const { isInProgress } = args;

  return (
    <PreviewWindow isInProgress={isInProgress}>
      <div style={{ width: 280 }}>
        <Component
          {...args}
          value={value}
          onChange={({ value: val }) => setValue(val)}
        />
      </div>
    </PreviewWindow>
  );
};

export const Select = Template.bind({});
Select.args = {
  placeholder: 'Pls select smth',
  name: 'myselect',
  options,
  isInProgress: true,
};

export const SelectMultiple = Template.bind({});
SelectMultiple.args = {
  placeholder: 'Pls select smth',
  name: 'myselect',
  multiple: true,
  options,
  isInProgress: true,
};

export const SelectSearch = Template.bind({});
SelectSearch.args = {
  placeholder: 'Pls select smth',
  name: 'myselect',
  search: true,
  options,
  isInProgress: true,
};

export const SelectSearchMultiple = Template.bind({});
SelectSearchMultiple.args = {
  placeholder: 'Pls select smth',
  name: 'myselect',
  multiple: true,
  search: true,
  options,
  isInProgress: true,
};

export const SelectNoOptions = Template.bind({});
SelectNoOptions.args = {
  placeholder: 'Pls select smth',
  name: 'myselect',
  options: [],
};
