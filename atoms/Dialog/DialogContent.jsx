import * as React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import { FlexItem } from '../Flex';

import { Scrollbar } from '../Scrollbar';

import { useResizeObserver } from '../../hooks';

import styles from './DialogContent.module.css';

const ResizeHelper = React.forwardRef(function ResizeHelper(
  { as, children, onSizeChange, minHeight, maxHeight, style, ...rest },
  ref
) {
  const [dimensions, setDimensions] = React.useState(null);

  const target = React.useRef(null);

  const [isResized, size] = useResizeObserver(target);

  React.useEffect(() => {
    if (!isResized) return;

    setDimensions(size);
  }, [size, isResized]);

  React.useEffect(() => {
    if (!dimensions) return;

    onSizeChange(size);
  }, [dimensions]);

  const Component = as || FlexItem;

  return (
    <Component
      ref={target}
      shrink
      grow
      basis='1'
      style={{
        minHeight,
        maxHeight,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Component>
  );
});

const DialogContent = React.forwardRef(function DialogContent(
  { children, disableScroll, className },
  ref
) {
  const [height, setHeight] = React.useState(null);

  const innerRef = React.useRef(ref);

  const onResize = React.useCallback(size => {
    setHeight(size.height);
  }, []);

  return disableScroll ? (
    <FlexItem ref={innerRef} className={classnames(styles.Content, className)}>
      {children}
    </FlexItem>
  ) : (
    <ResizeHelper
      ref={innerRef}
      className={classnames(styles.Content, className)}
      onSizeChange={onResize}
      style={{ height }}
    >
      <Scrollbar onlyVertical>{children}</Scrollbar>
    </ResizeHelper>
  );
});

DialogContent.propTypes = {
  /**
   * Children elements.
   */
  children: PropTypes.node,
  /**
   * Additional class names.
   */
  className: PropTypes.string,
  /**
   * Disable scroll.
   */
  disableScroll: PropTypes.bool,
};

DialogContent.defaultProps = {
  children: null,
  className: '',
  disableScroll: false,
};

export default DialogContent;
