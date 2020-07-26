import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { math } from 'polished';

import useAuth from '../../utils/useAuth';
import { hideAt } from '../../utils/responsive';
import breakpoints from '../../styles/breakpoints';
import colors from '../../styles/colors';
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

const UserInfo = styled.div`
  padding: 14px 14px 20px 14px;
  border-bottom: 1px solid #f6f6f6;
`;

const UserName = styled.div`
  font-size: 0.875rem;
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
      <UserInfo>
        <UserName>{userName}</UserName>
      </UserInfo>

      <Menu>
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
