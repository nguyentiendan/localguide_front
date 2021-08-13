import React, { useState, } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { getUserProfile, ISADMIN} from '../../utils/auth';
import { navigate } from 'gatsby';

const IndexPage = () => {
  const [userProfile] = useState(getUserProfile());  
  if ( userProfile.role != ISADMIN ) {
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
