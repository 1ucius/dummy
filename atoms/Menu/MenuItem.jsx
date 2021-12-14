import * as React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import styles from './MenuItem.module.css';

const MenuItem = React.forwardRef(function MenuItem(
  { as: Component, className, ...rest },
  ref
) {
  return (
    <Component
      ref={ref}
      className={classnames(styles.MenuItem, className)}
      {...rest}
    />
  );
});

MenuItem.propTypes = {
  as: PropTypes.oneOfType([PropTypes.node, PropTypes.func, PropTypes.string]),
  className: PropTypes.string,
};

MenuItem.defaultProps = {
  as: 'div',
  className: null,
};

export default MenuItem;
