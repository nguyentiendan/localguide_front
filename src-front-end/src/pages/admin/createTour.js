import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import Tour from '../../components/Admin/Tours';
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
