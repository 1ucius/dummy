import React, { forwardRef } from 'react';

import classnames from 'classnames';

import { Scrollbar } from '../Scrollbar';
import { Typo } from '../Typo';
import { Input } from '../Input';
import { Flex } from '../Flex';
import SelectChip from './SelectChip';
import { ChevronIcon } from '../icons';

import { useSelect } from './SelectContext';

import { callEventWithoutPropagation } from '../../helpers';

import styles from './Select.module.css';

export const sizeToStyleMap = {
  small: styles.SelectSmall,
  normal: null,
};

const SelectElement = forwardRef(function SelectElement(props, ref) {
  const {
    multiple,
    isOpen,
    size,
    rounded,
    invisible,
    search,
    className,
    inputClassName,
    showChips,
    showText,
    handleClick,
    getText,
    searchRef,
    selectedOptions,
    searchValue,
    handleSearchChange,
    handleRemove,
    placeholder,
    setReferenceElement,
    popperWrapperRef,
  } = useSelect();

  return (
    <>
      <div
        ref={setReferenceElement}
        className={classnames(
          styles.Select,
          multiple && styles.SelectMultiple,
          isOpen && styles.SelectActive,
          sizeToStyleMap[size],
          rounded && styles.SelectRounded,
          search && styles.Search,
          invisible && styles.Invisible,
          className
        )}
        onClick={e => callEventWithoutPropagation({ e, callback: handleClick })}
        role='button'
        tabIndex='0'
        label=''
        {...props}
      >
        {showText && !search && (
          <Typo
            label={getText()}
            preset='input'
            customColor='inherit'
            ellipsis
            noUserSelect
          />
        )}
        {search && (
          <Input
            ref={searchRef}
            className={classnames(styles.SelectSearch, inputClassName)}
            placeholder={placeholder}
            value={searchValue}
            onChange={handleSearchChange}
            invisible
            fluid
          />
        )}
        {showChips && (
          <Scrollbar autoHeightMax={search ? '62px' : '96px'}>
            <Flex gap='5xs' wrap>
              {selectedOptions.map(option => (
                <SelectChip
                  key={option.label}
                  onClick={({ e, value }) =>
                    callEventWithoutPropagation({
                      e,
                      callback: () => handleRemove(value),
                    })
                  }
                  label={option.label}
                  value={option.value}
                  // flex={{ grow: selectedOptions.length > 2 }}
                  tooltip
                  tooltipFullWidth
                />
              ))}
            </Flex>
          </Scrollbar>
        )}
        {!search && (
          <span className={styles.SelectArrow}>
            <ChevronIcon
              rotateDegrees={isOpen ? 'neg180' : 'unset'}
              size='tiny'
              color='mediumGrey'
            />
          </span>
        )}
      </div>
      <div ref={popperWrapperRef}></div>
    </>
  );
});

export default SelectElement;
