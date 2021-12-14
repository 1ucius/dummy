import React from 'react';

import classnames from 'classnames';

import { Flex, FlexItem } from '../Flex';

import { Typo } from '../Typo';

import Button from '../Button';

import { ChevronIcon } from '../icons';

import { usePaginationContext } from './PaginationContext';

import styles from './ItemsPagination.module.css';

const ItemsPagination = () => {
  const {
    backDisabled,
    forwardDisabled,
    setPage,
    currentPage,
    pagesAmount,
    itemsPerPage,
    itemsNumber,
    pa,
  } = usePaginationContext();

  const offset = currentPage * itemsPerPage;

  return (
    <Flex skipWrapper justifyContent='center' alignItems='center' fluid={false}>
      <FlexItem>
        <Typo
          preset='caption'
          color='darkGrey'
          className={styles.PaginationText}
          label={`${offset + 1}-${Math.min(
            offset + itemsPerPage,
            itemsNumber
          )} of ${itemsNumber} items`}
          noUserSelect
          ellipsis
          fluid
        />
      </FlexItem>
      <FlexItem>
        <Flex>
          <Button
            preset='invisible'
            className={styles.PaginationButton}
            icon={props => (
              <ChevronIcon
                rotateDegrees='90'
                color='mediumGrey'
                hoverColor='blue'
                size='extraSmall'
                {...props}
              />
            )}
            disabled={backDisabled || !currentPage}
            onClick={() => setPage(p => p - 1)}
            noMinWidth
          />
          <Button
            preset='invisible'
            className={classnames(
              styles.PaginationButton,
              styles.PaginationButtonForward
            )}
            icon={props => (
              <ChevronIcon
                rotateDegrees='neg90'
                color='mediumGrey'
                hoverColor='blue'
                size='extraSmall'
                {...props}
              />
            )}
            disabled={forwardDisabled || currentPage === pagesAmount}
            onClick={() => setPage(p => p + 1)}
            noMinWidth
          />
        </Flex>
      </FlexItem>
    </Flex>
  );
};

export default ItemsPagination;
