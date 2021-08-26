import React, { useState } from 'react';
import { navigate } from 'gatsby';
import AdminLayout from '../AdminLayout';
import Tour from './Tours';
import { getUserProfile, ISADMIN } from '../../utils/auth';

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
