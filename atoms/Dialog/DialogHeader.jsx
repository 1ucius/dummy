import * as React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import { Flex, FlexItem } from '../Flex';

import styles from './DialogHeader.module.css';

const DialogHeader = React.forwardRef(function DialogHeader(
  { children, className },
  ref
) {
  return (
    <FlexItem
      basis='auto'
      ref={ref}
      className={classNames(styles.root, className)}
    >
      {children}
    </FlexItem>
  );
});

DialogHeader.propTypes = {
  /**
   * Children elements.
   */
  children: PropTypes.node,
  /**
   * Additional class names.
   */
  className: PropTypes.string,
};

DialogHeader.defaultProps = {
  children: null,
  className: '',
};

export default DialogHeader;
