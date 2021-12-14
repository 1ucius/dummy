import React from 'react';

import FormContent from './containers/Content';

import { useForm } from './FormContext';

import styles from './Form.module.css';

const FormElement = () => {
  const { step, steps, values, handleSubmit, style } = useForm();

  const getStep = React.useCallback(() => {
    const Step = steps[step];

    return <Step />;
  }, [steps, step]);

  return (
    values && (
      <form className={styles.Form} onSubmit={handleSubmit} style={style}>
        <FormContent>{getStep()}</FormContent>
      </form>
    )
  );
};

export default FormElement;
