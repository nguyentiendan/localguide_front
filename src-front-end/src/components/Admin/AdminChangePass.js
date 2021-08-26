import React, { useState } from 'react';
import qs from 'query-string';
import { navigate } from 'gatsby';
import ChangePass from './User/ChangePass';
import AdminLayout from '../AdminLayout';
import { getUserProfile, ISUSER } from '../../utils/auth';

const AdminChangePass = () => {
  const [userProfile] = useState(getUserProfile());

  if (userProfile.role == ISUSER) {
    navigate('/app/admin');
    return null;
  }

  return (
    <AdminLayout>
      {/* <h2>Change Password</h2> */}
      <ChangePass uid={userProfile.uid} />
    </AdminLayout>
  );
};

export default AdminChangePass;
