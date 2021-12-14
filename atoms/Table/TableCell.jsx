import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import { Flex, FlexItem } from '../Flex';

import { Typo } from '../Typo';

import { useTable } from './TableContext';

import styles from './TableCell.module.css';

export function defaultRender({ table, cell }) {
  const { title } = cell;
  const { index, offset } = table;

  if (index) {
    const num = Number(index);

    return (
      <Typo
        preset='subtitle'
        label={!num ? '#' : `${offset + num}`}
        color='mediumGrey'
        uppercase
      />
    );
  }

  return (
    <Typo preset='subtitle' label={title || '-'} color='mediumGrey' uppercase />
  );
}

const TableCell = ({
  as: Component,
  className,
  isHeaderCell,
  isIndexCell,
  isActionCell,
  children,
  renderer,
  cell,
  rowIndex,
  ...rest
}) => {
  const table = useTable();

  return (
    <FlexItem
      as={Component}
      className={classnames(
        styles.Cell,
        isIndexCell && styles.Index,
        isHeaderCell && styles.HeaderCell,
        isActionCell && styles.Actions,
        className
      )}
      shrink
      grow
      {...rest}
    >
      {renderer({ table, cell, rowIndex })}
    </FlexItem>
  );
};

TableCell.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  isIndexCell: PropTypes.bool,
  isHeaderCell: PropTypes.bool,
  isActionCell: PropTypes.bool,
  children: PropTypes.node,
  renderer: PropTypes.func,
  cell: PropTypes.shape({
    name: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string,
    data: PropTypes.shape({}),
  }).isRequired,
  rowIndex: PropTypes.number,
};

TableCell.defaultProps = {
  as: 'td',
  className: null,
  isIndexCell: false,
  isHeaderCell: false,
  isActionCell: false,
  children: null,
  rowIndex: null,
  renderer: defaultRender,
};

export default TableCell;
