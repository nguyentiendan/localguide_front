import React, { useState } from 'react';
import { navigate } from 'gatsby';
import AdminLayout from '../AdminLayout';
import { getUserProfile, ISADMIN } from '../../utils/auth';

const IndexPage = () => {
  const [userProfile] = useState(getUserProfile());
  if (userProfile.role != ISADMIN) {
    navigate('/');
    return null;
  }

  return (
    <AdminLayout>
      <div>
        Welcome {userProfile.fullname}, <b>Localguide Pal Admin</b>
      </div>
    </AdminLayout>
  );
};

export default IndexPage;
