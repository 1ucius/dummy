import React from 'react';
import PropTypes from 'prop-types';

import TableContent from './TableContent';

import { TableContextProvider, scrollPresetMap } from './TableContext';

import { defaultRender } from './TableCell';

import { getJSMapKeysArray } from '../../cssMaps';

const Table = ({
  columns,
  rows,
  maxRows,
  useIndexes,
  useGrid,
  scrollPreset,
  maxHeight,
  stickyHeader,
  stickyFooter,
  className,
  indexRenderer,
  columnTitleRenderer,
  cellRenderer,
  actionsRenderer,
  initialRowsPerPage,
  ...rest
}) => {
  return (
    <TableContextProvider
      value={{
        columns,
        rows,
        maxRows,
        useIndexes,
        useGrid,
        scrollPreset,
        maxHeight,
        stickyHeader,
        stickyFooter,
        className,
        indexRenderer,
        columnTitleRenderer,
        cellRenderer,
        actionsRenderer,
        initialRowsPerPage,
        ...rest,
      }}
    >
      <TableContent />
    </TableContextProvider>
  );
};

Table.propTypes = {
  /**
   * Should row separators be displayed. Possible values: true | false
   */
  useGrid: PropTypes.bool,
  /**
   * Should indexing be displayed. Possible values: true | false
   */
  useIndexes: PropTypes.bool,
  /**
   * Should footer be always visible. Possible values: true | false
   */
  stickyFooter: PropTypes.bool,
  /**
   * Should header be always visible. Possible values: true | false
   */
  stickyHeader: PropTypes.bool,
  /**
   * Initial rows per page value.
   */
  initialRowsPerPage: PropTypes.oneOf([5, 10, 20, 50, 100]),
  /**
   * Max height of the table, works only if scrollPreset is set to 'internal'.
   */
  maxHeight: PropTypes.number,
  /**
   * Force amount of records.
   */
  maxRows: PropTypes.number,
  /**
   * Scroll preset.
   */
  scrollPreset: PropTypes.oneOf(getJSMapKeysArray(scrollPresetMap)),
  /**
   * Function used to render index cells.
   */
  indexRenderer: PropTypes.func,
  /**
   * Function used to render title cells.
   */
  columnTitleRenderer: PropTypes.func,
  /**
   * Function used to render data cells.
   */
  cellRenderer: PropTypes.func,
  /**
   * Function used to render action cells.
   */
  actionsRenderer: PropTypes.func,
  /**
   * Columns of the table.
   */
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  /**
   * Rows of the table.
   */
  rows: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        title: PropTypes.string,
        type: PropTypes.string,
        data: PropTypes.shape({}),
      })
    )
  ).isRequired,
};

Table.defaultProps = {
  useGrid: false,
  useIndexes: false,
  stickyFooter: false,
  stickyHeader: false,
  scrollPreset: 'page',
  maxHeight: 600,
  indexRenderer: defaultRender,
  columnTitleRenderer: defaultRender,
  cellRenderer: defaultRender,
  actionsRenderer: defaultRender,
  initialRowsPerPage: 5,
  maxRows: null,
};

export default Table;
