import React, { useState } from 'react';
import { navigate } from 'gatsby';
import AdminLayout from '../AdminLayout';
import Interest from './Setting/interest';
import { getUserProfile, ISADMIN } from '../../utils/auth';

const InterestList = () => {
  const [userProfile] = useState(getUserProfile());
  if (userProfile.role != ISADMIN) {
    navigate('/app/admin');
    return null;
  }

  return (
    <AdminLayout>
      <h2>Interest List</h2>
      <Interest />
    </AdminLayout>
  );
};

export default InterestList;
