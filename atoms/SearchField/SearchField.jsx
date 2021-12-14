import * as React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import { Input } from '../Input';
import { Flex, FlexItem } from '../Flex';
import Transition from '../CSSTransition';
import Button from '../Button';

import { CrossIcon, SearchSimpleIcon } from '../icons';

import { isEmptyString, isEnterKey } from '../../helpers';

import styles from './SearchField.module.css';

const SearchField = ({
  onButtonClick,
  onClearClick,
  className,
  value,
  minCharacters,
  ...rest
}) => {
  const showClearButton = !isEmptyString(value);
  const submitEnabled = value.length >= minCharacters || !value.length;

  const onKeyPress = React.useCallback(
    e => {
      if (isEnterKey(e) && submitEnabled) {
        onButtonClick(e);
      }
    },
    [submitEnabled]
  );

  return (
    <Flex
      skipWrapper
      gap='4xs'
      alignItems='center'
      className={classnames(styles.SearchField, className)}
      inline
    >
      <FlexItem className={styles.InputWrapper}>
        <SearchSimpleIcon
          size='small'
          color='gullGrey'
          className={styles.InputAdornment}
        />
        <Input value={value} onKeyPress={onKeyPress} {...rest} />
        <Transition show={showClearButton} type='fade' unmountOnExit>
          <Button
            className={styles.ClearButton}
            preset='invisible'
            icon={props => (
              <CrossIcon
                size='small'
                color='gullGrey'
                hoverColor='blue'
                {...props}
              />
            )}
            onClick={onClearClick}
            additionalHoverZone
          />
        </Transition>
      </FlexItem>
      <FlexItem>
        <Button
          label='Search'
          onClick={onButtonClick}
          noMinWidth
          disabled={!submitEnabled}
        />
      </FlexItem>
    </Flex>
  );
};

SearchField.propTypes = {
  onButtonClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  minCharacters: PropTypes.number,
};

SearchField.defaultProps = {
  className: null,
  minCharacters: 3,
};

export default SearchField;
