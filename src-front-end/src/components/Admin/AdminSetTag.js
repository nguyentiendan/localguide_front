import React, { useState } from 'react';
import { navigate } from 'gatsby';
import AdminLayout from '../AdminLayout';
import Tag from './Setting/tag';
import { getUserProfile, ISADMIN } from '../../utils/auth';

const TagList = () => {
  const [userProfile] = useState(getUserProfile());
  if (userProfile.role != ISADMIN) {
    navigate('/app/admin');
    return null;
  }

  return (
    <AdminLayout>
      <h2>Tag List</h2>
      <Tag />
    </AdminLayout>
  );
};

export default TagList;
