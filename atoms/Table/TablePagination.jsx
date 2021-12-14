import React from 'react';

import { Pagination } from '../Pagination';

import { useTable } from './TableContext';

const TablePagination = () => {
  const {
    page,
    setPage,
    rowsPerPage,
    recordsNumber,
    backDisabled,
    forwardDisabled,
    pagesNumber,
  } = useTable();

  return (
    <Pagination
      preset='items'
      setPage={setPage}
      backDisabled={backDisabled}
      forwardDisabled={forwardDisabled}
      itemsNumber={recordsNumber}
      itemsPerPage={rowsPerPage}
      currentPage={page}
      pagesAmount={pagesNumber}
    />
  );
};

export default TablePagination;
