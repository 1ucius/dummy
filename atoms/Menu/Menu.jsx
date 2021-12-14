import * as React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import styles from './Menu.module.css';

const Menu = React.forwardRef(function Menu(
  { className, children, noMargin, ...rest },
  ref
) {
  return (
    <ul
      ref={ref}
      className={classnames(
        styles.Menu,
        noMargin && styles.NoMargin,
        className
      )}
      {...rest}
    >
      {React.Children.map(children, child => {
        if (!child) return null;

        return React.cloneElement(child, {
          as: 'li',
        });
      })}
    </ul>
  );
});

Menu.propTypes = {
  /**
   * Additional class names.
   */
  className: PropTypes.string,
  /**
   * Children elements.
   */
  children: PropTypes.node,
  /**
   * Remove menu margin.
   */
  noMargin: PropTypes.bool,
};

Menu.defaultProps = {
  className: '',
  children: null,
  noMargin: false,
};

export default Menu;
