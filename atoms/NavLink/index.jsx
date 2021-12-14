import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import { NavLink as Link, useLocation } from 'react-router-dom';

import styles from './NavLink.module.css';

const NavLink = ({
  pathCheckCallback,
  className,
  activeClass,
  fluid,
  to,
  ...props
}) => {
  const location = useLocation();

  React.useEffect(() => {
    if (pathCheckCallback) {
      pathCheckCallback(location.pathname.indexOf(to) > -1);
    }
  }, [location, pathCheckCallback, to]);

  return (
    <Link
      {...props}
      className={classnames(className, fluid && styles.Fluid)}
      to={to}
      activeClassName={activeClass}
    />
  );
};

NavLink.propTypes = {
  /**
   * Link to the page
   */
  to: PropTypes.string.isRequired,
  /**
   * Used to extracy isActive state of the link during pathcheck.
   */
  pathCheckCallback: PropTypes.func,
  /**
   * Define classes to be applied if link is active
   */
  activeClass: PropTypes.string,
  className: PropTypes.string,
  fluid: PropTypes.bool,
};

NavLink.defaultProps = {
  pathCheckCallback: null,
  activeClass: 'active',
  className: null,
  fluid: false,
};

export default NavLink;
