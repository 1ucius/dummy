import * as React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import { useHover } from 'react-use';

import { Typo } from '../Typo';
import { Flex } from '../Flex';
import * as icons from '../icons';

import { getJSMapKeysArray } from '../../cssMaps';
import { buttonComponentsMap } from '../../jsMaps';
import { getComponentsMap, callEventWithoutPropagation } from '../../helpers';

import styles from './Button.module.css';

export const buttonPresetToStylesMap = {
  invisible: styles.PresetInvisible,
  default: styles.PresetPrimary,
  primary: styles.PresetPrimary,
  secondary: styles.PresetSecondary,
  action: styles.PresetAction,
  link: styles.PresetLink,
  linkNeutral: styles.PresetLinkNeutral,
  icon: styles.PresetIcon,
};

export const typoPresetByButtonPreset = {
  invisible: 'default',
  default: 'buttonPrimary',
  primary: 'buttonPrimary',
  secondary: 'buttonSecondary',
  action: 'actionButton',
  link: 'link',
  linkNeutral: 'linkNeutral',
  icon: 'buttonSecondary',
};

export const typoSmallPresetByButtonPreset = {
  primary: 'buttonPrimarySmall',
  secondary: 'buttonSecondarySmall',
  invisible: 'default',
  default: 'buttonPrimary',
  action: 'actionButton',
  link: 'link',
  linkNeutral: 'linkNeutral',
  icon: 'buttonSecondarySmall',
};

export const buttonSizeMap = {
  normal: 'normal',
  small: 'small',
};

export const buttonStyleBySizeMap = {
  normal: null,
  small: styles.Small,
};

const Button = React.forwardRef(function Button(
  {
    as,
    preset,
    size,
    label,
    disabled,
    fluid,
    noMinWidth,
    additionalHoverZone,
    className,
    onClick,
    preventEventPropagation,
    children,
    icon,
    isIrreversibleAction,
    ...rest
    // !IN PROGRESS
    // type,
    // to,
  },
  ref
) {
  const getIcon = React.useCallback(
    iconProps => {
      const iconType = typeof icon;

      const IconComponent = iconType === 'string' ? icons[icon] : icon;

      return (
        <IconComponent
          {...(preset === 'icon' && {
            size: 'tiny',
            color: 'white',
            hoverColor: 'white',
          })}
          {...(preset === 'icon' &&
            size === buttonSizeMap.small && {
              size: 'extraTiny',
              color: 'white',
              hoverColor: 'white',
            })}
          {...(preset === 'link' && {
            color: 'blue',
          })}
          {...iconProps}
        />
      );
    },
    [icon, preset, size]
  );

  const Component = buttonComponentsMap[as] || 'button';

  const isSmall = size === buttonSizeMap.small;

  const element = isHovered => (
    <Component
      ref={ref}
      // type={to ? undefined : type}
      // to={to}
      className={classNames(
        styles.Button,
        buttonPresetToStylesMap[preset],
        buttonStyleBySizeMap[size],
        icon && styles.WithIcon,
        fluid && styles.Fluid,
        noMinWidth && styles.NoMinWidth,
        isIrreversibleAction && styles.RedIrreversibleAction,
        additionalHoverZone && styles.AdditionalHoverZone,
        className
      )}
      onClick={e => {
        if (preventEventPropagation) {
          return callEventWithoutPropagation({ e, callback: onClick });
        }

        onClick(e);
      }}
      disabled={disabled}
      {...rest}
    >
      {additionalHoverZone && <div className={styles.HoverZone} />}
      <Flex direction='row' alignItems='center' justifyContent='center'>
        {icon && (
          <div className={styles.IconWrapper}>
            {getIcon({
              forceHovered: isHovered,
            })}
          </div>
        )}
        {label && (
          <Typo
            preset={
              isSmall
                ? typoSmallPresetByButtonPreset[preset]
                : typoPresetByButtonPreset[preset]
            }
            label={label}
            hovered={isHovered}
            align='center'
            noUserSelect
            ellipsis
            fluid
            flex={{ grow: !icon }}
          />
        )}
        {children}
      </Flex>
    </Component>
  );

  const [hoverable] = useHover(element);

  return hoverable;
});

export const buttonPropTypes = {
  /**
   * DOM element Button component should render as. Possible values:
   */
  as: PropTypes.oneOf(getComponentsMap(buttonComponentsMap, true)),
  /**
   * Choose from style presets. Possible values:
   */
  preset: PropTypes.oneOf(getJSMapKeysArray(buttonPresetToStylesMap)),
  /**
   * Choose from style presets. Possible values:
   */
  size: PropTypes.oneOf(getJSMapKeysArray(buttonSizeMap)),
  /**
   * Text to display inside Button.
   */
  label: PropTypes.string,
  /**
   * Pass Icon component to display alongside text
   */
  icon: PropTypes.oneOfType([
    PropTypes.oneOf(getComponentsMap(icons)),
    PropTypes.elementType,
  ]),
  /**
   * Children elements.
   */
  children: PropTypes.node,
  /**
   * Stop event propagation on click. Possible values: true | false
   */
  preventEventPropagation: PropTypes.bool,
  /**
   * Disables the button. Possible values: true | false
   */
  disabled: PropTypes.bool,
  /**
   * Removes minimum width of Button component. Possible values: true | false
   */
  noMinWidth: PropTypes.bool,
  /**
   * Controls if button should occupy all available space. Possible values: true | false
   */
  fluid: PropTypes.bool,
  /**
   * Give Button component additional hover zone, so that it's easier for user to hover over it. Possible values: true | false
   */
  additionalHoverZone: PropTypes.bool,
  /**
   * Add irreversible action styling (red button). Possible values: true | false
   */
  isIrreversibleAction: PropTypes.bool,
  /**
   * Additional class names.
   */
  className: PropTypes.string,
  /**
   * Function fired on click.
   */
  onClick: PropTypes.func,
};

Button.propTypes = buttonPropTypes;

Button.defaultProps = {
  as: 'button',
  preset: 'primary',
  size: 'normal',
  className: '',
  fluid: false,
  noMinWidth: false,
  disabled: false,
  isIrreversibleAction: false,
  preventEventPropagation: false,
  additionalHoverZone: false,
  label: null,
  icon: null,
  children: null,
  onClick: () => {},
};

export default Button;
