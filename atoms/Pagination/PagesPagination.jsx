import * as React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import { Flex, FlexItem } from '../Flex';

import { Typo } from '../Typo';

import Button from '../Button';

import { ChevronIcon } from '../icons';

import { usePaginationContext } from './PaginationContext';

import { usePagination, DOTS } from './usePagination';

import styles from './PagesPagination.module.css';

const PagesPagination = () => {
  const { setPage, currentPage, pagesAmount, backDisabled, forwardDisabled } =
    usePaginationContext();

  const page = currentPage + 1;

  const paginationRange = usePagination({
    currentPage: page,
    totalCount: pagesAmount,
  });

  return (
    <Flex
      skipWrapper
      justifyContent='center'
      alignItems='stretch'
      fluid={false}
    >
      <FlexItem>
        <Button
          preset='invisible'
          className={classnames(
            styles.PaginationButton,
            styles.ArrowButton,
            styles.ArrowButtonBack
          )}
          icon={props => (
            <ChevronIcon
              color='softBlack'
              hoverColor='blue'
              size='tiny'
              rotateDegrees='90'
              {...props}
            />
          )}
          disabled={backDisabled || !currentPage}
          onClick={() => setPage(p => --p)}
          noMinWidth
        />
      </FlexItem>

      <FlexItem>
        <Flex>
          {paginationRange.map(({ value, id }) => {
            const useDots = value === DOTS;
            const isActive = value === page;

            return (
              <Button
                className={classnames(
                  styles.PaginationButton,
                  useDots && styles.Dots,
                  isActive && styles.Active
                )}
                key={id}
                preset='invisible'
                onClick={() => setPage(value - 1)}
              >
                <Typo preset='heading6' label={`${value}`} />
              </Button>
            );
          })}
        </Flex>
      </FlexItem>
      <FlexItem>
        <Button
          preset='invisible'
          className={classnames(
            styles.PaginationButton,
            styles.ArrowButton,
            styles.ArrowButtonForward
          )}
          icon={props => (
            <ChevronIcon
              color='softBlack'
              hoverColor='blue'
              size='tiny'
              rotateDegrees='neg90'
              {...props}
            />
          )}
          disabled={forwardDisabled || page === pagesAmount}
          onClick={() => setPage(p => ++p)}
          noMinWidth
          grow
        />
      </FlexItem>
    </Flex>
  );
};

export default PagesPagination;
