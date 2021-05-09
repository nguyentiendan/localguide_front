import React from 'react';
import AdminLayout from '../../components/AdminLayout';
import CreateTourWizard from '../../components/CreateTourWizard';

const CreateTour = () => {
  return (
    <AdminLayout>
      <h2>Create Tour</h2>
      <CreateTourWizard />
    </AdminLayout>
  );
};

export default CreateTour;
