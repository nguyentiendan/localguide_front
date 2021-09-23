import React, { useState } from 'react';
import { navigate } from 'gatsby';
import AdminLayout from '../AdminLayout';
import Extra from './Setting/extra';
import { getUserProfile, ISADMIN } from '../../utils/auth';

const ExtraList = () => {
  const [userProfile] = useState(getUserProfile());
  if (userProfile.role != ISADMIN) {
    navigate('/app/admin');
    return null;
  }

  return (
    <AdminLayout>
      <h2>Extras List</h2>
      <Extra />
    </AdminLayout>
  );
};

export default ExtraList;
