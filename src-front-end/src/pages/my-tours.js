import React from 'react';

import Layout from '../components/Layout';
import { Tabs }  from 'antd';
import TabTitle from '../components/TabTitle';
import Tours from '../components/MyTours/Tours';

function AdminPage() {
  return (
    <Layout noHeader>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab={<TabTitle title="Tours" badge={3 }/>} key="1">
          <Tours/>
        </Tabs.TabPane>
        <Tabs.TabPane tab={<TabTitle title="Profile"/>} key="2">
          Profile
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
}

AdminPage.propTypes = {};

export default AdminPage;
