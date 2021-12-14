import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import { Scrollbar } from '../Scrollbar';

import styles from './Sidebar.module.css';

const SidebarContent = ({ children, className }) => {
  return (
    <div className={classnames(styles.Content, className)}>
      <Scrollbar onlyVertical>{children}</Scrollbar>
    </div>
  );
};

SidebarContent.defaultProps = {
  children: null,
};

SidebarContent.propTypes = {
  children: PropTypes.node,
};

export default SidebarContent;
