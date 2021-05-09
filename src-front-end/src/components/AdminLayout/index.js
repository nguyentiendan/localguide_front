import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { AuthProvider } from '../../utils/useAuth';
import SlideNav from './SlideNav';

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
    <AuthProvider>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapse}>
          <SlideNav />
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
    </AuthProvider>
  );
};

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;
