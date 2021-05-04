import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import Profile from '../../components/MyTours/Profile';
import { getUserProfile } from '../../utils/auth';

const GuideProfile = () => {
  const [userProfile] = useState(getUserProfile());

  return (
    <AdminLayout>
      <h2>Profile</h2>
      <Profile uid={userProfile?.uid} />
    </AdminLayout>
  );
};

export default GuideProfile;
