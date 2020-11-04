import axios from 'axios';
import _ from 'lodash';

import { getUserProfile } from './auth';

export async function request({
  url,
  apiVersion,
  method = 'GET',
  data,
  isFormData,
  authRequired,
  ...rest
}) {
  let token = (rest && rest.token) || null;
  let submitData = data;

  if (authRequired) {
    const user = getUserProfile();

    if (!token) {
      // eslint-disable-next-line prefer-destructuring
      token = user.token;
    }

    submitData = {
      uid: (rest && rest.uid) || (user && user.uid),
      ...data,
    };
  }

  if (isFormData) {
    const formData = new FormData();
    _.forEach(submitData, (value, key) => {
      if (key === 'uploadFiles') {
        _.forEach(value, v => {
          formData.append(key, v);
        });
      } else {
        formData.append(key, value);
      }
    });
    submitData = formData;
  }

  const response = await axios({
    baseURL: `${process.env.GATSBY_API_URL}/v${apiVersion || process.env.GATSBY_API_VERSION}`,
    url,
    method,
    headers: {
      'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : null),
    },
    data: submitData,
    ...rest,
  });

  return response && response.data;
}
