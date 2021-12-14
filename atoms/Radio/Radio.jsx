import * as React from 'react';
import classNames from 'classnames';

import Button from '../Button';
import { Typo } from '../Typo';

import { useRadioGroup } from '../RadioGroup';
import styles from './Radio.module.css';

const Radio = React.forwardRef(function Radio(
  { name, value, label, checked, className, disabled },
  ref
) {
  const group = useRadioGroup();

  if (group) {
    name = name ?? group.name;
    checked = checked ?? value === group.value;
  }

  const { onChange } = group;

  return (
    <Button
      name={name}
      value={value}
      preset='invisible'
      as='label'
      className={classNames(
        styles.Radio,
        checked && styles.RadioChecked,
        disabled && styles.RadioDisabled,
        className
      )}
      disabled={disabled}
      onClick={() => {
        if (checked) return;
        onChange(value);
      }}
      ref={ref}
    >
      <Typo
        preset='heading6'
        label={label}
        align='center'
        noUserSelect
        fluid
        ellipsis
        color='mediumGrey'
      />
    </Button>
  );
});

export default Radio;
