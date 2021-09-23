import React, { useState } from 'react';
import { navigate } from 'gatsby';
import AdminLayout from '../AdminLayout';
import Language from './Setting/language';
import { getUserProfile, ISADMIN } from '../../utils/auth';

const LanguageList = () => {
  const [userProfile] = useState(getUserProfile());
  if (userProfile.role != ISADMIN) {
    navigate('/app/admin');
    return null;
  }

  return (
    <AdminLayout>
      <h2>Language List</h2>
      <Language />
    </AdminLayout>
  );
};

export default LanguageList;
