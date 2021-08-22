import React, { useState, } from 'react';
import AdminLayout from '../../components/AdminLayout';
import Schedule from '../../components/Guide/Schedule';
import { getUserProfile, ISGUIDE } from '../../utils/auth';
import { navigate } from 'gatsby';

const GuideSchedule = () => {
  const [userProfile] = useState(getUserProfile());
  if (userProfile.role != ISGUIDE) {
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
