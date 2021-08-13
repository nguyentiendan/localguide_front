import React, { useState, } from 'react';
import AdminLayout from '../../components/AdminLayout';
import Guide from '../../components/Admin/Guides';
import { getUserProfile, ISADMIN } from '../../utils/auth';
import { navigate } from 'gatsby';

const GuideList = () => {
  const [userProfile] = useState(getUserProfile());
  if (userProfile.role != ISADMIN) {
    navigate('/app/admin');
    return null;
  }
  
  return (
    <AdminLayout>
      <h2>Guide List</h2>
      <Guide />
    </AdminLayout>
  );
};

export default GuideList;
