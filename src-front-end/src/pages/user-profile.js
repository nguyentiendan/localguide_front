import React, { useState } from 'react';
import styled from 'styled-components';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { getUserProfile } from '../utils/auth';
import UserProfileComponent from '../components/User';

const Wrapper = styled.div``;

function UserProfile() {
  const [userProfile] = useState(getUserProfile());

  return (
    <Layout noHeader>
      <SEO title="User Profile" />
      <Wrapper>
        <UserProfileComponent uid={userProfile?.uid} />
      </Wrapper>
    </Layout>
  );
}

UserProfile.propTypes = {};

export default UserProfile;
