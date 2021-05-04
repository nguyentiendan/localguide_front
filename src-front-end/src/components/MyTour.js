import React, { useState } from 'react';

import { Tabs } from 'antd';
import Layout from './Layout';
import TabTitle from './TabTitle';
import Tours from './MyTours/Tours';
import Profile from './MyTours/Profile';
import { getUserProfile } from '../utils/auth';

function MyTour() {
  const [userProfile] = useState(getUserProfile());

  return (
    <Layout noHeader>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab={<TabTitle title="Tours" badge={3} />} key="1">
          <Tours />
        </Tabs.TabPane>
        <Tabs.TabPane tab={<TabTitle title="Profile" />} key="2">
          {/* <Profile uid={userProfile?.uid} /> */}
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

MyTour.propTypes = {};

export default MyTour;
