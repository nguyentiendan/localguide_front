import React, { useState, } from 'react';
import GuideReview from '../Admin/Guides/GuideReview';
import qs from 'query-string';
import { getUserProfile, ISADMIN } from '../../utils/auth';
import { navigate } from 'gatsby';

const AdminGuideReview = ({location}) => {
  const dataQueryParams = qs.parse(location.search);
  const uid = dataQueryParams.uid;
  const guideId = dataQueryParams.id;
  
  const [userProfile] = useState(getUserProfile());
  if (userProfile.role != ISADMIN) {
    navigate('/app/admin');
    return null;
  }  

  return (
    <GuideReview uid={uid} id={guideId}/>       
  );
};

export default AdminGuideReview;
