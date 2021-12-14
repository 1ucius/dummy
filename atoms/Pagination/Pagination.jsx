import * as React from 'react';
import PropTypes from 'prop-types';

import { PaginationContextProvider } from './PaginationContext';

import ItemsPagination from './ItemsPagination';
import PagesPagination from './PagesPagination';

import { allowNull } from '../../helpers';

import { getJSMapKeysArray } from '../../cssMaps';

export const paginationPresetMap = {
  pages: 'pages',
  items: 'items',
};

const Pagination = React.forwardRef(function PagePagination(
  {
    setPage,
    currentPage,
    pagesAmount,
    siblingsCount,
    itemsPerPage,
    itemsNumber,
    preset,
    className,
    ...rest
  },
  ref
) {
  const getPagination = React.useCallback(() => {
    switch (preset) {
      case paginationPresetMap.pages:
        return <PagesPagination />;
      case paginationPresetMap.items:
        return <ItemsPagination />;
      default:
        throw new Error('Unknown pagination preset');
    }
  }, [preset]);

  return (
    <PaginationContextProvider
      value={{
        setPage,
        currentPage,
        pagesAmount,
        itemsPerPage,
        itemsNumber,
        preset,
        className,
        ...rest,
      }}
    >
      {getPagination()}
    </PaginationContextProvider>
  );
});

Pagination.propTypes = {
  setPage: PropTypes.func.isRequired,
  currentPage: PropTypes.number,
  pagesAmount: PropTypes.number,
  siblingsCount: PropTypes.number,
  itemsPerPage: allowNull(PropTypes.number),
  itemsNumber: allowNull(PropTypes.number),
  preset: PropTypes.oneOf(getJSMapKeysArray(paginationPresetMap)),
};

Pagination.defaultProps = {
  currentPage: 1,
  pagesAmount: 10,
  siblingsCount: 1,
  itemsPerPage: null,
  itemsNumber: null,
  preset: 'pages',
};

export default Pagination;
