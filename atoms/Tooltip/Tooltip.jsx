import * as React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import Popper from '../Popper';
import { Typo } from '../Typo';

import styles from './Tooltip.module.css';

const Tooltip = ({
  component: Component,
  label,
  tooltipOffset,
  className,
  appearDelay,
  ...rest
}) => {
  const [hovered, setHovered] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [referenceElement, setReferenceElement] = React.useState(null);

  const appearTimer = React.useRef();

  const setAppearTimer = React.useCallback(delay => {
    clearTimeout(appearTimer.current);

    appearTimer.current = setTimeout(() => {
      setIsOpen(true);
    }, delay);
  });

  React.useEffect(() => {
    if (hovered && !isOpen) {
      setAppearTimer(appearDelay);
    }

    if (!hovered) {
      clearTimeout(appearTimer.current);
      setIsOpen(false);
    }

    return () => {
      clearTimeout(appearTimer.current);
    };
  }, [hovered, isOpen, appearDelay, setAppearTimer]);

  return (
    <>
      {React.cloneElement(Component, {
        ref: setReferenceElement,
        onMouseEnter: () => {
          setHovered(true);
        },
        onMouseLeave: () => {
          setHovered(false);
        },
      })}
      {referenceElement && (
        <Popper
          isOpen={isOpen}
          reference={referenceElement}
          offset={tooltipOffset}
          className={classnames(styles.Tooltip, className)}
          zIndex={1000}
          {...rest}
        >
          <Typo
            fontSize='caption'
            color='white'
            letterSpacing='regular'
            align='center'
            label={label}
            fluid
            noUserSelect
          />
        </Popper>
      )}
    </>
  );
};

Tooltip.propTypes = {
  /**
   * Text to be displayed in the tooltip
   */
  label: PropTypes.string.isRequired,
  /**
   * Text to be displayed in the tooltip
   */
  tooltipOffset: PropTypes.arrayOf(PropTypes.number),
  /**
   * Additional class names
   */
  className: PropTypes.string,
  /**
   * Anchor component.
   */
  component: PropTypes.node.isRequired,
  /**
   * Delay before tooltip apperas.
   */
  appearDelay: PropTypes.number,
};

Tooltip.defaultProps = {
  tooltipOffset: [0, 8],
  className: null,
  appearDelay: 0,
};

export default Tooltip;
