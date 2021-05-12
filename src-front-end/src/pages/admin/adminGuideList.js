import React from 'react';
import AdminLayout from '../../components/AdminLayout';
import Guide from '../../components/Admin/Guides';

const GuideList = () => {
  return (
    <AdminLayout>
      <h2>Guide List</h2>
      <Guide />
    </AdminLayout>
  );
};

export default GuideList;
