import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { isAuthenticated, getUserProfile } from '../../utils/auth';

const IndexPage = () => {
  const [userProfile] = useState(getUserProfile());

  const HandleRole = () => {
    switch (userProfile.role) {
      case 2:
        return (
          <div>
            Welcome {userProfile.fullname}, <b>Guide Admin</b>
          </div>
        );
      case 3:
        return (
          <div>
            Welcome {userProfile.fullname}, <b>Localguide Pal Admin</b>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <AdminLayout>
      <HandleRole />
    </AdminLayout>
  );
};

export default IndexPage;
