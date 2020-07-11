import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';

import { remove } from './storage';
import { AUTH_TOKEN_KEY, getUserProfile, isAuthenticated } from './auth';
import { isBrowser } from './browser';

const AuthUserContext = createContext();
const AuthLogoutContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getUserProfile());

  const logout = () => {
    setUser(null);
    remove(AUTH_TOKEN_KEY);
    navigate('/login');
  };

  useEffect(() => {
    function check() {
      if (user && !isAuthenticated()) {
        logout();
      }
    }

    check();

    const id = setInterval(check, 10000);

    return () => clearInterval(id);
  }, [user]);

  return (
    <AuthUserContext.Provider value={user}>
      <AuthLogoutContext.Provider value={logout}>{children}</AuthLogoutContext.Provider>
    </AuthUserContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};

AuthProvider.defaultProps = {
  children: null,
};

export function useUser() {
  const user = useContext(AuthUserContext);
  if (typeof user === 'undefined') {
    throw new Error('useUser must be used within a AuthProvider');
  }
  return user;
}

export function useLogout() {
  const logout = useContext(AuthLogoutContext);
  if (typeof logout === 'undefined') {
    throw new Error('useLogout must be used within a AuthProvider');
  }
  return logout;
}

export default function useAuth() {
  const user = useUser();
  const logout = useLogout();

  return { user, logout };
}

export function useRequiredUser() {
  const user = useUser();

  if (!user && isBrowser()) {
    navigate('/login');
  }

  return { user };
}
