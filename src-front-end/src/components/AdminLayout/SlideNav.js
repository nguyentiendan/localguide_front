import React from 'react';
import {UserOutlined, ProfileOutlined, LogoutOutlined, DashboardOutlined,RocketOutlined,FundViewOutlined} from '@ant-design/icons';
import { Link } from 'gatsby';
import { Popconfirm, Menu } from 'antd';
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
          {user.role === 3 && (
            <span>          
              <a href="/app/admin/">Dashboard</a>
            </span>
          )}
          {user.role === 2 && (
            <span>
              <Link to="/app/guideAdmin/">Dashboard</Link>
            </span>
          )}
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
          <>
            <Menu.Item key="4">
              <ProfileOutlined />                    
              <span>
                <Link to="/app/guideProfile">Profile</Link>
              </span>        
            </Menu.Item>,

            <Menu.Item key="5">
              <FundViewOutlined />                    
              <span>
                <a href="/app/reviewProfile" target="_blank" >Review Profile</a>
              </span>        
            </Menu.Item>

            <Menu.Item key="6">
              <FundViewOutlined />                    
              <span>
                <a href="/app/guideSchedule" target="_blank" >Schedule</a>
              </span>        
            </Menu.Item>
          </>
        )}  
        <Menu.Item key="7">
          <ProfileOutlined />
          {(user.role === 3 ||  user.role === 2) && (
            <span>
              <Link to="/app/adminChangePass">Change Password</Link>
            </span>
          )}          
        </Menu.Item>

        <Menu.Item key="8" >
          <Popconfirm
            title="Are you sure to Logout?"
            onConfirm={logout}
            okText="Yes"
            cancelText="No"
          >
            <LogoutOutlined />
            <span>Logout</span>
          </Popconfirm>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default SlideNav;
