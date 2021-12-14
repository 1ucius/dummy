import * as React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import Lottie from 'react-lottie';

import { Typo } from '../Typo';
import { Flex, FlexItem } from '../Flex';

import animationData from './loader-lottie';

import styles from './Loader.module.css';

const Loader = React.forwardRef(function Loader(
  { alt = 'Loading', size, useBackdrop, className, ...rest },
  ref
) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
    eventListeners: null,
  };

  return (
    <Flex
      ref={ref}
      className={classnames(
        styles.Container,
        useBackdrop && styles.WithBackdrop,
        className
      )}
      skipWrapper
      direction='column'
      alignItems='center'
      justifyContent='center'
      {...rest}
    >
      <FlexItem as='div' className={classnames(styles.Spinner, className)}>
        <Lottie options={defaultOptions} height={size} width={size} />
      </FlexItem>
      {alt && (
        <FlexItem>
          <Typo
            label={alt}
            preset='paragraph'
            align='center'
            ellipsis
            fluid
            noUserSelect
          />
        </FlexItem>
      )}
    </Flex>
  );
});

Loader.propTypes = {
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  size: PropTypes.number,
  useBackdrop: PropTypes.bool,
};

Loader.defaultProps = {
  className: '',
  size: 24,
  useBackdrop: false,
};

export default Loader;
