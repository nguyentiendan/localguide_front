import { request } from '../utils/http';

export function login(email, password) {
  return request({
    url: '/login',
    method: 'POST',
    data: { email, password },
  });
}

export function register(email, password, promoCode) {
  return request({
    url: '/register',
    method: 'POST',
    data: { email, password, promoCode },
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
    url: '/profile/me',
    method: 'PUT',
    authRequired: true,
    data: profile,
  });
}

export function changePassword(oldPassword, newPassword) {
  return request({
    url: '/profile/change-password',
    method: 'POST',
    authRequired: true,
    data: { oldPassword, newPassword },
  });
}

export function activateAccount(activationCode) {
  return request({
    url: `/register/activate/${activationCode}`,
    method: 'POST',
  });
}
