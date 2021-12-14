import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import { Flex, FlexItem } from '../Flex';

import { Separator } from '../Separator';

import { useTable } from './TableContext';

import styles from './TableRow.module.css';

const TableRow = ({
  as: Component,
  useSeparator,
  children,
  className,
  onClick,
  ...rest
}) => {
  const { useGrid } = useTable();

  return (
    <>
      <Flex
        skipWrapper
        as={Component}
        className={classnames(
          styles.Row,
          onClick && styles.RowClickable,
          className
        )}
        onClick={onClick}
        {...rest}
      >
        {children}
      </Flex>
      {useSeparator && useGrid && <Separator as='tr' />}
    </>
  );
};

TableRow.propTypes = {
  as: PropTypes.oneOfType([PropTypes.elementType, PropTypes.string]),
  children: PropTypes.node.isRequired,
  useSeparator: PropTypes.bool,
};

TableRow.defaultProps = {
  as: 'tr',
  useSeparator: false,
};

export default TableRow;
