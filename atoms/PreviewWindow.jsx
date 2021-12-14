import React from 'react';

import classnames from 'classnames';

import { Surface } from '.';

import { Typo } from './Typo';
import { Flex } from './Flex';
import { WarningIcon } from './icons';

import styles from './PreviewWindow.module.css';

const PreviewWindow = ({ children, level, isTall, isInProgress, style }) => {
  return (
    <Surface
      className={classnames(styles.StorybookPreview, isTall && styles.Tall)}
      level={level}
      style={{ transition: '0s linear', ...style }}
    >
      {isInProgress && (
        <Flex className={styles.InProgress} alignItems='center' gap='3xs'>
          <WarningIcon size='medium' color='yellow' />
          <Typo
            preset='heading4'
            color='yellow'
            label='Work In Progress'
            noUserSelect
          />
        </Flex>
      )}
      {children}
    </Surface>
  );
};

PreviewWindow.defaultProps = {
  level: 'level5',
  isTall: false,
  isInProgress: false,
};

export default PreviewWindow;
