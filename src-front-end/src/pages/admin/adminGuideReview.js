import React from 'react';
import GuideReview from '../../components/AdminGuideReview';
import qs from 'query-string';

const AdminGuideReview = ({location}) => {
  const dataQueryParams = qs.parse(location.search);
  const uid = dataQueryParams.uid;
  const guideId = dataQueryParams.id;  

  return (
    <GuideReview uid={uid} id={guideId}/>       
  );
};

export default AdminGuideReview;
