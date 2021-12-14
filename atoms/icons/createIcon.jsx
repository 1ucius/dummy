import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from '../Icon';

function createIcon(path, { displayName, ...props }) {
  const IconComponent = React.forwardRef((iconProps, ref) => (
    <Icon ref={ref} {...props} {...iconProps}>
      {path}
    </Icon>
  ));

  IconComponent.displayName = displayName;

  return IconComponent;
}

createIcon.PropTypes = {
  /**
   * Actual SVG path (prop of "func" type should return SVG path DOM element)
   */
  children: PropTypes.oneOfType([
    PropTypes.node.isRequired,
    PropTypes.func.isRequired,
  ]).isRequired,
  /**
   * Size of a viewbox (Defined on per icon basis in 'src/atoms/icons/index.jsx')
   */
  viewBox: PropTypes.string.isRequired,
  /**
   * Name of React component of the Icon
   */
  displayName: PropTypes.string.isRequired,
};

export default createIcon;
