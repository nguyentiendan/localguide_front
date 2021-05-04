import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  ProfileOutlined,
  LogoutOutlined,
  DashboardOutlined,
  RocketOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Link } from 'gatsby';
import { AuthProvider } from useAuth from '../../utils/useAuth';


const { Header, Sider, Content, Footer } = Layout;

const AdminLayout = ({ children }) => {
  const [collapse, setCollapse] = useState(false);

  useEffect(() => {
    window.innerWidth <= 760 ? setCollapse(true) : setCollapse(false);
  }, []);

  const handleToggle = event => {
    event.preventDefault();
    collapse ? setCollapse(false) : setCollapse(true);
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapse}>
        <div style={{ height: '32px', margin: '16px' }}>
          <h2 style={{ color: '#fff' }}>Admin</h2>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <DashboardOutlined />
            <span>
              <Link to="/admin/">Dashboard</Link>
            </span>
          </Menu.Item>
          <Menu.Item key="2">
            <RocketOutlined />
            <span>
              <Link to="/admin/tourList/">Tour List</Link>
            </span>
          </Menu.Item>
          <Menu.Item key="3">
            <UserOutlined />
            <span> Guide</span>
          </Menu.Item>
          <Menu.Item key="4">
            <ProfileOutlined />
            <span>
              <Link to="/admin/profile">Profile</Link>
            </span>
          </Menu.Item>
          <Menu.Item key="5">
            <LogoutOutlined />
            <span>
              <Link>Logout</Link>
            </span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: '#001529', color: '#fff' }}>
          {React.createElement(collapse ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: handleToggle,
            style: { color: '#fff' },
          })}
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 20,
            minHeight: 'calc(100vh - 114px)',
            background: '#fff',
          }}
        >
          <div style={{ margin: '0 auto' }}>{children}</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>©2021 Created by Localguide Pal</Footer>
      </Layout>
    </Layout>
  );
};

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;
