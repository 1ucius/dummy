import * as React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const Portal = function Portal({ children, target }) {
  const wrapper = document.createElement('div');
  const rootRef = React.useRef(wrapper);

  React.useEffect(() => {
    const root = rootRef.current;

    target.appendChild(root);

    return () => {
      target.removeChild(root);
    };
  }, [target]);

  return createPortal(children, rootRef.current);
};

Portal.displayName = 'Portal';

Portal.propTypes = {
  target: PropTypes.shape({}),
  children: PropTypes.node.isRequired,
};

Portal.defaultProps = {
  target: document.body,
};

export default Portal;
