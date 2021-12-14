import * as React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import { Expandable } from '../Expandable';

import MenuOption from './MenuOption';

const MenuList = ({
  children,
  headerClassName,
  itemsClassName,
  forceCollapsed,
  onClick,
  ...rest
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const [initialCheckDone, setInitialCheckDone] = React.useState(false);

  const checkIfNeedToExpand = React.useCallback(
    isActive => {
      console.log({ expanded });
      if (!isActive) return;
      if (initialCheckDone || expanded) return;
      setExpanded(isActive);
      setInitialCheckDone(true);
    },
    [expanded]
  );

  const getIsOpened = React.useMemo(() => {
    if (forceCollapsed) return false;

    return expanded;
  }, [forceCollapsed, expanded]);

  return (
    <>
      <MenuOption
        uppercase
        onClick={e => {
          setExpanded(expanded => !expanded);
          onClick(e);
        }}
        expanded={expanded}
        arrow
        pathCheckCallback={checkIfNeedToExpand}
        className={classnames(headerClassName)}
        {...rest}
      />
      <Expandable isOpened={getIsOpened} unmountClosed>
        {children}
      </Expandable>
    </>
  );
};

MenuList.propTypes = {
  /**
   * Children elements.
   */
  children: PropTypes.node,
};

MenuList.defaultProps = {
  children: null,
};

export default MenuList;
