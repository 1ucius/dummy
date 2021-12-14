import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import styles from './Sidebar.module.css';

const SidebarHeader = ({ children, className }) => {
  return <div className={classnames(styles.Header, className)}>{children}</div>;
};

SidebarHeader.defaultProps = {
  children: null,
};

SidebarHeader.propTypes = {
  children: PropTypes.node,
};

export default SidebarHeader;
