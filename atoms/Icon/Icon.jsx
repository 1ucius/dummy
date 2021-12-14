import * as React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import { useHover } from 'react-use';

import { colorsMap, colorsOptions, getJSMapKeysArray } from '../../cssMaps';

import styles from './Icon.module.css';

export const iconSizeMap = {
  extraTiny: 'extraTiny',
  tiny: 'tiny',
  extraSmall: 'extraSmall',
  small: 'small',
  normal: 'normal',
  medium: 'medium',
  large: 'large',
  logo: 'logo',
};

export const sizeToStyleMap = {
  extraTiny: styles.ExtraTiny,
  tiny: styles.Tiny,
  extraSmall: styles.ExtraSmall,
  small: styles.Small,
  normal: styles.Normal,
  medium: styles.Medium,
  large: styles.Large,
  logo: styles.Logo,
};

export const rotateMap = {
  unset: null,
  45: '45',
  90: '90',
  135: '135',
  180: '180',
  225: '225',
  270: '270',
  315: '315',
  neg45: '-45',
  neg90: '-90',
  neg135: '-135',
  neg180: '-180',
  neg225: '-225',
  neg270: '-270',
  neg315: '-315',
};

const Icon = React.forwardRef(
  (
    {
      size,
      customSize,
      color,
      hoverColor,
      className,
      children,
      viewBox,
      noFill,
      noStroke,
      rotateDegrees,
      forceHovered,
      ...rest
    },
    ref
  ) => {
    const getRegularColor = React.useCallback(
      () => ({
        '--fill': noFill ? 'none' : colorsMap[color],
        '--stroke': noStroke ? 'none' : colorsMap[color],
      }),
      [colorsMap, color, noFill, noStroke]
    );

    const getHoverColor = React.useCallback(
      () => ({
        '--fill': noFill ? 'none' : colorsMap[hoverColor],
        '--stroke': noStroke ? 'none' : colorsMap[hoverColor],
      }),
      [colorsMap, hoverColor, noFill, noStroke]
    );

    const element = isHovered => (
      <svg
        ref={ref}
        viewBox={viewBox}
        className={classnames(
          styles.Icon,
          !customSize && sizeToStyleMap[size],
          className
        )}
        style={{
          ...((isHovered || forceHovered) && colorsMap[hoverColor]
            ? getHoverColor()
            : getRegularColor()),
          '--rotate': rotateDegrees && `${rotateMap[rotateDegrees]}deg`,
          '--custom-size': customSize && `${customSize}px`,
        }}
        // preserveAspectRatio='xMidYMid slice'
        {...rest}
      >
        {children}
      </svg>
    );

    const [hoverable, hovered] = useHover(element);

    return hoverable;
  }
);

Icon.propTypes = {
  /**
   * Set size of the Icon
   * !!!Works if customSize is set to 0 or null
   */
  size: PropTypes.oneOf(Object.keys(iconSizeMap)),
  /**
   * Set custom size (applies to height, width is automatically calculated based on height)
   */
  customSize: PropTypes.number,
  /**
   * Set color of the Icon
   */
  color: PropTypes.oneOf(colorsOptions),
  /**
   * Set :hover color
   */
  hoverColor: PropTypes.oneOf(colorsOptions),
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
   * Additional class names
   */
  className: PropTypes.string,
  /**
   * Remove fill
   */
  noFill: PropTypes.bool,
  /**
   * Remove stroke
   */
  noStroke: PropTypes.bool,
  /**
   * Override hovered state of the Icon
   */
  forceHovered: PropTypes.bool,
  /**
   * Rotate icon N degrees
   */
  rotateDegrees: PropTypes.oneOf(getJSMapKeysArray(rotateMap)),
};

Icon.defaultProps = {
  size: 'small',
  customSize: null,
  color: 'default',
  hoverColor: 'unset',
  className: '',
  noFill: false,
  noStroke: false,
  forceHovered: false,
  rotateDegrees: null,
};

export default Icon;
