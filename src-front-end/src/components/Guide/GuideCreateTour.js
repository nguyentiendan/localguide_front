import React, { useState } from 'react';
import { navigate } from 'gatsby';
import AdminLayout from '../AdminLayout';
import CreateTourWizard from '../CreateTourWizard';
import { getUserProfile, ISGUIDE } from '../../utils/auth';

const GuideCreateTour = () => {
  const [userProfile] = useState(getUserProfile());
  if (userProfile.role != ISGUIDE) {
    navigate('/app/admin');
    return null;
  }

  return (
    <AdminLayout>
      <h2>Create Tour</h2>
      <CreateTourWizard />
    </AdminLayout>
  );
};

export default GuideCreateTour;
