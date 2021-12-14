import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import styles from './Surface.module.css';

export const levelsMap = {
  level0: styles.Level0,
  level1: styles.Level1,
  level2: styles.Level2,
  level3: styles.Level3,
  level4: styles.Level4,
  level5: styles.Level5,
};

const Surface = forwardRef(function Surface(
  {
    as: Component,
    level,
    rounded,
    className,
    children,
    noPadding,
    smallPadding,
    ...rest
  },
  ref
) {
  return (
    <Component
      ref={ref}
      className={classnames(
        styles.Surface,
        levelsMap[level],
        smallPadding && styles.SmallPadding,
        noPadding && styles.NoPadding,
        rounded && styles.Rounded,
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  );
});

Surface.propTypes = {
  /**
   * DOM element to be rendered as.
   */
  as: PropTypes.string,
  /**
   * Set elevation of the Surface. Possible values:
   */
  level: PropTypes.oneOf(Object.keys(levelsMap)),
  /**
   * Add or remove rounded corners.
   */
  rounded: PropTypes.bool,
  /**
   * Remove paddings. Possible values: true | false
   */
  noPadding: PropTypes.bool,
  /**
   * Use small paddings. Possible values: true | false
   */
  smallPadding: PropTypes.bool,
};

Surface.defaultProps = {
  as: 'div',
  rounded: true,
  level: 'level1',
  noPadding: false,
  smallPadding: false,
};

export default Surface;
