import React from 'react';

import Layout from '../components/Layout';
import {Button, Tabs} from 'antd';
import TabTitle from '../components/TabTitle';
import Tours from '../components/Admin/Tours';

function AdminPage() {
  return (
    <Layout noHeader>
      <br/>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab={<TabTitle title="Tours" badge={3 }/>} key="1">
          <Tours/>
        </Tabs.TabPane>
        <Tabs.TabPane tab={<TabTitle title="Guides" badge={2}/>} key="2">
          Guides
        </Tabs.TabPane>
        <Tabs.TabPane tab={<TabTitle title="Profile"/>} key="3">
          Profile
        </Tabs.TabPane>
        <Tabs.TabPane tab={<TabTitle title="Guests"/>} key="4">
          Guests
        </Tabs.TabPane>
        <Tabs.TabPane tab={<TabTitle title="Guest reviews" badge={100}/>} key="5">
          Guest reviews
        </Tabs.TabPane>
        <Tabs.TabPane tab={<TabTitle title="Blog" />} key="6">
          Blog
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
}

AdminPage.propTypes = {};

export default AdminPage;
