import React from 'react';
import * as yup from 'yup';

import isEmpty from 'lodash.isempty';

import FormField from '../FormField';
import FormRow from '../containers/Row';
import FormFooter from '../containers/Footer';

import { Flex, FlexItem } from '../../Flex';

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

  const invalid = !isEmpty(getErrors(['name', 'single', 'multiple']));

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
            message: 'Please confirm your password',
          }}
          inputProps={{
            placeholder: 'Confirm password',
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

export const matchingSteps = [Step];

export const matchingSchemas = [
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

export const matchingInitialValues = {
  password: null,
  passwordConfirm: null,
};
