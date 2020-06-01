import axios from 'axios';

import { get } from './storage';
import { AUTH_TOKEN_KEY } from './auth';

export async function request({ url, apiVersion, method = 'GET', data, authRequired, ...rest }) {
  let token = null;

  if (authRequired) {
    token = get(AUTH_TOKEN_KEY);
  }

  const response = await axios({
    baseURL: `${process.env.GATSBY_API_URL}/${apiVersion || process.env.GATSBY_API_VERSION}`,
    url,
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : null),
    },
    data,
    ...rest,
  });

  return response && response.data;
}
