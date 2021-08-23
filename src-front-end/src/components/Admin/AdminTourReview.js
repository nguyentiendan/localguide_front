import React, { useState } from 'react';
import qs from 'query-string';
import { navigate } from 'gatsby';
import TourReview from './Tours/TourReview';
import { getUserProfile, ISADMIN } from '../../utils/auth';

const AdminTourReview = ({ location }) => {
  const dataQueryParams = qs.parse(location.search);
  const { uid } = dataQueryParams;
  const { id } = dataQueryParams;

  const [userProfile] = useState(getUserProfile());
  if (userProfile.role != ISADMIN) {
    navigate('/app/admin');
    return null;
  }

  return <TourReview uid={uid} id={id} />;
};

export default AdminTourReview;
