import { request } from '../utils/http';

// Login api
export function login(email, password) {
  return request({
    url: '/user/login',
    method: 'POST',
    data: { email, password },
  });
}

// Create new account
export function register(fullname, email, password) {
  return request({
    url: '/account/new',
    method: 'POST',
    data: { fullname, email, password },
  });
}

// Verify account
export function verify(email, activeCode) {
  console.log(email);
  console.log(activeCode);
  return request({
    url: '/account/active',
    method: 'POST',
    data: { email, activeCode },
  });
}

// Get profile
export function getUserProfile() {
  return request({
    url: '/profile/me',
    method: 'GET',
    authRequired: true,
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
