import React, { useState, } from 'react';
import TourReview from '../../components/Admin/Tours/TourReview';
import qs from 'query-string';
import { getUserProfile, ISADMIN } from '../../utils/auth';
import { navigate } from 'gatsby';

const AdminTourReview = ({location}) => {
  const dataQueryParams = qs.parse(location.search);
  const uid = dataQueryParams.uid;
  const id = dataQueryParams.id;  
  
  const [userProfile] = useState(getUserProfile());
  if (userProfile.role != ISADMIN) {
    navigate('/app/admin');
    return null;
  }

  return (
    <TourReview uid={uid} id={id} />   
  );
};

export default AdminTourReview;
