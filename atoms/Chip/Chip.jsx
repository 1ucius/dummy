import * as React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import * as icons from '../icons';

import { Typo } from '../Typo';
import Tooltip from '../Tooltip';

import { getComponentsMap, trimString } from '../../helpers';

import styles from './Chip.module.css';

const Chip = React.forwardRef(function Chip(
  {
    as: Component,
    icon,
    type,
    className,
    onClick,
    label,
    maxLabelWidth,
    tooltip,
    tooltipFullWidth,
    ...rest
  },
  ref
) {
  const clickHandler = React.useCallback(
    e => {
      if (onClick) onClick(e);
    },
    [onClick]
  );

  const getLabel = React.useCallback(() => {
    if (label.length <= maxLabelWidth) return label;

    return trimString(label, maxLabelWidth);
  }, [label, maxLabelWidth]);

  const IconComponent = icons[icon];

  const Reference = (
    <Component
      ref={ref}
      type={type}
      className={classnames(
        styles.Chip,
        !IconComponent && styles.NoPaddingRight,
        className
      )}
      onClick={clickHandler}
      onKeyPress={e => {
        if (e.key === 'Enter') clickHandler(e);
      }}
      tabIndex='0'
      {...rest}
    >
      {<Typo preset='input' label={getLabel()} color='darkBlue' noUserSelect />}
      {IconComponent && (
        <IconComponent
          className={styles.ChipIcon}
          color='softBlack'
          size='tiny'
          tabIndex='-1'
        />
      )}
    </Component>
  );

  if (!tooltip) return Reference;

  return (
    <Tooltip
      component={Reference}
      label={label}
      fullWidth={tooltipFullWidth}
      arrow
    />
  );
});

Chip.propTypes = {
  as: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  icon: PropTypes.oneOf(getComponentsMap(icons)),
  type: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  label: PropTypes.string.isRequired,
  tooltip: PropTypes.bool,
  tooltipFullWidth: PropTypes.bool,
  maxLabelWidth: PropTypes.number,
};

Chip.defaultProps = {
  icon: 'CrossBoldIcon',
  as: 'button',
  type: 'button',
  tooltip: false,
  tooltipFullWidth: false,
  className: null,
  onClick: null,
  maxLabelWidth: 15,
};

export default Chip;
