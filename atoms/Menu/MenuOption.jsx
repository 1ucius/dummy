import * as React from 'react';

import classnames from 'classnames';
import PropTypes from 'prop-types';

import { ChevronIcon } from '../icons';

import { Flex, FlexItem } from '../Flex';

import { Typo } from '../Typo';
import NavLink from '../NavLink';
import Tooltip from '../Tooltip';

import getIcon from './icons';

import styles from './MenuItems.module.css';

const MenuOption = ({
  as,
  data,
  uppercase,
  onClick,
  arrow,
  expanded,
  linkDisabled,
  pathCheckCallback,
  className,
  useTootip,
}) => {
  const { path, icon, iconSize, chevronSize, name } = data;

  const content = (
    <Flex
      as={as}
      to={path}
      className={classnames(
        styles.MenuItem,
        {
          [styles.expanded]: expanded,
        },
        className
      )}
      onClick={() => onClick()}
      alignItems='center'
      skipWrapper
    >
      {icon && getIcon({ name: icon, size: iconSize })}
      <FlexItem basis='1'>
        <Typo
          className={classnames(styles.MenuItemText)}
          label={name}
          uppercase={uppercase}
          ellipsis
          fluid
        />
      </FlexItem>
      {arrow && (
        <ChevronIcon
          size={chevronSize || 'tiny'}
          className={styles.MenuItemArrow}
        />
      )}
    </Flex>
  );

  const handleClick = event => {
    if (linkDisabled) {
      event.preventDefault();
    }
  };

  const getContent = useTootip ? (
    <Tooltip appearDelay={800} component={content} label={name} arrow />
  ) : (
    content
  );

  return path ? (
    <NavLink
      style={{ textDecoration: 'none' }}
      to={path}
      onClick={handleClick}
      pathCheckCallback={pathCheckCallback}
      activeClass={styles.activeNavLink}
      fluid
    >
      {getContent}
    </NavLink>
  ) : (
    getContent
  );
};

MenuOption.defaultProps = {
  as: 'div',
  data: null,
  arrow: false,
  expanded: false,
  uppercase: false,
  linkDisabled: false,
  onClick: () => null,
  pathCheckCallback: () => null,
  className: null,
  useTootip: false,
};

export default MenuOption;
