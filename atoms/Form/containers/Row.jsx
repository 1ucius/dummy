import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import styles from '../Form.module.css';

const FormRow = ({ as: Component, children, className, ...rest }) => (
  <Component className={classnames(styles.Row, className)} {...rest}>
    {children}
  </Component>
);

FormRow.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.func]),
  children: PropTypes.node,
  className: PropTypes.string,
};

FormRow.defaultProps = {
  as: 'div',
  children: null,
  className: null,
};

export default FormRow;
