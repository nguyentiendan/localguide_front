import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import Profile from '../../components/Guide/Profile';
import { getUserProfile, ISGUIDE } from '../../utils/auth';
import { navigate } from 'gatsby';

const GuideProfile = () => {
  const [userProfile] = useState(getUserProfile());
  if (userProfile.role != ISGUIDE) {
    navigate('/app/admin');
    return null;
  }

  return (
    <AdminLayout>
      <h2>Profile</h2>
      <Profile uid={userProfile?.uid} />
    </AdminLayout>
  );
};

export default GuideProfile;
