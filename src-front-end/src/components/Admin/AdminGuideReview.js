import React, { useState } from 'react';
import qs from 'query-string';
import { navigate } from 'gatsby';
import GuideReview from './Guides/GuideReview';
import { getUserProfile, ISADMIN } from '../../utils/auth';

const AdminGuideReview = ({ location }) => {
  const dataQueryParams = qs.parse(location.search);
  const { uid } = dataQueryParams;
  const guideId = dataQueryParams.id;

  const [userProfile] = useState(getUserProfile());
  if (userProfile.role != ISADMIN) {
    navigate('/app/admin');
    return null;
  }

  return <GuideReview uid={uid} id={guideId} />;
};

export default AdminGuideReview;
