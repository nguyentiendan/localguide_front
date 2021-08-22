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
              <a href="/app/admin/" style={{ color: '#fff' }}>Dashboard</a>
            </span>
          )}
          {user.role === 2 && (
            <span>
              <Link to="/app/guideAdmin/" style={{ color: '#fff' }}>Dashboard</Link>
            </span>
          )}
        </Menu.Item>
        <Menu.Item key="2">
          <RocketOutlined />
          {user.role === 3 && (
            <span>
              <Link to="/app/adminTourList/" style={{ color: '#fff' }}>Tour List</Link>
            </span>
          )}
          {user.role === 2 && (
            <span>
              <Link to="/app/guideTourList/" style={{ color: '#fff' }}>Tour List</Link>
            </span>
          )}
        </Menu.Item>

        {user.role === 3 && (
          <Menu.Item key="3">
            <UserOutlined />
            <span>
              <Link to="/app/adminGuideList/" style={{ color: '#fff' }}>Guide List</Link>
            </span>
          </Menu.Item>
        )}
        {user.role === 2 && (
          <>
            <Menu.Item key="4">
              <ProfileOutlined />                    
              <span>
                <Link to="/app/guideProfile" style={{ color: '#fff' }}>Profile</Link>
              </span>        
            </Menu.Item>,

            <Menu.Item key="5">
              <FundViewOutlined />                    
              <span>
                <a href="/app/reviewProfile" target="_blank" style={{ color: '#fff' }}>Review Profile</a>
              </span>        
            </Menu.Item>

            {/*<Menu.Item key="6">
              <FundViewOutlined />                    
              <span>
                <a href="/app/guideSchedule" target="_blank" style={{ color: '#fff' }}>Schedule</a>
              </span>        
            </Menu.Item>*/}
          </>
        )}  
        <Menu.Item key="7">
          <ProfileOutlined />
          {(user.role === 3 ||  user.role === 2) && (
            <span>
              <Link to="/app/adminChangePass" style={{ color: '#fff' }}>Change Password</Link>
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
