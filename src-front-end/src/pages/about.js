import React from 'react';
import styled from 'styled-components';

import Layout from '../components/Layout';
import SEO from '../components/SEO';

const Title = styled.h1`
  font-size: 1.375rem;
  font-weight: 500;
`;

function AboutPage() {
  return (
    <Layout>
      <SEO title="About Us" />
      <Title>About us</Title>
    </Layout>
  );
}

export default AboutPage;
