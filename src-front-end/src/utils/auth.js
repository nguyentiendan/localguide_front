import jwtDecode from 'jwt-decode';
import { get } from './storage';

export const ISADMIN = 3;
export const ISGUIDE = 2;
export const ISUSER  = 1;

export const AUTH_TOKEN_KEY = 'auth.token';

function decodeToken(token) {
  const authToken = token || get(AUTH_TOKEN_KEY);

  if (!authToken) {
    return null;
  }

  try {
    return jwtDecode(authToken);
  } catch (error) {
    console.error(error);
    return null;
  }
}

export function isAuthenticated() {
  const payload = decodeToken();

  if (!payload) {
    return false;
  }

  // return new Date(payload.exp * 1000) >= Date.now();
  return true;
}

export function getUserProfile() {
  const payload = decodeToken();

  if (!payload) {
    return null;
  }

  return payload;
}
