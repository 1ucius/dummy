import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import * as icons from '../icons';
import { Typo } from '../Typo';
import { Flex, FlexItem } from '../Flex';

import styles from './StateInfo.module.css';

const StateInfo = React.forwardRef(function StateInfo(
  { children, className, title, subtitle, icon },
  ref
) {
  const IconComponent = icons[icon];

  return (
    <Flex alignItems='center' justifyContent='center' fluid>
      <Flex
        direction='column'
        alignItems='center'
        skipWrapper
        className={classNames(styles.root, className)}
      >
        <FlexItem>
          <Typo
            preset='heading2'
            label={title}
            className={styles.title}
            color='softBlack'
            align='center'
            fluid
          />
        </FlexItem>
        <FlexItem>
          <Typo
            preset='paragraph'
            label={subtitle}
            className={styles.subtitle}
            color='darkBlueAlpha65'
            align='center'
            fluid
          />
        </FlexItem>
        <Flex
          justifyContent='center'
          alignItems='center'
          className={styles.icon}
        >
          <IconComponent customSize={60} color='blue' />
        </Flex>
        <FlexItem>{children}</FlexItem>
      </Flex>
    </Flex>
  );
});

StateInfo.propTypes = {
  /**
   * Children elements.
   */
  children: PropTypes.node,
  /**
   * Main title message.
   */
  title: PropTypes.string,
  /**
   * Subtitle message.
   */
  subtitle: PropTypes.string,
  /**
   * Icon name what should be displayed.
   */
  icon: PropTypes.string,
  /**
   * Additional class names.
   */
  className: PropTypes.string,
};

StateInfo.defaultProps = {
  children: null,
  title: '',
  subtitle: '',
  icon: '',
  className: '',
};

export default StateInfo;
