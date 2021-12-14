import * as React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import { UnmountClosed, Collapse } from 'react-collapse';

import styles from './Expandable.module.css';

const Expandable = ({
  unmountClosed = false,
  isOpened = false,
  className,
  children,
}) => {
  const Component = unmountClosed ? UnmountClosed : Collapse;

  return (
    <Component
      theme={{
        collapse: classnames(styles.Collapse, className),
        content: styles.CollapseContent,
      }}
      isOpened={isOpened}
    >
      {children}
    </Component>
  );
};

export default Expandable;
