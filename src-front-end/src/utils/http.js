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
  let token = null;
  let submitData = data;

  if (authRequired) {
    const user = getUserProfile();
    token = user.Token;
    submitData = {
      uid: user.UID,
      ...data,
    };
  }

  if (isFormData) {
    const formData = new FormData();
    _.forEach(submitData, (value, key) => {
      formData.append(key, value);
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
