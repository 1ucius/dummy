import * as React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import { Scrollbar } from '../Scrollbar';

import styles from './TextArea.module.css';

const TextArea = React.forwardRef(function TextArea(
  {
    value,
    id,
    name,
    error,
    success,
    className,
    onChange,
    onBlur,
    onFocus,
    rounded,
    disabled,
    ...rest
  },
  ref
) {
  const [focused, setFocused] = React.useState(false);
  const [innerValue, setInnerValue] = React.useState('');

  const textAreaRef = React.useRef(ref);
  const [scrollRef, setScrollRef] = React.useState(null);

  const setCaret = React.useCallback(() => {
    const range = document.createRange();

    range.selectNodeContents(textAreaRef.current);
    range.collapse(false);

    const selection = window.getSelection();

    selection.removeAllRanges();
    selection.addRange(range);

    if (!scrollRef) return;

    scrollRef.current.scrollToBottom();
  }, [textAreaRef, scrollRef]);

  const handleFocus = React.useCallback(() => {
    if (disabled) return;

    setFocused(true);

    setCaret();
  }, [textAreaRef, innerValue, disabled]);

  const handleBlur = React.useCallback(() => {
    setFocused(false);
  }, []);

  const updateInnerText = React.useCallback(() => {
    textAreaRef.current.innerText = innerValue;
  }, [textAreaRef, innerValue]);

  const setNewValue = React.useCallback(val => {
    setInnerValue(val);
  }, []);

  const shapeEventObject = React.useCallback(
    ({ e, value }) => ({
      ...e,
      target: {
        ...e.target,
        value,
      },
    }),
    []
  );

  React.useEffect(() => {
    setInnerValue(value);
  }, [value]);

  React.useEffect(() => {
    updateInnerText();
  }, [disabled]);

  return (
    <div
      className={classnames(
        styles.TextAreaWrapper,
        rounded && styles.Rounded,
        error && !disabled && styles.Error,
        success && !disabled && styles.Success,
        focused && !disabled && styles.Focused,
        disabled && styles.Disabled
      )}
    >
      <Scrollbar
        refCallback={scroll => setScrollRef(scroll)}
        autoMaxHeight='125px'
        size='small'
        className={classnames(styles.ScrollArea)}
      >
        <div
          contentEditable={!disabled}
          ref={textAreaRef}
          name={name}
          id={id}
          className={classnames(styles.TextArea, className)}
          onFocus={e => {
            const val = e.target.innerText;

            handleFocus(e);

            onFocus(shapeEventObject({ e, value: val }));
          }}
          onBlur={e => {
            const val = e.target.innerText;

            handleBlur(e);

            onBlur(shapeEventObject({ e, value: val }));
          }}
          onInput={e => {
            const val = e.target.innerText;

            setNewValue(val);

            const event = shapeEventObject({ e, value: val });

            onChange(event);
          }}
          {...rest}
        />
      </Scrollbar>
    </div>
  );
});

TextArea.propTypes = {
  /**
   * Value for controlled TextArea.
   */
  value: PropTypes.string,
  /**
   * Additional class names
   */
  className: PropTypes.string,
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
   * ID to be assigned to Input.
   */
  id: PropTypes.string,
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
   * Set if TextArea should appear rounded. Possible values: true | false
   */
  rounded: PropTypes.bool,
};

TextArea.defaultProps = {
  value: '',
  id: null,
  className: '',
  onFocus: () => {},
  onBlur: () => {},
  error: false,
  success: false,
  disabled: false,
  rounded: true,
};

export default TextArea;
