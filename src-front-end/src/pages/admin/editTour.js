import React from 'react';
import PropTypes from 'prop-types';
import AdminLayout from '../../components/AdminLayout';
import EditTourWizard from '../../components/CreateTourWizard';

const EditTour = () => {
  return (
    <AdminLayout>
      <h2>Edit Tour</h2>
      <EditTourWizard location={location} />
    </AdminLayout>
  );
};

EditTour.propTypes = {
  location: PropTypes.shape({}).isRequired,
};

export default EditTour;

