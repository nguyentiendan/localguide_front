import { request } from '../utils/http';

export function forgotPassword(email) {
  return request({
    url: '/user/resetPass',
    method: 'POST',
    data: { email },
  });
}
