import * as React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Portal from '../Portal';
import Transition from '../CSSTransition';
import Button from '../Button';
import { Flex, FlexItem } from '../Flex';
import { useClickOutside } from '../../hooks';
import { getJSMapKeysArray } from '../../cssMaps';

import styles from './Dialog.module.css';

export const dialogSizeMap = {
  large: 'large',
  normal: 'normal',
  small: 'small',
};

const Dialog = React.forwardRef(function Dialog(
  {
    children,
    onClickOutside,
    handleClose,
    className,
    size,
    noBackdrop,
    maxHeight,
    isOpen,
    showCloseBtn,
  },
  ref
) {
  const innerRef = React.useRef(ref);

  useClickOutside(innerRef, onClickOutside);

  return (
    <Transition key='gg' show={isOpen} unmountOnExit>
      <Portal>
        <Flex
          className={classNames(
            styles.Wrapper,
            !noBackdrop && styles.Backdrop,
            className
          )}
          justifyContent='center'
          alignItems='center'
          skipWrapper
        >
          <Flex
            as={FlexItem}
            className={classNames(
              styles.Root,
              size && styles[size],
              maxHeight && styles.MaxHeight
            )}
            shrink
            direction='column'
            ref={innerRef}
            skipWrapper
          >
            {showCloseBtn && (
              <Button
                preset='invisible'
                noMinWidth
                className={styles.CloseButton}
                onClick={handleClose}
                icon='CrossIcon'
              />
            )}
            {children}
          </Flex>
        </Flex>
      </Portal>
    </Transition>
  );
});

Dialog.propTypes = {
  /**
   * Children elements.
   */
  children: PropTypes.node,
  /**
   * Choose from style presets. Possible values:
   */
  size: PropTypes.oneOf(getJSMapKeysArray(dialogSizeMap)),
  /**
   * Additional class names.
   */
  className: PropTypes.string,
  /**
   * Defines is crossicon button visible.
   */
  showCloseBtn: PropTypes.bool,
  /**
   * Defines global modal state.
   */
  isOpen: PropTypes.bool,
  /**
   * Defines is maximum height limit enabled.
   */
  maxHeight: PropTypes.bool,
  /**
   * Backdrop click handler.
   */
  onClickOutside: PropTypes.func,
  /**
   * Close click handler.
   */
  handleClose: PropTypes.func,
  /**
   * Defines backdrop visibility.
   */
  noBackdrop: PropTypes.bool,
};

Dialog.defaultProps = {
  isOpen: false,
  showCloseBtn: true,
  maxHeight: false,
  children: null,
  className: '',
  onClickOutside: () => null,
  handleClose: () => null,
  noBackdrop: false,
  size: dialogSizeMap.normal,
};

export default Dialog;
