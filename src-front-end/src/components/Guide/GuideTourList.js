import React, { useState, } from 'react';
import AdminLayout from '../../components/AdminLayout';
import GuideTours from '../../components/Guide/Tours';
import { getUserProfile, ISGUIDE } from '../../utils/auth';
import { navigate } from 'gatsby';

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
