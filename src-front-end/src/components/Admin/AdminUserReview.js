import React, { useState } from 'react';
import qs from 'query-string';
import { navigate } from 'gatsby';
import UserReview from './User';
import { getUserProfile, ISADMIN } from '../../utils/auth';

const AdminUserReview = ({ location }) => {
  const dataQueryParams = qs.parse(location.search);
  const { uid } = dataQueryParams;
  const guideId = dataQueryParams.id;

  const [userProfile] = useState(getUserProfile());
  if (userProfile.role != ISADMIN) {
    navigate('/app/admin');
    return null;
  }

  return <UserReview uid={uid} id={guideId} />;
};

export default AdminUserReview;
