import React from 'react';
import * as yup from 'yup';

import isEmpty from 'lodash.isempty';

import FormField from '../FormField';
import FormRow from '../containers/Row';
import FormHeader from '../containers/Header';
import FormFooter from '../containers/Footer';

import { Flex, FlexItem } from '../../Flex';

import { Typo } from '../../Typo';

import Button from '../../Button';

import { useForm } from '../FormContext';

import { inputTypes } from '../../../constants';

export const Step = () => {
  const { hasErrors, getErrors, isSubmitting, setSubmitting } = useForm();

  React.useEffect(() => {
    let timeout;

    if (isSubmitting) {
      timeout = setTimeout(() => setSubmitting(false), 1000);
    }

    return () => {
      clearTimeout(timeout);
      setSubmitting(false);
    };
  }, [isSubmitting]);

  const invalid = !isEmpty(getErrors(['name', 'single', 'multiple', 'flag']));

  return (
    <Flex direction='column' skipWrapper>
      <FlexItem as={FormHeader} grow basis='1'>
        <Typo preset='heading2' label='Example form' />
      </FlexItem>
      <FlexItem as={FormRow} grow basis='1'>
        <FormField
          name='name'
          isRequired
          type={inputTypes.TEXTINPUT}
          fieldProps={{
            label: 'Name',
            direction: 'column',
          }}
          inputProps={{
            placeholder: 'Your name',
          }}
        />
      </FlexItem>
      <FlexItem as={FormRow} grow basis='1'>
        <FormField
          name='single'
          isRequired
          type={inputTypes.SELECT}
          fieldProps={{
            label: 'Single',
            direction: 'column',
          }}
          inputProps={{
            placeholder: 'Select single option',
            options: [
              {
                label: 'Value 1',
                value: 'value1',
              },
              {
                label: 'Value 2 with long label',
                value: 'value2',
              },
            ],
          }}
        />
      </FlexItem>
      <FlexItem as={FormRow} grow basis='1'>
        <FormField
          name='multiple'
          isRequired
          type={inputTypes.SELECT}
          fieldProps={{
            label: 'Multiple',
            direction: 'column',
          }}
          inputProps={{
            placeholder: 'Select multiple options',
            options: [
              {
                label: 'Value 1',
                value: 'value1',
              },
              {
                label: 'Value 2 with long label',
                value: 'value2',
              },
            ],
            multiple: true,
          }}
        />
      </FlexItem>
      <FlexItem as={FormRow} grow basis='1'>
        <FormField
          name='flag'
          type={inputTypes.CHECKBOX}
          fieldProps={{
            direction: 'column',
          }}
          inputProps={{
            size: 'small',
            label: 'Flag',
          }}
        />
      </FlexItem>
      <FlexItem as={FormFooter} grow basis='1'>
        <Button
          type='submit'
          label='Submit'
          fluid
          disabled={(hasErrors && invalid) || isSubmitting}
        />
      </FlexItem>
    </Flex>
  );
};

export const basicSteps = [Step];

export const basicSchemas = [
  yup.object({
    name: yup
      .string()
      .min(1, 'Value is too short')
      .required('This field is required')
      .nullable(),
    single: yup.string().required('This field is required').nullable(),
    multiple: yup
      .array()
      .required('At least one item should be selected')
      .nullable(),
    flag: yup.bool(),
  }),
];

export const basicInitialValues = {
  name: null,
  single: [],
  multiple: [],
  flag: true,
};
