import React from 'react';

import { Tabs } from 'antd';
import Layout from '../components/Layout';
import TabTitle from '../components/TabTitle';
import Tours from '../components/MyTours/Tours';

function AdminPage() {
  return (
    <Layout noHeader>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab={<TabTitle title="Tours" badge={3} />} key="1">
          <Tours />
        </Tabs.TabPane>
        <Tabs.TabPane tab={<TabTitle title="Profile" />} key="2">
          Profile
        </Tabs.TabPane>
        <Tabs.TabPane tab={<TabTitle title="My Bookings" />} key="3">
          My Bookings
        </Tabs.TabPane>
        <Tabs.TabPane tab={<TabTitle title="My Inbox" />} key="4">
          My Inbox
        </Tabs.TabPane>
        <Tabs.TabPane tab={<TabTitle title="Payments" />} key="5">
          Payments
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
}

AdminPage.propTypes = {};

export default AdminPage;
