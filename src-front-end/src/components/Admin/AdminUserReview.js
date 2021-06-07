import React, { useState, } from 'react';
import UserReview from '../Admin/User/';
import qs from 'query-string';
import { getUserProfile, ISADMIN } from '../../utils/auth';
import { navigate } from 'gatsby';

const AdminUserReview = ({location}) => {
  const dataQueryParams = qs.parse(location.search);
  const uid = dataQueryParams.uid;
  const guideId = dataQueryParams.id;
  
  const [userProfile] = useState(getUserProfile());
  if (userProfile.role != ISADMIN) {
    navigate('/app/admin');
    return null;
  }  

  return (
    <UserReview uid={uid} id={guideId}/>       
  );
};

export default AdminUserReview;
