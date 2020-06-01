import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';

import { useLocalStorage } from '../utils/storage';
import { AUTH_TOKEN_KEY } from '../utils/auth';

function PrivateRoute({ location, component: Component, ...props }) {
  const [authToken] = useLocalStorage(AUTH_TOKEN_KEY);
  const notOnLoginPage = location && location.pathname !== '/login';

  if (!authToken && notOnLoginPage) {
    navigate('/login');
    return null;
  }

  return <Component location={location} {...props} />;
}

PrivateRoute.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  component: PropTypes.func.isRequired,
};

PrivateRoute.defaultProps = {
  location: null,
};

export default PrivateRoute;
