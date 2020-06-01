import { request } from '../utils/http';

export function forgotPassword(data) {
  return request({
    url: '/recover-password',
    method: 'POST',
    data,
  });
}
