import React, { forwardRef, useCallback } from 'react';
import classNames from 'classnames';

import { Typo } from '../Typo';
import { MenuItem } from '../Menu';
import { Checkbox } from '../Checkbox';

import { useSelect } from './SelectContext';

import styles from './SelectOption.module.css';

const SelectOption = forwardRef(function SelectOption(
  { value, label, showCheckbox, onClick, className, forceActive, ...rest },
  ref
) {
  const { selectedOptionsFlat, multiple } = useSelect();

  const active = forceActive || selectedOptionsFlat.includes(value);

  const handleClick = useCallback(
    e => {
      e.preventDefault();
      e.stopPropagation();

      onClick(value);
    },
    [value, onClick]
  );

  return (
    <MenuItem
      ref={ref}
      className={classNames(
        styles.SelectOption,
        active && styles.SelectOptionActive,
        (showCheckbox || multiple) && styles.WithCheckbox,
        className
      )}
      onClick={e => handleClick(e)}
      {...rest}
    >
      {showCheckbox && (
        <Checkbox
          name={label}
          size='small'
          className={styles.SelectOptionCheck}
          checked={active}
          onClick={() => {}}
          onChange={() => {}}
        />
      )}
      <Typo label={label} />
    </MenuItem>
  );
});

export default SelectOption;
