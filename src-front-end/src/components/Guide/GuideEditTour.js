import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
import AdminLayout from '../AdminLayout';
import EditTourWizard from '../CreateTourWizard';
import { getUserProfile, ISGUIDE } from '../../utils/auth';

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
