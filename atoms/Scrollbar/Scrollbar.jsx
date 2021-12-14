import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import { Scrollbars } from 'react-custom-scrollbars-2';

import { getJSMapKeysArray } from '../../cssMaps';

import styles from './Scrollbar.module.css';

export const sizeMap = {
  small: styles.Small,
  medium: styles.Medium,
  large: styles.Large,
};

const thumbSizeMap = {
  small: '4px',
  medium: '6px',
  large: '8px',
};

const trackSizeMap = {
  small: '4px',
  medium: '6px',
  large: '12px',
};

const Scrollbar = React.forwardRef(function Scrollbar(
  {
    size,
    autoMaxHeight,
    autoMinHeight,
    maxHeight,
    autoHide,
    onlyVertical,
    onlyHorizontal,
    className,
    children,
    refCallback,
    fullHeightView,
    ...rest
  },
  ref
) {
  const scrollbarRef = React.useRef(ref);
  const [showScrollTopButton, setShowScrollTopButton] = React.useState(false);

  const onScroll = React.useCallback(e => {
    const target = e.target;

    const { scrollTop, scrollHeight } = target;

    const scrollCoefficient = scrollTop / scrollHeight;

    if (scrollCoefficient >= 0.2 && scrollTop >= 100) {
      setShowScrollTopButton(true);
    } else {
      setShowScrollTopButton(false);
    }
  });

  const getView = React.useCallback(({ style: viewStyles, ...props }) => {
    const { maxWidth } = viewStyles;

    return (
      <div
        className={classnames(styles.View)}
        {...props}
        style={{
          ...viewStyles,
          ...(fullHeightView && {
            height: viewStyles.minHeight,
          }),
          ...(maxWidth && {
            '--maxWidth': maxWidth,
          }),
        }}
      />
    );
  }, []);

  React.useState(() => {
    if (refCallback) refCallback(scrollbarRef);
  }, [scrollbarRef, refCallback]);

  return (
    <Scrollbars
      ref={scrollbarRef}
      className={classnames(
        styles.Scrollbar,
        sizeMap[size],
        onlyHorizontal && styles.OnlyHorizontal,
        onlyVertical && styles.OnlyVertical,
        className
      )}
      autoHeightMin={autoMinHeight}
      autoHeightMax={autoMaxHeight}
      thumbMinSize={30}
      autoHeight
      universal
      autoHide={autoHide}
      hideTracksWhenNotNeeded
      onScroll={onScroll}
      renderView={data => getView(data)}
      renderThumbVertical={({ style, ...props }) => (
        <div
          className={classnames(styles.ThumbVertical)}
          {...props}
          style={{ ...style, width: thumbSizeMap[size] }}
        />
      )}
      renderTrackVertical={({ style, ...props }) => (
        <div
          className={classnames(
            styles.TrackVertical,
            onlyHorizontal && styles.TrackVerticalHidden
          )}
          {...props}
          style={{ ...style, width: trackSizeMap[size] }}
        />
      )}
      renderThumbHorizontal={({ style, ...props }) => (
        <div
          className={classnames(styles.ThumbHorizontal)}
          {...props}
          style={{ ...style, height: thumbSizeMap[size] }}
        />
      )}
      renderTrackHorizontal={({ style, ...props }) => (
        <div
          className={classnames(
            styles.TrackHorizontal,
            onlyVertical && styles.TrackHorizontalHidden
          )}
          {...props}
          style={{ ...style, height: trackSizeMap[size] }}
        />
      )}
      style={{
        height: '100%',
      }}
      {...rest}
    >
      {children}
    </Scrollbars>
  );
});

Scrollbar.propTypes = {
  /**
   * Choose the preset that defines the size of scrollbars. Possible values:
   */
  size: PropTypes.oneOf(getJSMapKeysArray(sizeMap)),
  /**
   * Set min height of scroll container.
   */
  autoMinHeight: PropTypes.string,
  /**
   * Set max height of scroll container.
   */
  autoMaxHeight: PropTypes.string,
  /**
   * Set max auto height of scroll container.
   */
  maxHeight: PropTypes.string,
  /**
   * Define if scrollbars should hide if not used. Possible values: true | false
   */
  autoHide: PropTypes.bool,
  /**
   * Disable horizontal scroll. Possible values: true | false
   */
  onlyVertical: PropTypes.bool,
  /**
   * Disable vertical scroll. Possible values: true | false
   */
  onlyHorizontal: PropTypes.bool,
  /**
   * Force full height scroll view.
   */
  fullHeightView: PropTypes.bool,
  /**
   * Additional class names.
   */
  className: PropTypes.string,
  /**
   * Child nodes.
   */
  children: PropTypes.node,
  /**
   * Ref callback.
   */
  refCallback: PropTypes.func,
};

Scrollbar.defaultProps = {
  size: 'small',
  autoMinHeight: '100%',
  autoMaxHeight: '100%',
  onlyVertical: false,
  onlyHorizontal: false,
  fullHeightView: false,
  autoHide: true,
  maxHeight: null,
  className: null,
  children: null,
  refCallback: null,
};

export default Scrollbar;
