import { request } from '../utils/http';

// Login api
export function login(email, password) {
  return request({
    url: '/user/login',
    method: 'POST',
    data: { email, password },
  });
}

// Logout api
export function logout(uid) {
  return request({
    url: '/user/logout',
    method: 'POST',
    authRequired: true,
    data: { uid },
  });
}

// Create new account
export function register(fullname, email, password, reqActive) {
  return request({
    url: '/account/new',
    method: 'POST',
    data: { fullname, email, password, reqActive },
  });
}

// Verify account
export function verify(email, activeCode) {
  return request({
    url: '/account/active',
    method: 'POST',
    data: { email, activeCode },
  });
}

// Get profile
export function getUserProfile({ uid, token }) {
  return request({
    url: '/profile/me',
    method: 'GET',
    authRequired: true,
    uid,
    token,
  });
}

export function updateUserProfile(profile) {
  return request({
    url: '/account/edit',
    method: 'POST',
    authRequired: true,
    data: profile,
  });
}

export function changePassword(password, newPassword) {
  return new Promise(resolve => resolve() || password || newPassword);
}
