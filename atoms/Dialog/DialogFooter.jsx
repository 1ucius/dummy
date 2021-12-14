import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Flex, FlexItem } from '../Flex';

import styles from './DialogFooter.module.css';

const DialogFooter = React.forwardRef(function DialogFooter(
  { children, alignItems, justifyContent, className, ...rest },
  ref
) {
  return (
    <Flex
      as={FlexItem}
      basis='auto'
      ref={ref}
      className={classNames(styles.Footer, className)}
      alignItems={alignItems}
      justifyContent={justifyContent}
      {...rest}
    >
      {children}
    </Flex>
  );
});

DialogFooter.propTypes = {
  /**
   * Children elements.
   */
  children: PropTypes.node,
  /**
   * Additional class names.
   */
  className: PropTypes.string,
  /**
   * Defines content vertical alignment.
   */
  alignItems: PropTypes.oneOf(['stretch', 'center', 'start', 'end']),
  /**
   * Defines content horizontal alignment.
   */
  justifyContent: PropTypes.oneOf([
    'start',
    'center',
    'space-between',
    'space-around',
    'end',
  ]),
};

DialogFooter.defaultProps = {
  children: null,
  className: '',
  alignItems: 'center',
  justifyContent: 'center',
};

export default DialogFooter;
