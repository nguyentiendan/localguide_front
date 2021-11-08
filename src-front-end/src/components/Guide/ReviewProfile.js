import React, { useState } from 'react';
import qs from 'query-string';
import { navigate } from 'gatsby';
import Profile from './Profile/Profile';
import { getUserProfile, ISADMIN } from '../../utils/auth';

const ReviewProfile = () => {
  const [userProfile] = useState(getUserProfile());
  if (userProfile.role == ISADMIN) {
    navigate('/app/admin');
    return null;
  }

  return <Profile uid={userProfile.uid} id={userProfile.id} />;
};

export default ReviewProfile;
