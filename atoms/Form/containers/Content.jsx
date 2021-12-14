import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import styles from '../Form.module.css';

const FormContent = ({ as: Component, children, className, ...rest }) => (
  <Component className={classnames(styles.Content, className)} {...rest}>
    {children}
  </Component>
);

FormContent.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.func]),
  children: PropTypes.node,
  className: PropTypes.string,
};

FormContent.defaultProps = {
  as: 'div',
  children: null,
  className: null,
};

export default FormContent;
