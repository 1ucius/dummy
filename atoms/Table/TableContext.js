import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const scrollPresetMap = {
  page: 'page',
  internal: 'internal',
};

const rowsNumbers = [5, 10, 20, 50, 100];

const rowsPerPageMap = rowsNumbers.map(num => ({
  value: num,
  label: `${num}`,
}));

const cellTypesMap = {
  ACTION: 'action',
};

export const TableContext = createContext();

export const TableContextProvider = ({
  value: {
    columns: newColumns,
    rows: newRows,
    maxRows,
    useIndexes,
    useGrid,
    indexRenderer,
    columnTitleRenderer,
    cellRenderer,
    actionsRenderer,
    scrollPreset,
    initialRowsPerPage,
    handlePagesChange,
    handleRowsChange,
    forcePage,
    handleFetch,
    isFetching,
    ...props
  },
  children,
  ...rest
}) => {
  const [rows, setRows] = useState(newRows);
  const [columns, setColumns] = useState(newColumns);

  const [page, setPage] = useState(0);

  const [rowsPerPageValues] = useState(rowsNumbers);
  const [rowsPerPage, setRowsPerPage] = useState(
    initialRowsPerPage || rowsNumbers[1]
  );
  const [rowsPerPageOptions] = useState(rowsPerPageMap);

  const footerRef = React.useRef(null);
  const [footerWidth, setFooterWidth] = React.useState(null);

  const [scrollRef, setScrollRef] = React.useState(null);
  const [scrollProgress, setScrollProgress] = React.useState({});

  const [hasActions] = React.useState(
    !!columns.filter(r => r.type === cellTypesMap.ACTION).length
  );

  const scrollRefCallback = React.useCallback(value => setScrollRef(value), []);

  const onContainerScroll = React.useCallback(e => {
    setScrollProgress(e);
  }, []);

  const x = React.useCallback(() => {
    const recordsNumber = maxRows || rows.length;

    const neededItems = Math.min((page + 1) * rowsPerPage, recordsNumber);

    if (rows.length < neededItems && !isFetching) {
      handleFetch(neededItems);
    }
  }, [rows, page, rowsPerPage, isFetching, maxRows]);

  useEffect(() => {
    x();
  }, [page, rowsPerPage]);

  const changeRowsPerPage = React.useCallback(
    value => {
      const currentOffset = page * rowsPerPage;

      if (currentOffset < value) {
        setPage(0);
      } else {
        setPage(Math.floor(currentOffset / value));
      }

      setRowsPerPage(value);
    },
    [page, rowsPerPage]
  );

  const updatePageOnNewRows = React.useCallback(() => {
    if (newRows.length <= rowsPerPage) setPage(0);
  }, [newRows, rowsPerPage]);

  useEffect(() => {
    setRows(newRows);
    updatePageOnNewRows();
  }, [newRows]);

  useEffect(() => setColumns(newColumns), [newColumns]);

  const offset = rowsPerPage * page;

  const recordsNumber = maxRows || rows.length;
  const pagesNumber = Math.ceil(recordsNumber / rowsPerPage);

  const backDisabled = !page;
  const forwardDisabled = page + 1 === pagesNumber;

  const isPageScroll = scrollPreset === scrollPresetMap.page;

  const [selectedRows, setSelectedRows] = React.useState([]);

  const [expandableRows, setExtandableRows] = React.useState({});

  const handleSelectedRows = rowIndex => {
    if (selectedRows.includes(rowIndex)) {
      setSelectedRows(prevState =>
        prevState.filter(index => index !== rowIndex)
      );
    } else {
      setSelectedRows(prevState => [...prevState, rowIndex]);
    }
  };

  const handleExpandableRows = (rowIndex, name, isExpandable) => {
    setExtandableRows(prevState => ({
      ...prevState,
      [rowIndex]: {
        ...prevState[rowIndex],
        [name]: isExpandable,
      },
    }));
  };

  return (
    <TableContext.Provider
      value={{
        rows: rows.slice(offset, offset + rowsPerPage),
        columns,
        recordsNumber,
        pagesNumber,
        useIndexes,
        useGrid,
        indexRenderer,
        columnTitleRenderer,
        cellRenderer,
        actionsRenderer,
        rowsPerPageValues,
        rowsPerPage,
        rowsNumbers,
        rowsPerPageOptions,
        setRowsPerPage,
        changeRowsPerPage,
        page,
        setPage,
        offset,
        cellTypesMap,
        backDisabled,
        forwardDisabled,
        hasActions,
        isPageScroll,
        onContainerScroll,
        footerRef,
        scrollRef,
        scrollRefCallback,
        scrollProgress,
        footerWidth,
        setFooterWidth,
        selectedRows,
        handleSelectedRows,
        expandableRows,
        handleExpandableRows,
        handleFetch,
        isFetching,
        ...props,
        ...rest,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

TableContextProvider.propTypes = {
  value: PropTypes.shape({
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        title: PropTypes.string.isRequired,
      })
    ).isRequired,
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
    useIndexes: PropTypes.bool,
    useGrid: PropTypes.bool,
    indexRenderer: PropTypes.func,
    cellRenderer: PropTypes.func,
    columnTitleRenderer: PropTypes.func,
    actionsRenderer: PropTypes.func,
    scrollPreset: PropTypes.string,
    initialRowsPerPage: PropTypes.oneOf([5, 10, 20, 50, 100]),
  }),
  children: PropTypes.node.isRequired,
};

TableContextProvider.defaultProps = {
  value: {
    useGrid: false,
    useIndexes: false,
    indexRenderer: null,
    columnTitleRenderer: null,
    cellRenderer: null,
    actionsRenderer: null,
  },
};

export function useTable() {
  return useContext(TableContext);
}
