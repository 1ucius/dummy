import React from 'react';

import classnames from 'classnames';

import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TableFooter from './TableFooter';

import { Loader } from '../Loader';

import { Scrollbar } from '../Scrollbar';

import { useTable } from './TableContext';

import styles from './Table.module.css';

const TableContent = () => {
  const {
    stickyFooter,
    stickyHeader,
    isPageScroll,
    maxHeight: h,
    onContainerScroll,
    className,
    scrollRefCallback,
    isFetching,
  } = useTable();

  const isHeaderOutside = isPageScroll && stickyHeader;
  const isFooterOutside = isPageScroll && stickyFooter;

  const maxHeight = `${h}px`;

  return (
    <>
      {/* {isHeaderOutside && <TableHeader />} */}
      <Scrollbar
        refCallback={scrollRefCallback}
        autoMaxHeight={!isPageScroll && maxHeight}
        maxHeight={!isPageScroll && maxHeight}
        onScrollFrame={scroll => onContainerScroll(scroll)}
        onlyHorizontal={isPageScroll}
        fullHeightView
      >
        <table className={classnames(styles.DataTable, className)}>
          {/* {!isHeaderOutside && <TableHeader />} */}
          <TableHeader />
          {isFetching ? <Loader /> : <TableBody />}
          {/* {!isFooterOutside && <TableFooter />} */}
        </table>
      </Scrollbar>
      <TableFooter />
      {/* {isFooterOutside && <TableFooter />} */}
    </>
  );
};

export default TableContent;
