import React, { useState } from 'react';
import { navigate } from 'gatsby';
import AdminLayout from '../AdminLayout';
import Schedule from './Schedule';
import { getUserProfile, ISADMIN } from '../../utils/auth';

const GuideSchedule = () => {
  const [userProfile] = useState(getUserProfile());
  if (userProfile.role == ISADMIN) {
    navigate('/app/admin');
    return null;
  }

  return (
    <AdminLayout>
      <h2>Guide Schedule</h2>
      <Schedule />
    </AdminLayout>
  );
};

export default GuideSchedule;
