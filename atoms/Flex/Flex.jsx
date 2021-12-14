import * as React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import FlexItem from './FlexItem';

import { getJSMapKeysArray, spacingMap } from '../../cssMaps';

import styles from './Flex.module.css';

const Flex = React.forwardRef(
  (
    {
      as: Component,
      wrap,
      gap,
      direction,
      alignItems,
      justifyContent,
      className,
      xRay,
      inline,
      children,
      skipWrapper,
      fluid,
      ...rest
    },
    ref
  ) => {
    const getChild = React.useCallback(child => {
      if (!child) return child;

      const isInlineNode =
        typeof child === 'string' || typeof child === 'number';

      if (isInlineNode) {
        return <FlexItem>{child}</FlexItem>;
      }

      const { flex, ...childProps } = child.props;

      return (
        <FlexItem {...(flex || {})}>
          {React.cloneElement(child, {
            ...childProps,
            flex: undefined,
          })}
        </FlexItem>
      );
    }, []);

    return (
      <Component
        ref={ref}
        className={classnames(
          styles.FlexContainer,
          direction && styles[`Direction-${direction}`],
          justifyContent && styles[`JustifyContent-${justifyContent}`],
          alignItems && styles[`AlignItems-${alignItems}`],
          wrap && styles.Wrap,
          xRay && styles.XRay,
          inline && styles.Inline,
          fluid && styles.Fluid,
          className
        )}
        style={{
          '--gap': spacingMap[gap],
        }}
        {...rest}
      >
        {skipWrapper && children}
        {!skipWrapper &&
          children &&
          React.Children.map(children, child => getChild(child))}
      </Component>
    );
  }
);

Flex.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  direction: PropTypes.oneOf(['row', 'column']),
  alignItems: PropTypes.oneOf(['stretch', 'center', 'start', 'end']),
  justifyContent: PropTypes.oneOf([
    'start',
    'center',
    'space-between',
    'space-around',
    'end',
  ]),
  gap: PropTypes.oneOf(getJSMapKeysArray(spacingMap)),
  className: PropTypes.string,
  wrap: PropTypes.bool,
  xRay: PropTypes.bool,
  inline: PropTypes.bool,
  children: PropTypes.node,
  skipWrapper: PropTypes.bool,
  fluid: PropTypes.bool,
};

Flex.defaultProps = {
  as: 'div',
  direction: 'row',
  justifyContent: 'start',
  alignItems: 'start',
  wrap: false,
  className: null,
  gap: 'unset',
  xRay: false,
  inline: false,
  children: null,
  skipWrapper: false,
  fluid: true,
};

export default Flex;
