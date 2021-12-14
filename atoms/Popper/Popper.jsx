import * as React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import { usePopper } from 'react-popper';

import { useClickOutside, useResizeObserver } from '../../hooks';

import Transition from '../CSSTransition';
import Portal from '../Portal';

import styles from './Popper.module.css';

const Popper = React.forwardRef(function Popper(
  {
    reference: referenceElement,
    arrow,
    offset,
    className,
    onClose,
    children,
    fullWidth,
    noRounding,
    isOpen,
    zIndex,
  },
  ref
) {
  const [popperElement, setPopperElement] = React.useState(null);
  const [arrowElement, setArrowElement] = React.useState(null);

  const getOptions = React.useMemo(
    () => ({
      modifiers: [
        {
          name: 'preventOverflow',
          options: {
            altAxis: true,
            padding: 20,
          },
        },
        offset && {
          name: 'offset',
          options: {
            offset,
          },
        },
        arrow && {
          name: 'arrow',
          options: {
            element: arrowElement,
          },
        },
      ].filter(Boolean),
    }),
    [arrow, offset, arrowElement]
  );

  const { styles: popperStyles, attributes } = usePopper(
    referenceElement,
    popperElement,
    {
      ...getOptions,
    }
  );

  const [isResized] = useResizeObserver({ current: referenceElement });

  React.useEffect(() => {
    if (isResized) window.dispatchEvent(new Event('resize'));
  }, [isResized]);

  const clickOutsideHandler = React.useCallback(() => {
    if (!isOpen) return;

    onClose();
  }, [isOpen]);

  const getTargetWidth = React.useCallback(() => {
    if (!referenceElement) return 'auto';

    return referenceElement.getBoundingClientRect().width;
  }, [referenceElement]);

  useClickOutside(
    {
      current: popperElement,
    },
    clickOutsideHandler,
    [referenceElement]
  );

  useClickOutside(
    {
      current: referenceElement,
    },
    clickOutsideHandler,
    [popperElement]
  );

  return (
    <>
      <Transition show={isOpen} unmountOnExit>
        <Portal>
          <div
            ref={setPopperElement}
            className={classNames(
              styles.Popper,
              isOpen && styles.PopperOpen,
              noRounding && styles.NoRounding,
              className
            )}
            style={{
              width: fullWidth ? getTargetWidth() : 'auto',
              ...popperStyles.popper,
              zIndex,
            }}
            {...attributes.popper}
          >
            {arrow && (
              <div
                ref={setArrowElement}
                className={styles.PopperArrow}
                style={popperStyles.arrow}
              />
            )}
            {children}
          </div>
        </Portal>
      </Transition>
    </>
  );
});

Popper.propTypes = {
  /**
   * DOM element that acts as an anchor for Popper.
   */
  reference: PropTypes.elementType.isRequired,
  /**
   * Should popper display arrow. Possible values: true | false
   */
  arrow: PropTypes.bool,
  /**
   * Haw far should popper be from it's anchor element.
   */
  offset: PropTypes.arrayOf(PropTypes.number),
  /**
   * Additional class names.
   */
  className: PropTypes.string,
  /**
   * Callback fire when popper closes.
   */
  onClose: PropTypes.func,
  /**
   * Contents of the Popper.
   */
  children: PropTypes.node,
  /**
   * Defines whether Poppers width should match it's anchor element width. Possible values: true | false
   */
  fullWidth: PropTypes.bool,
  /**
   * Z-index of popper element.
   */
  zIndex: PropTypes.number,
  /**
   * Defines global state of component.
   */
  isOpen: PropTypes.bool,
  /**
   * Remove rounded corners.
   */
  noRounding: PropTypes.bool,
};

Popper.defaultProps = {
  isOpen: false,
  onClose: () => {},
  offset: [0, 0],
  className: null,
  children: null,
  fullWidth: false,
  arrow: false,
  zIndex: 1002,
  noRounding: false,
};

export default Popper;
