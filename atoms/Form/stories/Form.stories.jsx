import React from 'react';

import PreviewWindow from '../../PreviewWindow';

import { Form as Component } from '..';

import {
  multiSteps,
  multiStepSchemas,
  multiStepInitialValues,
} from './Multistep';

import { basicSteps, basicSchemas, basicInitialValues } from './Basic';

import {
  matchingSteps,
  matchingSchemas,
  matchingInitialValues,
} from './Matching';

export default {
  title: 'ATOMS/Form',
  component: Component,
  argTypes: {
    steps: {
      control: null,
    },
    validationSchemas: {
      control: null,
    },
  },
};

const Template = args => (
  <PreviewWindow isInProgress isTall>
    <Component {...args} style={{ width: '280px', maxWidth: '100%' }} />
  </PreviewWindow>
);

export const FormBasic = Template.bind({});
FormBasic.args = {
  steps: basicSteps,
  validationSchemas: basicSchemas,
  initialValues: basicInitialValues,
  onSubmit: x => {
    alert(`SUCCESS! Form data: ${JSON.stringify(x, null, 2)}`);
  },
};

export const MatchingFieldsForm = Template.bind({});
MatchingFieldsForm.args = {
  steps: matchingSteps,
  validationSchemas: matchingSchemas,
  initialValues: matchingInitialValues,
  onSubmit: x => {
    alert(`SUCCESS! Form data: ${JSON.stringify(x, null, 2)}`);
  },
};

export const MultistepForm = Template.bind({});
MultistepForm.args = {
  steps: multiSteps,
  validationSchemas: multiStepSchemas,
  initialValues: multiStepInitialValues,
  onSubmit: x => {
    alert(`SUCCESS! Form data: ${JSON.stringify(x, null, 2)}`);
  },
};
