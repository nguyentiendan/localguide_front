import React from 'react';
import styled from 'styled-components';

import SmallScreen from '../Responsive/SmallScreen';
import FullWidth from '../FullWidth';
import BigScreen from '../Responsive/BigScreen';
import BannerImage from './BannerImage';
import { smallScreenCss } from '../../styles/responsive-css';
import SearchBox from '../SearchBox';
import breakpoints from '../../styles/breakpoints';

const Wrapper = styled.header`
  border-bottom: solid 1px #eceff0;
`;

const FullWidthMaxHeight = styled(FullWidth)`
  max-height: 400px;
  overflow: hidden;
  position: relative;
`;

const SearchWrapper = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 2rem;
  justify-content: center;
  align-items: center;

  ${smallScreenCss(`
    justify-content: flex-start;
  `)}
`;

const LargeHeaderText = styled.h1`
  color: #fff;
  text-align: left;
`;

const HeaderText = styled.h4`
  color: #fff;
  text-align: left;
  max-width: 350px;
  margin-left: auto;
  margin-right: auto;
`;

const SearchBoxWrapper = styled.div`
  margin: 0 0 1rem;
  max-width: ${breakpoints.md};
  width: 100%;
`;

function Header() {
  return (
    <Wrapper>
      <FullWidthMaxHeight>
        <BannerImage />
        <SearchWrapper>
          <SmallScreen>
            <LargeHeaderText>What are you looking for?</LargeHeaderText>
          </SmallScreen>
          <SearchBoxWrapper>
            <SearchBox />
          </SearchBoxWrapper>
          <BigScreen>
            <HeaderText>
              Have fun and learning while experiencing authentic locals with your local friend
            </HeaderText>
          </BigScreen>
        </SearchWrapper>
      </FullWidthMaxHeight>
    </Wrapper>
  );
}

export default Header;
