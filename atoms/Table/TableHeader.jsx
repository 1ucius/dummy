import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import { Flex } from '../Flex';

import { Typo } from '../Typo';

import TableRow from './TableRow';
import TableCell from './TableCell';

import { useTable } from './TableContext';

import styles from './TableHeader.module.css';

const TableHeader = ({ className }) => {
  const {
    columns,
    useIndexes,
    useGrid,
    columnTitleRenderer,
    indexRenderer,
    cellTypesMap,
    stickyHeader,
  } = useTable();

  return (
    <Flex
      skipWrapper
      as='thead'
      className={classnames(
        styles.Header,
        stickyHeader && styles.Sticky,
        className
      )}
    >
      <TableRow className={classnames(styles.HeaderRow)} useSeparator={useGrid}>
        {useIndexes && (
          <TableCell
            renderer={indexRenderer}
            cell={{
              index: 0,
            }}
            isIndexCell
            isHeaderCell
            key='index'
          >
            <Typo preset='subtitle' label='#' color='mediumGrey' uppercase />
          </TableCell>
        )}
        {columns.map(cell => {
          const { name } = cell;

          return (
            <TableCell
              renderer={columnTitleRenderer}
              cell={cell}
              key={name}
              isHeaderCell
              isActionCell={cell.type === cellTypesMap.ACTION}
            />
          );
        })}
      </TableRow>
    </Flex>
  );
};

TableHeader.propTypes = {
  className: PropTypes.string,
};

TableHeader.defaultProps = {
  className: null,
};

export default TableHeader;
