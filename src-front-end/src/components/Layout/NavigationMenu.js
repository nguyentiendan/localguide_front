import React from 'react';
import { Link } from 'gatsby';
import styled, { css } from 'styled-components';
import { darken } from 'polished';
import { MdSort } from 'react-icons/md';
import { AiOutlineHome, AiOutlineSchedule } from 'react-icons/ai';
import { FiMapPin, FiInbox } from 'react-icons/fi';

import useAuth from '../../utils/useAuth';
import { isBrowser } from '../../utils/browser';
import Dropdown from '../Dropdown';
import BigScreen from '../Responsive/BigScreen';
import SmallScreen from '../Responsive/SmallScreen';
import breakpoints from '../../styles/breakpoints';
import { bigScreenCss } from '../../styles/responsive-css';
import colors from '../../styles/colors';
import NavItem from './NavItem';

const NavigationLink = styled(Link).attrs(props => ({ to: props.to || '/' }))`
  display: inline-block;
  line-height: 0;
  text-decoration: none;
  color: ${colors.grey[50]};
  font-weight: normal;

  &.is-active {
    color: ${colors.magenta[50]};
    font-weight: bold;
  }
`;

const TopMenuWrapper = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${bigScreenCss(`
    background: ${colors.white};
  `)}
`;

const TopMenuContainer = styled.header`
  max-width: ${breakpoints.lg};
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  
  ${NavigationLink} + ${NavigationLink} {
    margin-left: 3rem;
  }
`;

const BottomMenuWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: ${colors.grey[20]};
  border-top: 1px solid ${colors.grey[40]};
  display: flex;
  justify-content: space-between;
  align-items: center;

  .nav-item {
    flex-basis: 0;
    flex-grow: 1;
  }
`;

const RightPanel = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const linkButton = css`
  display: inline-block;
  padding: 0 1rem;
  border-radius: 6px;
  height: 40px;
  line-height: 40px;
  font-weight: 500;
`;

const SignupLink = styled(Link).attrs({ to: '/signup/' })`
  ${linkButton};
  background: ${colors.magenta[50]};
  color: #ffffff;
  font-size: 0.875rem;

  &:hover {
    background: ${colors.magenta[60]};
    color: #ffffff;
  }
`;

const LoginLink = styled(Link).attrs({ to: '/login/' })`
  ${linkButton};
  margin: 0 0.375rem 0 1rem;
  border: 1px solid #b7b5bd;
  color: #78757a;
  font-size: 0.875rem;

  &:hover {
    border-color: ${darken(0.04, '#b7b5bd')};
    color: ${darken(0.1, '#78757a')};
  }
`;

const MenuIcon = styled(MdSort)`
  font-size: 1.5rem;
  margin-left: 1rem;
  cursor: pointer;
  color: ${colors.white};
`;

const AuthMenu = styled.div`
  padding: 0.8rem;

  ${LoginLink},
  ${SignupLink} {
    width: 100%;
    margin: 0.3rem 0;
    text-align: center;
  }
`;

function NavigationMenu() {
  const { user } = useAuth();

  const authInfo = user ? (
    <></>
  ) : (
    <>
      <BigScreen>
        <LoginLink>Sign In</LoginLink>
        <SignupLink>Sign Up</SignupLink>
      </BigScreen>
      <SmallScreen>
        <Dropdown trigger={<MenuIcon />} position="right" triggerHeight="54px">
          <AuthMenu>
            <LoginLink>Sign In</LoginLink>
            <SignupLink>Sign Up</SignupLink>
          </AuthMenu>
        </Dropdown>
      </SmallScreen>
    </>
  );

  return (
    <>
      <TopMenuWrapper>
        <TopMenuContainer>
          <BigScreen>
            <NavigationLink activeClassName="is-active">Home</NavigationLink>
            <NavigationLink activeClassName="is-active" to="/my-trips">
              My Trips
            </NavigationLink>
            <NavigationLink activeClassName="is-active" to="/create-tour">
              Create Tour
            </NavigationLink>
            <NavigationLink activeClassName="is-active" to="/my-inbox">
              My Inbox
            </NavigationLink>
          </BigScreen>
          <RightPanel>{isBrowser() && authInfo}</RightPanel>
        </TopMenuContainer>
      </TopMenuWrapper>
      <SmallScreen>
        <BottomMenuWrapper>
          <NavItem className="nav-item" title="Home" link="/" icon={<AiOutlineHome />} />
          <NavItem
            className="nav-item"
            title="My Trips"
            link="/my-trips"
            icon={<AiOutlineSchedule />}
          />
          <NavItem
            className="nav-item"
            title="Create Tour"
            link="/create-tour"
            icon={<FiMapPin />}
          />
          <NavItem className="nav-item" title="My Inbox" link="/my-inbox" icon={<FiInbox />} />
          {/* <NavItem className="nav-item" title="My Account" link="/" icon={<AiOutlineUser />} /> */}
        </BottomMenuWrapper>
      </SmallScreen>
    </>
  );
}

export default NavigationMenu;
