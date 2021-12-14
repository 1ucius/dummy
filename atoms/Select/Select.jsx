import React, { forwardRef } from 'react';

import PropTypes from 'prop-types';

import SelectElement from './SelectElement';
import SelectPopper from './SelectPopper';

import { SelectContextProvider } from './SelectContext';

import { getJSMapKeysArray } from '../../cssMaps';

import { allowNull } from '../../helpers';

export const selectSizeMap = {
  small: 'small',
  normal: 'normal',
};

const Select = forwardRef(function Select(
  {
    value,
    options,
    placeholder,
    multiple,
    search,
    size,
    rounded,
    invisible,
    isNullable,
    onSearchChange,
    onChange,
    ...rest
  },
  ref
) {
  return (
    <SelectContextProvider
      value={{
        value,
        options,
        placeholder,
        multiple,
        search,
        size,
        rounded,
        invisible,
        isNullable,
        onSearchChange,
        onChange,
        ...rest,
      }}
    >
      <SelectElement />
      <SelectPopper />
    </SelectContextProvider>
  );
});

Select.propTypes = {
  /**
   * Choose size preset of the Select. Possible values:
   */
  size: PropTypes.oneOf(getJSMapKeysArray(selectSizeMap)),
  /**
   * Value of Select.
   */
  value: allowNull(
    PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string, PropTypes.number])
  ),
  /**
   * Options available to select.
   */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.shape({}),
      ]).isRequired,
    })
  ).isRequired,
  /**
   * Callback fired when value of Select changes.
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Additional class names.
   */
  className: PropTypes.string,
  /**
   * Additional class names for Input field rendered if search option is true.
   */
  inputClassName: PropTypes.string,
  /**
   * Placeholder.
   */
  placeholder: PropTypes.string,
  /**
   * Set if selecting multiple options should be possible. Possible values: true | false
   */
  multiple: PropTypes.bool,
  /**
   * Should user be able to search for options. Possible values: true | false
   */
  search: PropTypes.bool,
  /**
   * Should Select have rounded corners. Possible values: true | false
   */
  rounded: PropTypes.bool,
  /**
   *  Remove select element styling. Possible values: true | false
   */
  invisible: PropTypes.bool,
  /**
   *  Defines whether value can be nullified. Possible values: true | false
   */
  isNullable: PropTypes.bool,
  /**
   * callback fired when search string is changed.
   */
  onSearchChange: PropTypes.func,
};

Select.defaultProps = {
  value: null,
  rounded: true,
  multiple: false,
  search: false,
  placeholder: 'Select Option(s)',
  size: 'normal',
  className: null,
  inputClassName: null,
  invisible: false,
  isNullable: true,
  onSearchChange: () => {},
};

export default Select;
