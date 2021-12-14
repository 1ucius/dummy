import React from 'react';

import { Flex, FlexItem } from '../Flex';

import { Typo } from '../Typo';

import Select from '../Select';

import { useTable } from './TableContext';

import styles from './TableFooter.module.css';

const TableRowsSelect = () => {
  const { rowsPerPage, rowsPerPageOptions, changeRowsPerPage } = useTable();

  return (
    <Flex skipWrapper alignItems='center'>
      <FlexItem>
        <Typo
          preset='caption'
          color='darkGrey'
          className={styles.RowsPerPageText}
          label='Rows per page:'
          noUserSelect
          ellipsis
          fluid
        />
      </FlexItem>
      <FlexItem>
        <Select
          size='small'
          invisible
          value={rowsPerPage}
          options={rowsPerPageOptions}
          onChange={({ value }) => changeRowsPerPage(value)}
          isNullable={false}
          autoHeightMax='100%'
        />
      </FlexItem>
    </Flex>
  );
};

export default TableRowsSelect;
