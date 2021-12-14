import * as React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import { colorsMap, colorsOptions } from '../../cssMaps';

import styles from './Typo.module.css';

const presetToComponentMap = {
  default: 'p',
  heading1: 'h1',
  heading2: 'h2',
  heading3: 'h3',
  heading4: 'h4',
  heading5: 'h5',
  heading6: 'h6',
  paragraph: 'p',
  buttonPrimary: 'p',
  buttonPrimarySmall: 'p',
  buttonSecondary: 'p',
  buttonSecondarySmall: 'p',
  actionButton: 'p',
  subtitle: 'p',
  sidebarTitle: 'p',
  link: 'p',
  linkNeutral: 'p',
  caption: 'p',
  code: 'code',
  input: 'span',
};

const presetToStylesMap = {
  default: styles.TypoParagraph,
  heading1: styles.TypoHeading1,
  heading2: styles.TypoHeading2,
  heading3: styles.TypoHeading3,
  heading4: styles.TypoHeading4,
  heading5: styles.TypoHeading5,
  heading6: styles.TypoHeading6,
  paragraph: styles.TypoParagraph,
  buttonPrimary: styles.TypoButtonPrimary,
  buttonPrimarySmall: styles.TypoButtonPrimarySmall,
  buttonSecondary: styles.TypoButtonSecondary,
  buttonSecondarySmall: styles.TypoButtonSecondarySmall,
  actionButton: styles.TypoButtonAction,
  subtitle: styles.TypoSubtitle,
  sidebarTitle: styles.TypoSidebarTitle,
  link: styles.TypoButtonLink,
  linkNeutral: styles.TypoButtonLink,
  caption: styles.TypoCaption,
  code: styles.TypoCode,
  input: styles.TypoInput,
};

const colorByPresetMap = {
  default: 'default',
  heading1: 'default',
  heading2: 'default',
  heading3: 'default',
  heading4: 'default',
  heading5: 'default',
  heading6: 'default',
  paragraph: 'default',
  buttonPrimary: 'white',
  buttonPrimarySmall: 'white',
  buttonSecondary: 'default',
  buttonSecondarySmall: 'default',
  actionButton: 'default',
  subtitle: 'default',
  sidebarTitle: 'default',
  additional: 'blue',
  link: 'blue',
  linkNeutral: 'default',
  caption: 'default',
  code: 'default',
  input: 'default',
};

export const fontWeightMap = {
  unset: null,
  regular: styles.FontWeightRegular,
  semibold: styles.FontWeightSemiBold,
  bold: styles.FontWeightBold,
};

export const textAlignMap = {
  unset: null,
  default: styles.DefaultAlign,
  left: styles.LeftAlign,
  right: styles.RightAlign,
  center: styles.CenterAlign,
  justify: styles.JustifyAlign,
};

export const fontSizeMap = {
  unset: null,
  default: styles.FontSizeDefault,
  heading1: styles.FontSizeHeading1,
  heading2: styles.FontSizeHeading2,
  heading3: styles.FontSizeHeading3,
  heading4: styles.FontSizeHeading4,
  heading5: styles.FontSizeHeading5,
  heading6: styles.FontSizeHeading6,
  paragraph: styles.FontSizeParagraph,
  caption: styles.FontSizeCaption,
  code: styles.FontSizeCode,
};

export const lineHeightMap = {
  unset: null,
  default: styles.LineHeightDefault,
  heading1: styles.LineHeightHeading1,
  heading2: styles.LineHeightHeading2,
  heading3: styles.LineHeightHeading3,
  heading4: styles.LineHeightHeading4,
  heading5: styles.LineHeightHeading5,
  heading6: styles.LineHeightHeading6,
  paragraph: styles.LineHeightParagraph,
  caption: styles.LineHeightCaption,
  code: styles.LineHeightCode,
  input: styles.LineHeightInput,
};

const Typo = React.forwardRef(function Typo(
  {
    as,
    preset,
    color,
    customColor,
    align,
    weight,
    fontSize,
    lineHeight,
    ellipsis,
    lineClamp,
    uppercase,
    lowercase,
    capitals,
    className,
    label,
    noUserSelect,
    noWrap,
    fluid,
    hovered,
    children,
    ...rest
  },
  ref
) {
  const Component = as || presetToComponentMap[preset];

  const decideColor = React.useCallback(() => {
    if (customColor) return customColor;

    return colorsMap[color] || colorsMap[colorByPresetMap[preset]];
  }, [color, customColor, preset]);

  return (
    <Component
      ref={ref}
      className={classnames(
        styles.Typo,
        presetToStylesMap[preset],
        hovered && styles.Hovered,
        align && textAlignMap[align],
        weight && fontWeightMap[weight],
        fontSize && fontSizeMap[fontSize],
        lineHeight && lineHeightMap[lineHeight],
        ellipsis && !lineClamp && styles.OverflowEllipsis,
        lineClamp && styles.LineClamp,
        uppercase && styles.Uppercased,
        capitals && styles.Capitals,
        lowercase && styles.Lowercased,
        noUserSelect && styles.NoUserSelect,
        noWrap && styles.NoWrap,
        fluid && styles.Fluid,
        className
      )}
      style={{
        '--color': decideColor(),
        '--line-clamp': lineClamp,
      }}
      {...rest}
    >
      {label}
      {children}
    </Component>
  );
});

export const typoPropTypes = {
  /**
   * DOM element to override one defined by preset. Possible values:
   */
  as: PropTypes.string,
  /**
   * Text content of the element. Possible values:
   */
  label: PropTypes.string.isRequired,
  /**
   * Select predefined styles. Possible values:
   */
  preset: PropTypes.oneOf(Object.keys(presetToComponentMap)),
  /**
   * Override color defined by preset. Possible values:
   */
  color: PropTypes.oneOf(colorsOptions),
  /**
   * Set whatever color you want ;)
   */
  customColor: PropTypes.string,
  /**
   * Override text align defined by preset. Possible values:
   */
  align: PropTypes.oneOf(Object.keys(textAlignMap)),
  /**
   * Override font weight defined by preset. Possible values:
   */
  weight: PropTypes.oneOf(Object.keys(fontWeightMap)),
  /**
   * Override font size defined by preset. Possible values:
   */
  fontSize: PropTypes.oneOf(Object.keys(fontSizeMap)),
  /**
   * Override line height defined by preset. Possible values:
   */
  lineHeight: PropTypes.oneOf(Object.keys(lineHeightMap)),
  /**
   * Add custom class names. Possible values:
   */
  className: PropTypes.string,
  /**
   * Add ellipsis if text overflows the element. Possible values: true | false
   */
  ellipsis: PropTypes.bool,
  /**
   *  Maximum amount of lines before ellipsis is applied.
   */
  lineClamp: PropTypes.number,
  /**
   * Make text uppercase. Possible values: true | false
   */
  uppercase: PropTypes.bool,
  /**
   * Make text lowercase. Possible values: true | false
   */
  lowercase: PropTypes.bool,
  /**
   * Capitalize each word of a string. Possible values: true | false
   */
  capitals: PropTypes.bool,
  /**
   * Prevent user from selecting and copying the text. Possible values: true | false
   */
  noUserSelect: PropTypes.bool,
  /**
   * No text wrap. Possible values: true | false
   */
  noWrap: PropTypes.bool,
  /**
   * Let Typo element occupy all available width
   */
  fluid: PropTypes.bool,
  /**
   * Let Typo know if it should apply hover styles provided preset has one or you added it yourself. Possible values: true | false
   */
  hovered: PropTypes.bool,
  /**
   * Children components of Typo
   */
  children: PropTypes.elementType,
};

Typo.propTypes = typoPropTypes;

export const typoDefaultProps = {
  preset: 'paragraph',
  as: null,
  className: null,
  color: 'unset',
  customColor: null,
  align: 'unset',
  weight: 'unset',
  fontSize: 'unset',
  lineHeight: 'unset',
  ellipsis: false,
  lineClamp: null,
  uppercase: false,
  lowercase: false,
  capitals: false,
  noUserSelect: false,
  noWrap: false,
  fluid: false,
  hovered: false,
  children: null,
};

Typo.defaultProps = typoDefaultProps;

export default Typo;
