import React from 'react';
import { Route } from 'react-router-dom';

import { withAuthenticationRequired } from '@auth0/auth0-react';

import { Loader } from '../atoms';

const ProtectedRoute = ({ component, returnTo = '/', ...args }) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => <Loader />,
      returnTo,
    })}
    {...args}
  />
);

export default ProtectedRoute;
