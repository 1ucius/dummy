import * as React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import { getJSMapKeysArray } from '../../cssMaps';

import { Flex } from '../Flex';
import { Typo } from '../Typo';
import { Surface } from '../Surface';

import Transition from '../CSSTransition';
import Portal from '../Portal';
import Button from '../Button';

import {
  CrossIcon,
  NoticeFilledIcon,
  ErrorIcon,
  WarningIcon,
  SuccessIcon,
} from '../icons';

import styles from './Notification.module.css';

export const notificationPresetsMap = {
  info: {
    icon: NoticeFilledIcon,
    color: 'secondaryBlue',
    size: 'medium',
  },
  error: {
    icon: ErrorIcon,
    color: 'errorRed',
    size: 'medium',
  },
  warning: {
    icon: WarningIcon,
    color: 'yellow',
    size: 'normal',
  },
  success: {
    icon: SuccessIcon,
    color: 'successGreen',
    size: 'medium',
  },
};

const Notification = React.forwardRef(function Notification(
  {
    isOpen,
    children,
    preset,
    title,
    message,
    className,
    handleClose,
    showCloseBtn,
    autoHideDuration,
  },
  ref
) {
  const innerRef = React.useRef(ref);
  const timerAutoHide = React.useRef();

  const setAutoHideTimer = React.useCallback(autoHideDurationParam => {
    if (!handleClose || autoHideDurationParam == null) {
      return;
    }

    clearTimeout(timerAutoHide.current);
    timerAutoHide.current = setTimeout(() => {
      handleClose();
    }, autoHideDurationParam);
  });

  React.useEffect(() => {
    if (isOpen) {
      setAutoHideTimer(autoHideDuration);
    }

    return () => {
      clearTimeout(timerAutoHide.current);
    };
  }, [isOpen, autoHideDuration, setAutoHideTimer]);

  const { size, color, icon } = notificationPresetsMap[preset];

  const Icon = icon;

  return (
    <Transition key='gg' show={isOpen} unmountOnExit>
      <Portal>
        <Surface level='level3' className={classnames(styles.Root, className)}>
          <Flex ref={innerRef} direction='column' className={styles.Content}>
            <Icon className={styles.Icon} size={size} color={color} />
            <Typo
              preset='heading6'
              color='darkGrey'
              weight='semibold'
              label={title}
              noUserSelect
            />
            {message && (
              <Typo
                preset='paragraph'
                color='mediumGrey'
                label={message}
                className={styles.Message}
                noUserSelect
              />
            )}

            {children && <Flex className={styles.Actions}>{children}</Flex>}
            {showCloseBtn && (
              <Button
                className={styles.CloseButton}
                preset='invisible'
                icon={props => (
                  <CrossIcon
                    size='extraSmall'
                    color='darkGrey'
                    hoverColor='blue'
                    {...props}
                  />
                )}
                onClick={handleClose}
                additionalHoverZone
              />
            )}
          </Flex>
        </Surface>
      </Portal>
    </Transition>
  );
});

Notification.propTypes = {
  /**
   * Defines one of possible preset.
   */
  preset: PropTypes.oneOf(getJSMapKeysArray(notificationPresetsMap)),
  /**
   * Defines is close button is visible.
   */
  showCloseBtn: PropTypes.bool,
  /**
   * Defines global notification state.
   */
  isOpen: PropTypes.bool,
  /**
   * Children elements.
   */
  children: PropTypes.node,
  /**
   * Defines main title text.
   */
  title: PropTypes.oneOf([PropTypes.string, PropTypes.func]),
  /**
   * Defines main message text.
   */
  message: PropTypes.string,
  /**
   * Additional class names.
   */
  className: PropTypes.string,
  /**
   * Defines close method.
   */
  handleClose: PropTypes.func,
  /**
   * Defines time in ms to autoclose notification.
   */
  autoHideDuration: PropTypes.number,
};

Notification.defaultProps = {
  preset: 'info',
  showCloseBtn: true,
  isOpen: false,
  children: null,
  title: '',
  message: '',
  className: '',
  handleClose: () => null,
  autoHideDuration: null,
};

export default Notification;
