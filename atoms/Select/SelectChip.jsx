import React, { useCallback, forwardRef } from 'react';

import Chip from '../Chip';

import styles from './SelectChip.module.css';

const SelectChip = forwardRef(function SelectChip(
  { label, value, onClick, ...rest },
  ref
) {
  const handleClick = useCallback(
    e => {
      onClick({ e, value });
    },
    [value, onClick]
  );

  return (
    <Chip
      ref={ref}
      label={label}
      onClick={handleClick}
      className={styles.SelectChip}
      {...rest}
    />
  );
});

export default SelectChip;
