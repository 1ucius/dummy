import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import styles from '../Form.module.css';

const FormHeader = ({ as: Component, children, className, ...rest }) => (
  <Component className={classnames(styles.Header, className)} {...rest}>
    {children}
  </Component>
);

FormHeader.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.func]),
  children: PropTypes.node,
  className: PropTypes.string,
};

FormHeader.defaultProps = {
  as: 'div',
  children: null,
  className: null,
};

export default FormHeader;
