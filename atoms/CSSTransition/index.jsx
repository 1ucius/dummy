import React from 'react';
import PropTypes from 'prop-types';

import { CSSTransition } from 'react-transition-group';

import { getJSMapKeysArray } from '../../cssMaps';

import styles from '../../css/transition.module.css';

import slideInStyles from './Slide.module.css';
import fadeInStyles from './Fade.module.css';
import widthInStyles from './Width.module.css';

const generateClasses = baseClass => ({
  enter: styles[`${baseClass}-enter`],
  enterActive: styles[`${baseClass}-enter-active`],
  exit: styles[`${baseClass}-exit`],
  exitActive: styles[`${baseClass}-exit-active`],
});

const animationsSettings = {
  instant: {
    classes: generateClasses('instant'),
    timeout: 0,
  },
  fade: {
    classes: { ...fadeInStyles },
    timeout: 300,
  },
  slide: {
    classes: { ...slideInStyles },
    timeout: 300,
  },
  width: {
    classes: { ...widthInStyles },
    timeout: 300,
  },
};

const Transition = ({
  onExited,
  onEnter,
  children,
  type,
  show,
  appear,
  unmountOnExit,
  ...rest
}) => {
  return (
    <CSSTransition
      in={show}
      appear={appear}
      classNames={animationsSettings[type].classes}
      timeout={animationsSettings[type].timeout}
      onExited={onExited}
      onEnter={onEnter}
      unmountOnExit={unmountOnExit}
      {...rest}
    >
      {children}
    </CSSTransition>
  );
};

Transition.propTypes = {
  /**
   * Callback fired after element appears on the page
   */
  onExited: PropTypes.func,
  /**
   * Callback fired before element appears on the page
   */
  onEnter: PropTypes.func,
  /**
   * Defines type of the animation
   */
  type: PropTypes.oneOf(getJSMapKeysArray(animationsSettings)),
  /**
   * Should the element be visible. Possible values: true | false
   */
  show: PropTypes.bool,
  /**
   * Should the element be visible on initial load. Possible values: true | false
   */
  appear: PropTypes.bool,
  /**
   * Child components
   */
  children: PropTypes.node,
  /**
   * Defines whether the contents of teh element should be unmounted when hiding the element. Possible values: true | false
   */
  unmountOnExit: PropTypes.bool,
};

Transition.defaultProps = {
  onExited: () => {},
  onEnter: () => {},
  type: 'fade',
  children: null,
  show: false,
  appear: false,
  unmountOnExit: false,
};

export default Transition;
