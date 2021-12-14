import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { ToggleSidebarIcon } from '../icons';
import Button from '../Button';
import Transition from '../CSSTransition';
import Portal from '../Portal';

import Content from './Content';

import { useSidebar } from './SidebarContext';

import styles from './Sidebar.module.css';

const Sidebar = ({ side, children, setSidebarOpened, className }) => {
  const { sidebarOpened } = useSidebar();

  const navRef = React.useRef();

  const toggleSidebar = React.useCallback(
    () => setSidebarOpened(!sidebarOpened),
    [sidebarOpened]
  );

  return (
    <Portal>
      <Transition
        nodeRef={navRef}
        key='mainsidebar'
        type='width'
        show={sidebarOpened}
        style={{
          '--width-in': 'var(--sidebar-width)',
          '--width-out': 'var(--sidebar-collapsed-width)',
        }}
      >
        <nav
          ref={navRef}
          className={classnames(styles.Sidebar, styles[side], className)}
          style={{
            width: sidebarOpened
              ? 'var(--sidebar-width)'
              : 'var(--sidebar-collapsed-width)',
          }}
        >
          <Content>{children}</Content>
        </nav>
      </Transition>
      <Button
        preset='invisible'
        className={classnames(
          styles.ToggleSidebar,
          sidebarOpened && styles.opened
        )}
        onClick={toggleSidebar}
      >
        <ToggleSidebarIcon
          size='small'
          rotateDegrees={sidebarOpened ? 'unset' : 180}
          hoverColor='blue'
        />
      </Button>
    </Portal>
  );
};

Sidebar.defaultProps = {
  side: 'left',
  children: null,
};

Sidebar.propTypes = {
  side: PropTypes.string,
  children: PropTypes.node,
};

export default Sidebar;
