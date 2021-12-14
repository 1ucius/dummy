import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import styles from '../Form.module.css';

const FormFooter = ({ as: Component, children, className, ...rest }) => (
  <Component className={classnames(styles.Footer, className)} {...rest}>
    {children}
  </Component>
);

FormFooter.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.func]),
  children: PropTypes.node,
  className: PropTypes.string,
};

FormFooter.defaultProps = {
  as: 'div',
  children: null,
  className: null,
};

export default FormFooter;
