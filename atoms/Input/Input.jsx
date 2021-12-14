import * as React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import { getJSMapKeysArray } from '../../cssMaps';

import { isNull } from '../../helpers';

import styles from './Input.module.css';

export const sizeMap = {
  normal: styles.InputSizeNormal,
  small: styles.InputSizeSmall,
};

const Input = React.forwardRef(function Input(
  {
    value,
    id,
    type,
    name,
    size,
    rounded,
    className,
    onChange,
    onFocus,
    onBlur,
    error,
    success,
    disabled,
    invisible,
    fluid,
    ...rest
  },
  ref
) {
  const onValueChange = React.useCallback(
    e => {
      const { value: val } = e.target;

      onChange({ value: val, e });
    },
    [onChange, type]
  );

  const val = isNull(value) ? '' : value;

  return (
    <div className={classnames(styles.InputWrapper, fluid && styles.Fluid)}>
      <input
        ref={ref}
        name={name}
        id={id}
        type={type}
        className={classnames(
          styles.Input,
          sizeMap[size],
          rounded && styles.InputRounded,
          error && !disabled && styles.Error,
          success && !disabled && styles.Success,
          invisible && styles.InputInvisible,
          className
        )}
        onChange={e => onValueChange(e)}
        onFocus={onFocus}
        onBlur={onBlur}
        value={val}
        disabled={disabled}
        {...rest}
      />
    </div>
  );
});

Input.propTypes = {
  /**
   * Value for controlled Input.
   */
  value: PropTypes.string,
  /**
   * Additional class names
   */
  className: PropTypes.string,
  /**
   * ID to be assigned to Input.
   */
  id: PropTypes.string,
  /**
   * Set size preset of the Input. Possible values:
   */
  size: PropTypes.oneOf(getJSMapKeysArray(sizeMap)),
  /**
   * Name of the Input
   */
  name: PropTypes.string.isRequired,
  /**
   * Callback fired onChange.
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Callback fired onFocus.
   */
  onFocus: PropTypes.func,
  /**
   * Callback fired onBlur.
   */
  onBlur: PropTypes.func,
  /**
   * Set if Input should appear rounded. Possible values: true | false
   */
  rounded: PropTypes.bool,
  /**
   * Indicate if Input should apply error styles. Possible values: true | false
   */
  error: PropTypes.bool,
  /**
   * Indicate if Input should apply success styles. Possible values: true | false
   */
  success: PropTypes.bool,
  /**
   * Indicate if Input should appear disabled. Possible values: true | false
   */
  disabled: PropTypes.bool,
  /**
   * Remove styling of the Input so that only actual field is visible. Possible values: true | false
   */
  invisible: PropTypes.bool,
  /**
   * Define wether Input should occupy full width of the parent. Possible values: true | false
   */
  fluid: PropTypes.bool,
};

Input.defaultProps = {
  value: '',
  id: null,
  className: '',
  onFocus: () => {},
  onBlur: () => {},
  size: 'normal',
  rounded: true,
  error: false,
  success: false,
  disabled: false,
  invisible: false,
  fluid: false,
};

export default Input;
