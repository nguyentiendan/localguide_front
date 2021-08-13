import React, { useState, } from 'react';
import AdminLayout from '../../components/AdminLayout';
import CreateTourWizard from '../../components/CreateTourWizard';
import { getUserProfile, ISGUIDE } from '../../utils/auth';
import { navigate } from 'gatsby';

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
