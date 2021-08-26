import React, { useState } from 'react';
import { navigate } from 'gatsby';
import AdminLayout from '../AdminLayout';
import { getUserProfile, ISGUIDE } from '../../utils/auth';

const GuideAdmin = () => {
  const [userProfile] = useState(getUserProfile());
  if (userProfile.role != ISGUIDE) {
    navigate('/');
    return null;
  }

  return (
    <AdminLayout>
      <div>
        Welcome {userProfile.fullname}, <b>Guide Admin</b>
      </div>
    </AdminLayout>
  );
};

export default GuideAdmin;
