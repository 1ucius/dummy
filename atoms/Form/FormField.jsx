import React from 'react';
import PropTypes from 'prop-types';

import { Field } from '../Field';
import { Input } from '../Input';
import { Checkbox } from '../Checkbox';
import Select from '../Select';

import { useForm } from './FormContext';

import { inputTypes } from '../../constants';

const FormField = ({ name, type, isRequired, fieldProps, inputProps }) => {
  const data = useForm();

  const { values, setFieldValue, errors } = data;

  const setValue = React.useCallback(
    ({ value: val }) => {
      setFieldValue(name, val);
    },
    [name]
  );

  const getComponent = React.useCallback(() => {
    switch (type) {
      case inputTypes.TEXTINPUT:
      case inputTypes.NUMINPUT:
        return (
          <Input
            name={name}
            type={type}
            value={values[name]}
            onChange={setValue}
            fluid
            {...inputProps}
          />
        );
      case inputTypes.CHECKBOX:
        return (
          <Checkbox
            checked={values[name]}
            onChange={setValue}
            name={name}
            {...inputProps}
          />
        );
      case inputTypes.SELECT:
        return (
          <Select
            name={name}
            type={type}
            value={values[name]}
            onChange={setValue}
            fluid
            {...inputProps}
          />
        );
      default:
        return (
          <Input
            name={name}
            type={type}
            value={values[name]}
            onChange={setValue}
            fluid
            {...inputProps}
          />
        );
    }
  }, [type, name, values, inputProps]);

  return (
    <Field
      name={name}
      type={type}
      isRequired={isRequired}
      errors={errors}
      {...fieldProps}
    >
      {getComponent()}
    </Field>
  );
};

FormField.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  fieldProps: PropTypes.shape({}),
  inputProps: PropTypes.shape({}),
};

FormField.defaultProps = {
  isRequired: false,
  fieldProps: {},
  inputProps: {},
};

export default FormField;
