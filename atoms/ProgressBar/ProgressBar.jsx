import * as React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import { Typo } from '../Typo';
import { Flex, FlexItem } from '../Flex';

import styles from './ProgressBar.module.css';

const ProgressBar = React.forwardRef(function ProgressBar(
  { value, max, useTitle, noUnit, className, ...rest },
  ref
) {
  const progressRef = React.useRef(ref);

  const val = noUnit ? value : Math.round((value / max) * 100);

  return (
    <Flex
      className={classnames(styles.Container, className)}
      alignItems='center'
      skipWrapper
      {...rest}
    >
      <FlexItem
        as='progress'
        ref={progressRef}
        className={styles.Progress}
        value={value}
        max={max}
        grow
      />
      {useTitle && (
        <FlexItem
          as={Typo}
          preset='heading5'
          label={noUnit ? `${val}/${max}` : `${val}%`}
          className={styles.Title}
        />
      )}
    </Flex>
  );
});

ProgressBar.propTypes = {
  value: PropTypes.number, // !ADD TYPECHECK FOR NEGATIVE VALUES
  max: PropTypes.number,
  useTitle: PropTypes.bool,
  noUnit: PropTypes.bool,
};

ProgressBar.defaultProps = {
  value: 75,
  max: 100,
  useTitle: true,
  noUnit: false,
};

export default ProgressBar;
