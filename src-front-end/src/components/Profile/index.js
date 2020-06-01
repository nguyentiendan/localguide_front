import React from 'react';
import styled from 'styled-components';

import breakpoints from '../../styles/breakpoints';
import ChangePassword from './ChangePassword';

const Header = styled.header`
  padding: 1.5rem 0;
  font-size: 1.375rem;
  font-weight: 500;
  color: #343434;
  background-color: #ffffff;
`;

const Body = styled.section`
  padding: 0 0 1.5rem 0;
  text-align: left;
  background-color: #ffffff;
`;

const Section = styled.div`
  max-width: 750px;
  margin: 0 auto;

  @media (max-width: ${breakpoints.sm}) {
    &:first-of-type {
      ${Header} {
        padding-top: 0;
      }
    }
  }
`;

const Divider = styled.div`
  max-width: 750px;
  margin: 1rem auto;
  border-bottom: solid 1px #eceff0;
`;

function Profile() {
  return (
    <>
      <Section>
        <Header>Your Profile</Header>
        <Body />
      </Section>

      <Divider />

      <Section>
        <Header>Change Password</Header>
        <Body>
          <ChangePassword />
        </Body>
      </Section>

      <Divider />
    </>
  );
}

export default Profile;
