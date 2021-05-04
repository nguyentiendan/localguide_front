import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import Tour from '../../components/Admin/Tours';

const TourList = () => {
  return (
    <AdminLayout>
      <h2>Tour List</h2>
      <Tour />
    </AdminLayout>
  );
};

export default TourList;
