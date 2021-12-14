import React, { forwardRef } from 'react';

import Popper from '../Popper';

import { Scrollbar } from '../Scrollbar';
import { Menu } from '../Menu';

import SelectOption from './SelectOption';

import { useSelect } from './SelectContext';

import { callEventWithoutPropagation } from '../../helpers';

import { specialValues } from '../../constants';

import styles from './Select.module.css';

const menuOffset = [0, 2];

const SelectPopper = forwardRef(function SelectPopper(props, ref) {
  const {
    multiple,
    isOpen,
    search,
    handleClose,
    handleOpen,
    handleRemoveAll,
    handleSelectAll,
    handleChange,
    options,
    hasSelected,
    hasAllSelected,
    referenceElement,
    isNullable,
    autoHeightMax,
  } = useSelect();

  if (!referenceElement) return null;

  const hasOptions = !!options.length;

  const showRemoveAll = hasOptions && isNullable && hasSelected && multiple;

  const showSelectAll = hasOptions && multiple && !hasAllSelected;

  return (
    <Popper
      reference={referenceElement}
      isOpen={isOpen}
      offset={menuOffset}
      className={styles.SelectPopper}
      onClickOutside={e =>
        callEventWithoutPropagation({ e, callback: handleClose })
      }
      onOpen={() => {
        handleOpen();
      }}
      onClose={() => {
        handleClose();
      }}
      behaviorPreset={search ? 'manual' : 'click'}
      fullWidth
      {...props}
    >
      <Menu>
        <Scrollbar autoHeightMax={autoHeightMax ?? '136px'}>
          {!hasOptions && (
            <SelectOption
              key='empty'
              onClick={handleClose}
              forceActive
              label='No options'
              value={specialValues.NULL}
            />
          )}
          {showRemoveAll && (
            <SelectOption
              key='removeall'
              onClick={handleRemoveAll}
              label='Deselect All'
              forceActive={!hasSelected}
              value={specialValues.NULL}
            />
          )}
          {showSelectAll && (
            <SelectOption
              key='selectall'
              onClick={handleSelectAll}
              label='Select All'
              forceActive={hasAllSelected}
              value={specialValues.NULL}
            />
          )}
          {hasOptions &&
            options.map(option => (
              <SelectOption
                key={option.id ?? option.label}
                onClick={handleChange}
                showCheckbox={multiple}
                {...option}
              />
            ))}
        </Scrollbar>
      </Menu>
    </Popper>
  );
});

export default SelectPopper;
