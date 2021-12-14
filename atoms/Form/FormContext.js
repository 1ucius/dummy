import React, { createContext, useContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { useFormik } from 'formik';

import isEqual from 'lodash.isequal';

import isEmpty from 'lodash.isempty';

export const FormContext = createContext();

export const FormContextProvider = ({ children, value }) => {
  const [step, setStep] = useState(0);

  const {
    steps,
    initialValues,
    validationSchemas,
    validateOnChange,
    onSubmit,
  } = value;

  const {
    handleSubmit,
    handleReset,
    handleBlur,
    values,
    isValid,
    isSubmitting,
    setSubmitting,
    isValidating,
    dirty,
    validateForm,
    errors,
    handleChange,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues,
    onSubmit: (values, formikBag) => {
      if (step === steps.length - 1) {
        console.log("Congrats! You've passed the validation", { formikBag });

        return (() => {
          onSubmit(values);
        })();
      }

      setStep(st => ++st);
    },
    enableReinitialize: true,
    validateOnChange,
    validationSchema: validationSchemas[step],
  });

  const getChangedFields = useCallback(() => {
    const changes = Object.entries(values);

    return changes
      .filter(change => {
        return !isEqual(change[1], initialValues[change[0]]);
      })
      .map(change => ({
        current: change,
        initial: initialValues[change[0]],
      }));
  }, [values, initialValues]);

  const getErrors = React.useCallback(
    keysArray => {
      return keysArray.map(key => errors[key]).filter(val => !!val);
    },
    [errors]
  );

  const hasErrors = !isEmpty(errors);

  return (
    <FormContext.Provider
      value={{
        ...value,
        steps,
        step,
        setStep,
        handleSubmit,
        handleReset,
        handleBlur,
        values,
        initialValues,
        validationSchemas,
        isValid,
        isSubmitting,
        setSubmitting,
        isValidating,
        dirty,
        validateForm,
        errors,
        hasErrors,
        getErrors,
        handleChange,
        setFieldValue,
        resetForm,
        getChangedFields,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

FormContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  value: PropTypes.shape({
    /**
     * Array of Components representing form steps.
     */
    steps: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.node, PropTypes.func])
    ).isRequired,
    /**
     * Array of validation schemas (using Yup).
     */
    validationSchemas: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    /**
     * Callback fired when form is successfully validated and submitted.
     */
    onSubmit: PropTypes.func.isRequired,
    /**
     * Object of initial field values.
     */
    initialValues: PropTypes.shape({}),
    /**
     * Define if form should run validation after each change.
     */
    validateOnChange: PropTypes.bool,
  }),
};

FormContextProvider.defaultProps = {
  value: { initialValues: {}, validateOnChange: true },
};

export function useForm() {
  return useContext(FormContext);
}
