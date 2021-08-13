import React, { useState, } from 'react';
import TourReview from '../../components/Guide/Tours/TourReview';
import qs from 'query-string';
import { getUserProfile, ISGUIDE } from '../../utils/auth';
import { navigate } from 'gatsby';

const GuideTourReview = ({location}) => {
  const dataQueryParams = qs.parse(location.search);
  const uid = dataQueryParams.uid;
  const id = dataQueryParams.id; 
  
  const [userProfile] = useState(getUserProfile());
  if (userProfile.role != ISGUIDE) {
    navigate('/app/admin');
    return null;
  }

  return (
    <TourReview uid={uid} id={id} />
  );
};

export default GuideTourReview;
