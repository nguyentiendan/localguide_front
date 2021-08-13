import React, { useState, } from 'react';
import AdminLayout from '../../components/AdminLayout';
import Tour from '../../components/Admin/Tours';
import { getUserProfile, ISADMIN } from '../../utils/auth';
import { navigate } from 'gatsby';

const TourList = () => {
  const [userProfile] = useState(getUserProfile());
  if (userProfile.role != ISADMIN) {
    navigate('/app/admin');
    return null;
  }  

  return (
    <AdminLayout>
      <h2>Tour List</h2>
      <Tour />
    </AdminLayout>
  );
};

export default TourList;
