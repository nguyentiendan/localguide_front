import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { math } from 'polished';

import { Link } from 'gatsby';
import useAuth from '../../utils/useAuth';
import { hideAt } from '../../utils/responsive';
import breakpoints from '../../assets/styles/breakpoints';
import colors from '../../assets/styles/colors';
import Dropdown from '../Dropdown';
import Menu from '../Menu';

const SmallScreen = hideAt({ min: math(`${breakpoints.sm} + 1px`) });
const BigScreen = hideAt({ max: breakpoints.sm });

const StyledDropdown = styled(Dropdown).attrs({
  triggerClassName: 'trigger',
  menuClassName: 'menu',
})`
  margin-left: 1rem;

  .trigger {
    height: auto;
  }

  .menu {
    top: 35px;

    @media (max-width: ${breakpoints.sm}) {
      top: 42px;
    }
  }
`;

const Delimiter = styled.hr`
  height: 1px;
  margin: 5px 0;
`;

function UserDropdown({ avatarSize, ...rest }) {
  const { user, logout } = useAuth();

  if (!user) {
    return null;
  }

  const userName = user.fullname || '';

  const trigger = (
    <>
      <BigScreen>{`Hi ${userName}`}</BigScreen>
      <SmallScreen style={{ color: colors.white }}>{`Hi ${userName}`}</SmallScreen>
    </>
  );

  return (
    <StyledDropdown trigger={trigger} position="right" {...rest}>
      <Menu>
        {user.role === 3 && (
          <Menu.Item>
            <Link to="/app/admin">Admin settings</Link>
          </Menu.Item>
        )}
        {user.role === 1 && (
          <Menu.Item>
            <Link to="/app/profile">Profile</Link>
          </Menu.Item>
        )}
        {user.role === 2 && (
          <Menu.Item>
            <Link to="/app/guideAdmin">Guide Admin</Link>
          </Menu.Item>
        )}
        {(user.role === 1 || user.role === 2) && <Menu.Item>Change password</Menu.Item>}
        <Delimiter />
        <Menu.Item danger onClick={logout}>
          Logout
        </Menu.Item>
      </Menu>
    </StyledDropdown>
  );
}

UserDropdown.propTypes = {
  avatarSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

UserDropdown.defaultProps = {
  avatarSize: 44,
};

export default UserDropdown;
