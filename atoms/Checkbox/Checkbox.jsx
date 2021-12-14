import * as React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import * as icons from '../icons';

import { Flex, FlexItem } from '../Flex';

import { Typo } from '../Typo';

import { getJSMapKeysArray } from '../../cssMaps';
import { getComponentsMap } from '../../helpers';

import styles from './Checkbox.module.css';

export const checkboxSizeMap = {
  normal: 'normal',
  small: 'small',
};

const sizeToStylesMap = {
  normal: null,
  small: styles.Small,
};

const Checkbox = React.forwardRef(function Checkbox(
  {
    icon,
    id,
    name,
    label,
    checked,
    size,
    disabled,
    error,
    onChange,
    className,
  },
  ref
) {
  const checkboxRef = React.useRef(ref);

  const getIcon = React.useCallback(
    iconProps => {
      const IconComponent = icons[icon];

      return <IconComponent {...iconProps} />;
    },
    [icon]
  );

  const getLabel = React.useCallback(() => {
    const Component = label;

    return <Component />;
  }, [label]);

  return (
    <Flex gap='3xs' alignItems='center' skipWrapper>
      <FlexItem
        className={classnames(
          styles.Checkbox,
          sizeToStylesMap[size],
          checked && styles.Checked,
          disabled && styles.Disabled,
          error && styles.Error,
          className
        )}
      >
        <input
          ref={checkboxRef}
          id={id || name}
          type='checkbox'
          name={name}
          checked={checked}
          className={styles.CheckboxInput}
          onChange={e => onChange({ value: e.target.checked, e })}
        />
        {checked &&
          getIcon({
            color: disabled ? 'mediumGrey' : 'white',
            size: size === checkboxSizeMap.small ? 'extraTiny' : 'tiny',
          })}
      </FlexItem>
      {label && (
        <FlexItem>
          {typeof label === 'string' ? (
            <Typo preset='input' label={label} noUserSelect />
          ) : (
            getLabel()
          )}
        </FlexItem>
      )}
    </Flex>
  );
});

Checkbox.propTypes = {
  /**
   * ID for controlled Checkbox.
   */
  id: PropTypes.string,
  /**
   * Label for  Checkbox.
   */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  /**
   * Name for controlled Checkbox.
   */
  name: PropTypes.string.isRequired,
  /**
   * Defined if checkbox is checked.
   */
  checked: PropTypes.bool.isRequired,
  /**
   * Should Checkbox be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Defines whether error styles should be applied.
   */
  error: PropTypes.bool,
  /**
   * Additional class names.
   */
  className: PropTypes.string,
  /**
   * Size of Checkbox.
   */
  size: PropTypes.oneOf(getJSMapKeysArray(checkboxSizeMap)),
  /**
   * Icon component name that should be rendered as check mark.
   */
  icon: PropTypes.oneOf(getComponentsMap(icons, true)),
  /**
   * Defines callback function for change event
   */
  onChange: PropTypes.func,
};

Checkbox.defaultProps = {
  id: null,
  className: null,
  disabled: false,
  error: false,
  icon: 'CheckIcon',
  size: 'normal',
  label: null,
  onChange: () => null,
};

export default Checkbox;
