import { request } from '../utils/http';

export function login(email, password) {
  return request({
    url: '/user/login',
    method: 'POST',
    data: { email, password },
  });
}

export function register(fullname, email, password) {
  return request({
    url: '/account/new',
    method: 'POST',
    data: { fullname, email, password },
  });
}

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
