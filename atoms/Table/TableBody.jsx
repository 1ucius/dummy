import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import { Flex, FlexItem } from '../Flex';

import { Scrollbar } from '../Scrollbar';

import TableRow from './TableRow';
import TableCell from './TableCell';

import { useTable } from './TableContext';

import styles from './TableBody.module.css';

const TableBody = ({ className }) => {
  const {
    rows,
    useIndexes,
    cellRenderer,
    indexRenderer,
    actionsRenderer,
    cellTypesMap,
    onRowClick,
  } = useTable();

  return (
    <Flex
      skipWrapper
      as='tbody'
      className={classnames(styles.Body, className)}
      direction='column'
    >
      {rows.map((cells, index) => (
        <TableRow
          key={index}
          useSeparator
          onClick={e => {
            if (onRowClick) onRowClick(cells);
          }}
          // useSeparator={index + 1 !== rowsPerPage}
        >
          {useIndexes && (
            <TableCell
              key='index'
              renderer={indexRenderer}
              cell={{
                index: index + 1,
              }}
              isIndexCell
            />
          )}
          {cells.map(cell => {
            const { name, type } = cell;

            return (
              <TableCell
                key={name}
                renderer={
                  type === cellTypesMap.ACTION ? actionsRenderer : cellRenderer
                }
                isActionCell={cell.type === cellTypesMap.ACTION}
                rowIndex={index}
                cell={cell}
              />
            );
          })}
        </TableRow>
      ))}
    </Flex>
  );
};

TableBody.propTypes = {
  className: PropTypes.string,
};

TableBody.defaultProps = {
  className: null,
};

export default TableBody;
