import React from 'react';
import * as yup from 'yup';

import isEmpty from 'lodash.isempty';

import FormField from '../FormField';
import FormRow from '../containers/Row';
import FormFooter from '../containers/Footer';
import FormHeader from '../containers/Header';

import { Flex, FlexItem } from '../../Flex';

import Button from '../../Button';

import { Typo } from '../../Typo';

import { useForm } from '../FormContext';

import { inputTypes } from '../../../constants';

export const MultiStep1 = () => {
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
            message: 'Please enter your first name',
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
            message: 'Select single option',
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
            message: 'Select multiple options',
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
            message: 'Select true/false',
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
          label='Next'
          fluid
          disabled={(hasErrors && invalid) || isSubmitting}
        />
      </FlexItem>
    </Flex>
  );
};

export const MultiStep2 = () => {
  const { hasErrors, getErrors, isSubmitting, setStep } = useForm();

  const invalid = !isEmpty(getErrors(['password', 'passwordConfirm']));

  return (
    <Flex direction='column' skipWrapper>
      <FlexItem as={FormRow} grow basis='1'>
        <FormField
          name='password'
          isRequired
          type={inputTypes.PASSWORD}
          fieldProps={{
            label: 'Password',
            direction: 'column',
            message: 'Please enter your password',
          }}
          inputProps={{
            placeholder: 'Password',
          }}
        />
      </FlexItem>
      <FlexItem as={FormRow} grow basis='1'>
        <FormField
          name='passwordConfirm'
          isRequired
          type={inputTypes.PASSWORD}
          fieldProps={{
            label: 'Confirm password',
            direction: 'column',
            message: 'Please enter your password',
          }}
          inputProps={{
            placeholder: 'Confirm password',
          }}
        />
      </FlexItem>
      <FlexItem as={FormFooter} grow basis='1'>
        <Flex gap='m' skipWrapper>
          <FlexItem basis='2'>
            <Button
              preset='secondary'
              onClick={() => setStep(st => --st)}
              label='back'
              noMinWidth
              fluid
            />
          </FlexItem>
          <FlexItem basis='2'>
            <Button
              type='submit'
              label='Submit'
              disabled={(hasErrors && invalid) || isSubmitting}
              noMinWidth
              fluid
            />
          </FlexItem>
        </Flex>
      </FlexItem>
    </Flex>
  );
};

export const multiStepSchemas = [
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
  yup.object({
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password should have at least 6 characters')
      .nullable()
      .required(),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords do not match')
      .nullable()
      .required('Password confirmation is required'),
  }),
];

export const multiStepInitialValues = {
  name: null,
  single: null,
  multiple: null,
  flag: true,
  password: null,
  passwordConfirm: null,
};

export const multiSteps = [MultiStep1, MultiStep2];
