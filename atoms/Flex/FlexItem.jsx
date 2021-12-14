import * as React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import styles from './FlexItem.module.css';

const FlexItem = React.forwardRef(function FlexItem(
  { as: Component, basis, forceWidth, grow, shrink, className, ...rest },
  ref
) {
  return (
    <Component
      ref={ref}
      className={classnames(
        styles.FlexItem,
        grow && styles.Grow,
        shrink && styles.Shrink,
        basis && styles[`FlexItem--${basis}`],
        className
      )}
      style={{
        width: forceWidth,
      }}
      {...rest}
    />
  );
});

FlexItem.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.func]),
  shrink: PropTypes.bool,
  grow: PropTypes.bool,
  className: PropTypes.string,
  basis: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  forceWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

FlexItem.defaultProps = {
  as: 'div',
  shrink: false,
  grow: false,
  className: null,
  basis: 'auto',
  forceWidth: null,
};

export default FlexItem;
