import React from 'react';
import classnames from 'classnames';

import { Scrollbar } from '../Scrollbar';

import styles from './PageContent.module.css';

const PageContent = ({ children, className }) => {
  return (
    <div className={classnames(styles.PageContent, className)}>
      <Scrollbar onlyVertical fullHeightView size='large'>
        <div className={styles.PageContentInner}>{children}</div>
      </Scrollbar>
    </div>
  );
};

export default PageContent;
