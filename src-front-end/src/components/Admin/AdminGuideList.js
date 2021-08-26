import React, { useState } from 'react';
import { navigate } from 'gatsby';
import AdminLayout from '../AdminLayout';
import Guide from './Guides';
import { getUserProfile, ISADMIN } from '../../utils/auth';

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
