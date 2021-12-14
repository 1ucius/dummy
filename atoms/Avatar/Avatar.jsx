import * as React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import { Typo } from '../Typo';

import styles from './Avatar.module.css';

const Avatar = React.forwardRef(function Avatar(
  { alt = 'Vadym Orlov', picture, className, ...rest },
  ref
) {
  // const AvatarComponent = src ? 'img' : 'div';

  const getInitials = React.useCallback(
    () =>
      alt
        .split(' ')
        .map(part => part[0])
        .join(''),
    [alt]
  );

  return (
    <div ref={ref} className={classnames(styles.Avatar, className)} {...rest}>
      {!picture && alt ? (
        <Typo
          label={getInitials()}
          preset='paragraph'
          weight='bold'
          align='center'
          uppercase
          ellipsis
          fluid
          noUserSelect
        />
      ) : (
        <img className={classnames(styles.Picture)} src={picture} alt={alt} />
      )}
    </div>
  );
});

Avatar.propTypes = {
  /**
   * Name of the user
   */
  alt: PropTypes.string,
  /**
   * Additional class names
   */
  className: PropTypes.string,
  /**
   * Additional class names
   */
  picture: PropTypes.string,
};

Avatar.defaultProps = {
  className: '',
  alt: null,
  picture: null,
};

export default Avatar;
