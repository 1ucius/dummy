import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import styles from './Separator.module.css';

const Separator = ({ as: Component, isVertical, className }) => {
  return (
    <Component
      className={classnames(
        styles.Separator,
        isVertical && styles.Vertical,
        className
      )}
    />
  );
};

Separator.propTypes = {
  /**
   * Additional class names.
   */
  as: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  /**
   * Position the Separator vertically. Possible values: true | false
   */
  isVertical: PropTypes.bool,
  /**
   * Additional class names.
   */
  className: PropTypes.string,
};

Separator.defaultProps = {
  as: 'div',
  isVertical: false,

  className: null,
};

export default Separator;
