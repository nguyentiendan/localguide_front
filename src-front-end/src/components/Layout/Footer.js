import React from 'react';
import styled from 'styled-components';

import breakpoints from '../../styles/breakpoints';
import Delimiter from '../Delimiter';

const Wrapper = styled.footer`
  border-top: solid 1px #eceff0;
`;

const MainContainer = styled.div`
  margin: 0 auto;
  padding: 2rem 1rem 70px 1rem;
  max-width: 1440px;
  color: #7e7e7e;
`;

const Top = styled.div`
  display: flex;
  margin-bottom: 2rem;

  @media (max-width: ${breakpoints.sm}) {
    flex-direction: column;
  }
`;

const TopTitle = styled.h3`
  font-size: 1.125rem;
  font-style: bold;
  margin-bottom: 1rem;
`;

const AboutUs = styled.div`
  width: 28rem;
  margin-right: 1rem;

  p {
    margin: 0;
  }

  @media (max-width: ${breakpoints.sm}) {
    width: auto;
    margin: 0 0 1.5rem 0;
  }
`;

function Footer() {
  return (
    <Wrapper>
      <MainContainer>
        <Top>
          <AboutUs>
            <TopTitle>tourguide</TopTitle>
          </AboutUs>
        </Top>
        <Delimiter />
      </MainContainer>
    </Wrapper>
  );
}

export default Footer;
