import React, { useEffect, useState } from 'react';

import { Tabs } from 'antd';
import { navigate } from 'gatsby';
import Layout from '../components/Layout';
// import Layout from '../components/CustomLayout';
import TabTitle from '../components/TabTitle';
import Tours from '../components/Admin/Tours';
import Profile from '../components/Admin/Profile';
import { isAuthenticated, getUserProfile } from '../utils/auth';

// function AdminPage() {
const AdminPage = () => {
  // const [authToken] = useLocalStorage(AUTH_TOKEN_KEY);
  // if (!isAuthenticated()) {
  //  console.log("ABC")
  //  navigate('/login');
  // }
  const [userProfile] = useState(getUserProfile());
  useEffect(() => {
    function check() {
      if (!isAuthenticated()) {
        navigate('/login');
      }
    }
    check();
    const id = setInterval(check, 10000);

    return () => clearInterval(id);
  }, []);

  return (
    <Layout noHeader>
      <br />
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab={<TabTitle title="Tours" badge={3} />} key="1">
          <Tours />
        </Tabs.TabPane>
        <Tabs.TabPane tab={<TabTitle title="Guides" badge={2} />} key="2">
          Guides
        </Tabs.TabPane>
        <Tabs.TabPane tab={<TabTitle title="Profile" />} key="3">
          <Profile uid={userProfile?.uid} />
        </Tabs.TabPane>
        <Tabs.TabPane tab={<TabTitle title="Guests" />} key="4">
          Guests
        </Tabs.TabPane>
        <Tabs.TabPane tab={<TabTitle title="Guest reviews" badge={100} />} key="5">
          Guest reviews
        </Tabs.TabPane>
        <Tabs.TabPane tab={<TabTitle title="Blog" />} key="6">
          Blog
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
};

AdminPage.propTypes = {};

export default AdminPage;
