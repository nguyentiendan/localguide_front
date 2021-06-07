import React from 'react';
import {UserOutlined, ProfileOutlined, LogoutOutlined, DashboardOutlined,RocketOutlined,} from '@ant-design/icons';
import { Link } from 'gatsby';
import { Menu } from 'antd';
import useAuth from '../../utils/useAuth';

const SlideNav = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return null;  
  }

  return (
    <div>
      <div style={{ height: '32px', margin: '16px' }}>
        <h2 style={{ color: '#fff' }}>Admin</h2>
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
          <DashboardOutlined />
          <span>
            {/*<Link to="app/admin/">Dashboard</Link>*/}
            <a href="app/admin/">Dashboard</a>
          </span>
        </Menu.Item>
        <Menu.Item key="2">
          <RocketOutlined />
          {user.role === 3 && (
            <span>
              <Link to="/app/adminTourList/">Tour List</Link>
            </span>
          )}
          {user.role === 2 && (
            <span>
              <Link to="/app/guideTourList/">Tour List</Link>
            </span>
          )}
        </Menu.Item>

        {user.role === 3 && (
          <Menu.Item key="3">
            <UserOutlined />
            <span>
              <Link to="/app/adminGuideList/">Guide List</Link>
            </span>
          </Menu.Item>
        )}
        {user.role === 2 && (
        <Menu.Item key="4">
          <ProfileOutlined />                    
            <span>
              <Link to="/app/guideProfile">Profile</Link>
            </span>        
        </Menu.Item>
        )}  
        <Menu.Item key="5">
          <ProfileOutlined />
          {user.role === 3 && (
            <span>
              <Link to="/admin/profile">Change Password</Link>
            </span>
          )}
          {user.role === 2 && (
            <span>
              <Link to="/admin/guide_changePass">Change Password</Link>
            </span>
          )}
        </Menu.Item>

        <Menu.Item key="6" onClick={logout}>
          <LogoutOutlined />
          <span>Logout</span>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default SlideNav;
