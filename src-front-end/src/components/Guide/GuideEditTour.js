import React, { useState, } from 'react';
import PropTypes from 'prop-types';
import AdminLayout from '../../components/AdminLayout';
import EditTourWizard from '../../components/CreateTourWizard';
import { getUserProfile, ISGUIDE } from '../../utils/auth';
import { navigate } from 'gatsby';

const GuideEditTour = () => {
  const [userProfile] = useState(getUserProfile());
  if (userProfile.role != ISGUIDE) {
    navigate('/app/admin');
    return null;
  }
  
  return (
    <AdminLayout>      
      <EditTourWizard location={location} />
    </AdminLayout>
  );
};

GuideEditTour.propTypes = {
  location: PropTypes.shape({}).isRequired,
};

export default GuideEditTour;
