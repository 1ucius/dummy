export const getJSMapKeysArray = map => Object.keys(map);

export const colorsMap = {
  unset: null,
  white: 'var(--white)',
  black: 'var(--black)',
  softBlack: 'var(--soft-black)',
  default: 'var(--default-color)',
  darkGrey: 'var(--dark-grey)',
  mediumGrey: 'var(--medium-gray)',
  gullGrey: 'var(--gull-grey)',
  lightGrey: 'var(--light-grey)',
  neutralGrey: 'var(--neutral-grey)',
  red: 'var(--red)',
  errorRed: 'var(--error-red)',
  green: 'var(--green)',
  successGreen: 'var(--success-green)',
  blue: 'var(--blue)',
  darkBlue: 'var(--dark-blue)',
  secondaryBlue: 'var(--secondary-blue)',
  lightBlue: 'var(--light-blue)',
  secondaryLightBlue: 'var(--secondary-light-blue)',
  yellow: 'var(--yellow)',
  darkBlueAlpha65: 'var(--dark-blue-alpha-65)',
};

export const colorsOptions = getJSMapKeysArray(colorsMap);

export const spacingMap = {
  unset: '0',
  '6xs': 'var(--spacing-6xs)',
  '5xs': 'var(--spacing-5xs)',
  '4xs': 'var(--spacing-4xs)',
  '3xs': 'var(--spacing-3xs)',
  '2xs': 'var(--spacing-2xs)',
  xs: 'var(--spacing-xs)',
  s: 'var(--spacing-s)',
  m: 'var(--spacing-m)',
  l: 'var(--spacing-l)',
  xl: 'var(--spacing-xl)',
  '2xl': 'var(--spacing-2xl)',
  '3xl': 'var(--spacing-3xl)',
  '4xl': 'var(--spacing-4xl)',
  '5xl': 'var(--spacing-5xl)',
  '6xl': 'var(--spacing-6xl)',
};
