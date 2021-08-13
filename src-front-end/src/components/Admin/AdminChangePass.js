import React, { useState, } from 'react';
import ChangePass from './User/ChangePass';
import AdminLayout from '../../components/AdminLayout';
import qs from 'query-string';
import { getUserProfile, ISUSER } from '../../utils/auth';
import { navigate } from 'gatsby';

const AdminChangePass = () => {  
  const [userProfile] = useState(getUserProfile());
  
  if ( userProfile.role == ISUSER ) {
    navigate('/app/admin');
    return null;
  }  

  return (    
    <AdminLayout>
      {/*<h2>Change Password</h2>*/}
      <ChangePass uid={userProfile.uid} /> 
    </AdminLayout>
  );
};

export default AdminChangePass;
