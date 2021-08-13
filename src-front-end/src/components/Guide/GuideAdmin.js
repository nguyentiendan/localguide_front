import React, { useState, } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { getUserProfile, ISGUIDE } from '../../utils/auth';
import { navigate } from 'gatsby';

const GuideAdmin = () => {
  const [userProfile] = useState(getUserProfile());
  if ( userProfile.role != ISGUIDE ) {
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
