import React from 'react';
import { navigate } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/CustomLayout';
import SEO from '../components/SEO';

const Wrapper = styled.div`
  max-width: 19rem;
  margin: 3rem auto;
  text-align: center;
`;

const Title = styled.h4`
  font-size: 1.42857em;
  font-style: inherit;
  line-height: 1.2;
  color: rgb(23, 43, 77);
  font-weight: 500;
  letter-spacing: -0.008em;
  margin-top: 0;
  margin-bottom: 1rem;
`;

const LinkButton = styled.button`
  display: inline-flex;
  align-items: baseline;
  border-width: 0;
  max-width: 100%;
  outline: none !important;
  text-align: center;
  text-decoration: none;
  color: #6b778c !important;
  background: none;
  box-shadow: 0 0 0 2px inherit;
  padding: 0 0.5rem;
  cursor: pointer;
`;

function NotFound() {
  const goHomeButton = <LinkButton onClick={() => navigate('/')}>Home page</LinkButton>;

  return (
    <Wrapper>
      <SEO title="404: Not found" />
      <Title>Oops! Page not found!</Title>
      {goHomeButton}
    </Wrapper>
  );
}

export default NotFound;
