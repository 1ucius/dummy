import React from 'react';

import { useAuth0 } from '@auth0/auth0-react';

import { Button } from '../../theme/atoms';

const AuthenticationButton = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  console.log({ isAuthenticated });

  return isAuthenticated ? (
    <Button
      size='small'
      onClick={() =>
        logout({
          returnTo: window.location.origin,
        })
      }
    >
      Logout
    </Button>
  ) : (
    <Button size='small' onClick={() => loginWithRedirect()}>
      Login
    </Button>
  );
};

export default AuthenticationButton;
