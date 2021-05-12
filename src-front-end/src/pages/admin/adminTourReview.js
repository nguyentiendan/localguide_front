import React from 'react';
import TourReview from '../../components/AdminTourReview';
import qs from 'query-string';

const AdminTourReview = ({location}) => {
  const dataQueryParams = qs.parse(location.search);
  const uid = dataQueryParams.uid;
  const id = dataQueryParams.id;  

  return (
    <TourReview uid={uid} id={id} />   
  );
};

export default AdminTourReview;
