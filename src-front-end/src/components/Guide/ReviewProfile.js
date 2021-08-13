import React, { useState, } from 'react';
import Profile from './Profile/Profile';
import qs from 'query-string';
import { getUserProfile, ISGUIDE } from '../../utils/auth';
import { navigate } from 'gatsby';

const ReviewProfile = () => {
  const [userProfile] = useState(getUserProfile());
  if (userProfile.role != ISGUIDE) {
    navigate('/app/admin');
    return null;
  }  

  return (
    <Profile uid={userProfile.uid} id={userProfile.id}/>       
  );
};

export default ReviewProfile;
