import React from 'react';
import AdminLayout from '../../components/AdminLayout';
import GuideTours from '../../components/MyTours/Tours';

const GuideTourList = () => {
  return (
    <AdminLayout>
      <h2>Tour List</h2>
      <GuideTours />
    </AdminLayout>
  );
};

export default GuideTourList;
