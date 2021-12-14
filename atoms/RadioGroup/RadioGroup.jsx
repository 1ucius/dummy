import * as React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import { Flex } from '../Flex';

import RadioGroupContext from './RadioGroupContext';

import styles from './RadioGroup.module.css';

const RadioGroup = React.forwardRef(function RadioGroup(
  { name, value, onChange, className, children },
  ref
) {
  return (
    <RadioGroupContext.Provider value={{ name, value, onChange }}>
      <Flex
        justifyContent='center'
        className={classnames(styles.RadioGroup, className)}
        ref={ref}
        skipWrapper
      >
        <Flex className={classnames(styles.RadioContainer)} gap='4xs'>
          {children}
        </Flex>
      </Flex>
    </RadioGroupContext.Provider>
  );
});

RadioGroup.defaultProps = {
  className: '',
  name: '',
  children: null,
};

RadioGroup.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  children: PropTypes.node,
  onChange: PropTypes.func.isRequired,
};

export default RadioGroup;
