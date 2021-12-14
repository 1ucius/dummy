import React from 'react';

import classnames from 'classnames';

import { Flex, FlexItem } from '../Flex';

import TablePagination from './TablePagination';
import TableRowsSelect from './TableRowsSelect';

import { useTable } from './TableContext';

import { useResizeObserver } from '../../hooks';

import styles from './TableFooter.module.css';

const TableFooter = ({ className }) => {
  const { stickyFooter, footerRef, scrollRef, footerWidth, setFooterWidth } =
    useTable();

  // if (!scrollRef) return null;

  // const [isResized, size] = useResizeObserver({
  //   current: scrollRef?.current?.container,
  // });

  // React.useEffect(() => {
  //   if (isResized) setFooterWidth(size.width);
  // }, [isResized, size]);

  return (
    <FlexItem
      ref={footerRef}
      as='tr'
      basis='1'
      className={classnames(
        styles.Footer,
        stickyFooter && styles.Sticky,
        className
      )}
      // forceWidth={footerWidth}
    >
      <Flex as='td' justifyContent='space-between' alignItems='center'>
        <TableRowsSelect />
        <TablePagination />
      </Flex>
    </FlexItem>
  );
};

export default TableFooter;
