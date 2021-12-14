import * as React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import get from 'lodash.get';

import { Typo } from '../Typo';
import { Flex, FlexItem } from '../Flex';
import { NoticeFilledIcon } from '../icons';

import { getJSMapKeysArray } from '../../cssMaps';

import styles from './Field.module.css';

export const fieldDirectionMap = {
  row: 'row',
  column: 'column',
};

const Error = ({ err }) => (
  <Typo
    as='p'
    className={styles.FieldError}
    preset='caption'
    color='errorRed'
    label={`*${err}`}
    lineClamp={2}
    noUserSelect
    fluid
  />
);

const Field = React.forwardRef(function Field(
  {
    as: Component,
    id,
    name,
    direction,
    className,
    wrapperClassName,
    label,
    message,
    errors,
    children,
    isRequired,
    ...rest
  },
  ref
) {
  const invalid = get(errors, name);

  const renderErrors = React.useCallback(() => {
    if (Array.isArray(invalid)) {
      return invalid.map(err => <Error key={err} err={err} />);
    }

    return <Error err={invalid} />;
  }, [invalid]);

  id = id || name;

  const basis = direction === fieldDirectionMap.column ? 1 : 0;

  return (
    <Flex
      as={Component}
      ref={ref}
      direction={direction}
      className={classnames(styles.Field, wrapperClassName)}
      skipWrapper
      {...rest}
    >
      {label && (
        <FlexItem
          basis={basis}
          className={classnames(
            styles.FieldLabel,
            !basis && styles.FieldLableInline
          )}
          grow={direction !== fieldDirectionMap.column}
        >
          <Typo
            as='label'
            htmlFor={id}
            preset='input'
            label={label}
            lineClamp={2}
            noUserSelect
            fluid
          >
            {isRequired && (
              <Typo as='span' preset='input' color='red' label='*' />
            )}
          </Typo>
        </FlexItem>
      )}
      <FlexItem basis={basis}>
        <Flex direction='column' skipWrapper>
          <FlexItem basis='1' grow>
            {children}
          </FlexItem>
          {message && (
            <FlexItem basis='1' className={styles.FieldMessage}>
              <Flex alignItems='center' gap='5xs'>
                <NoticeFilledIcon customSize={14} color='mediumGrey' />
                <Typo
                  as='p'
                  label={message}
                  preset='caption'
                  color='mediumGrey'
                  lineClamp={2}
                  noUserSelect
                  fluid
                />
              </Flex>
            </FlexItem>
          )}
          {invalid && (
            <FlexItem basis='1' className={styles.FieldErrors}>
              <Flex direction='column'>{renderErrors()}</Flex>
            </FlexItem>
          )}
        </Flex>
      </FlexItem>
    </Flex>
  );
});

Field.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.func]),
  children: PropTypes.node.isRequired,
  direction: PropTypes.oneOf(getJSMapKeysArray(fieldDirectionMap)),
  errors: PropTypes.shape({}),
  message: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  wrapperClassName: PropTypes.string,
  isRequired: PropTypes.bool,
};

Field.defaultProps = {
  as: 'div',
  direction: 'row',
  className: null,
  wrapperClassName: null,
  message: null,
  errors: {},
  isRequired: false,
  label: null,
};

export default Field;
