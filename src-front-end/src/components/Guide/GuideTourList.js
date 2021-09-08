import React, { useState } from 'react';
import { navigate } from 'gatsby';
import AdminLayout from '../AdminLayout';
import GuideTours from './Tours';
import { getUserProfile, ISGUIDE } from '../../utils/auth';

const GuideTourList = () => {
  const [userProfile] = useState(getUserProfile());
  if (userProfile.role != ISGUIDE) {
    navigate('/app/admin');
    return null;
  }

  return (
    <AdminLayout>
      <h2>Tour List</h2>
      <GuideTours />
    </AdminLayout>
  );
};

export default GuideTourList;
