import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useMemo,
} from 'react';

import isEmpty from 'lodash.isempty';

import find from 'lodash.find';
import isEqual from 'lodash.isequal';

import { isNull } from '../../helpers';

import { specialValues } from '../../constants';

export const SelectContext = createContext();

export const SelectContextProvider = ({ children, value }) => {
  const {
    value: currentValue,
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
  } = value;

  const [referenceElement, setReferenceElement] = React.useState(null);

  const [isOpen, setOpen] = useState(false);

  const searchRef = useRef();
  const [searchValue, setSearchValue] = useState('');

  const handleToggle = useCallback(() => setOpen(state => !state), []);
  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  const handleClick = useCallback(() => {
    if (search) {
      searchRef.current.focus();
    } else {
      handleToggle();
    }
  }, [search, searchRef, handleToggle]);

  const values = useMemo(() => {
    if (
      isNull(currentValue) ||
      (isEmpty(currentValue) && Number.isNaN(currentValue))
    ) {
      return specialValues.NULL;
    }

    const newValue = multiple ? [...currentValue] : [currentValue];

    return newValue;
  }, [currentValue, multiple]);

  const selectedOptions = useMemo(
    () =>
      isNull(values)
        ? []
        : options.filter(
            option =>
              find(values, option.value) || values.includes(option.value)
          ),
    [options, values]
  );

  const selectedOptionsFlat = selectedOptions.map(option => option.value);

  const hasSelected = !isEmpty(selectedOptions);

  const hasAllSelected = selectedOptions.length === options.length;

  const handleRemoveAll = useCallback(() => {
    if (!multiple) handleClose();

    onChange({ value: specialValues.NULL, e: specialValues.NULL });
  }, [onChange, multiple]);

  const handleSelectAll = useCallback(() => {
    if (!multiple) handleClose();

    const newValue = options.map(option => option.value);

    onChange({ value: newValue, e: specialValues.NULL });
  }, [onChange, multiple]);

  const handleRemove = useCallback(
    next => {
      let val = isNull(values)
        ? specialValues.NULL
        : values.filter(prev => !isEqual(prev, next));

      if (isNullable && !val?.length) val = specialValues.NULL;

      onChange({ value: val, e: specialValues.NULL });
    },
    [values, onChange, isNullable]
  );

  const handleMultipleChange = useCallback(
    ({ next, includes }) => {
      if (includes) handleRemove(next);

      if (!includes) {
        const currentValues = isNull(values) ? [] : values;

        onChange({ value: currentValues.concat(next), e: specialValues.NULL });
      }

      if (onSearchChange) {
        onSearchChange('');
      }
    },
    [handleRemove, onChange, onSearchChange, values]
  );

  const handleSingleChange = useCallback(
    ({ next, includes }) => {
      if (!includes) onChange({ value: next, e: specialValues.NULL });

      if (includes && isNullable) handleRemove(next);

      if (onSearchChange) {
        onSearchChange('');
      }
    },
    [onSearchChange, onChange, isNullable]
  );

  const handleChange = useCallback(
    next => {
      if (!multiple) handleClose();

      const nextValue = next;

      const includes = isNull(values)
        ? false
        : find(values, nextValue) || values.includes(nextValue);

      if (multiple) {
        handleMultipleChange({ next, includes });
      } else {
        handleSingleChange({ next, includes });
      }
    },
    [multiple, values, handleClose, onChange, onSearchChange, handleRemove]
  );

  const handleSearchChange = useCallback(e => {
    const {
      target: { value },
    } = e;

    setSearchValue(value);

    if (onSearchChange) {
      onSearchChange(value);
    }
  });

  const getText = useCallback(() => {
    const text = hasSelected ? selectedOptions[0].label : placeholder;

    return text;
  }, [selectedOptions, hasSelected, placeholder]);

  const showChips = multiple && !isEmpty(values);

  const showText = (multiple && !options) || !showChips;

  return (
    <SelectContext.Provider
      value={{
        ...value,
        referenceElement,
        setReferenceElement,
        isOpen,
        showChips,
        showText,
        handleClick,
        handleClose,
        handleOpen,
        handleRemoveAll,
        handleSelectAll,
        handleChange,
        values,
        setOpen,
        getText,
        searchRef,
        selectedOptions,
        selectedOptionsFlat,
        hasSelected,
        hasAllSelected,
        searchValue,
        handleSearchChange,
        handleRemove,
        placeholder,
        ...rest,
      }}
    >
      {children}
    </SelectContext.Provider>
  );
};

export function useSelect() {
  return useContext(SelectContext);
}
