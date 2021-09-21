import React from 'react';
import {
  UserOutlined,
  ProfileOutlined,
  LogoutOutlined,
  DashboardOutlined,
  RocketOutlined,
  FundViewOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { Link } from 'gatsby';
import { Popconfirm, Menu } from 'antd';
import useAuth from '../../utils/useAuth';

const { SubMenu } = Menu;

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
              <a href="/app/admin/" style={{ color: '#ccc' }}>
                Dashboard
              </a>
            </span>
          )}
          {user.role === 2 && (
            <span>
              <Link to="/app/guideAdmin/" style={{ color: '#ccc' }}>
                Dashboard
              </Link>
            </span>
          )}
        </Menu.Item>
        <Menu.Item key="2">
          <RocketOutlined />
          {user.role === 3 && (            
            <span >
              <Link to="/app/adminTourList/"  style={{ color: '#ccc' }}>
                Tour List
              </Link>
            </span>
          )}
          {user.role === 2 && (
            <span>
              <Link to="/app/guideTourList/" style={{ color: '#ccc' }}>
                Tour List
              </Link>
            </span>
          )}
        </Menu.Item>

        {user.role === 3 && (
          <Menu.Item key="3">
            <UserOutlined />
            <span>
              <Link to="/app/adminGuideList/" style={{ color: '#ccc' }}>
                User List
              </Link>
            </span>
          </Menu.Item>
        )}
        {user.role === 2 && (
          <>
            <Menu.Item key="4">
              <ProfileOutlined />
              <span>
                <Link to="/app/guideProfile" style={{ color: '#ccc' }}>
                  Profile
                </Link>
              </span>
            </Menu.Item>
            ,
            <Menu.Item key="5">
              <FundViewOutlined />
              <span>
                <a href="/app/reviewProfile" target="_blank" style={{ color: '#ccc' }}>
                  Review Profile
                </a>
              </span>
            </Menu.Item>
            {/* <Menu.Item key="6">
              <FundViewOutlined />                    
              <span>
                <a href="/app/guideSchedule" target="_blank" style={{ color: '#fff' }}>Schedule</a>
              </span>        
            </Menu.Item> */}
          </>
        )}
        {user.role === 3 && (
          <SubMenu key="sub1" icon={<SettingOutlined />} title="Setting master">
            <Menu.Item key="6_1">
              <Link to="/app/adminSetInterest">Interest master</Link>
            </Menu.Item>
            <Menu.Item key="6_2">Extras master</Menu.Item>
            <Menu.Item key="6_3">Tag master</Menu.Item>
            <Menu.Item key="6_4">Language master</Menu.Item>
          </SubMenu>
        )}

        <Menu.Item key="7">
          <ProfileOutlined />
          {(user.role === 3 || user.role === 2) && (
            <span>
              <Link to="/app/adminChangePass" style={{ color: '#ccc' }}>
                Change Password
              </Link>
            </span>
          )}
        </Menu.Item>

        <Menu.Item key="8">
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
