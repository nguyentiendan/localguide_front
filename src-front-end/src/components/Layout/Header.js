import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { navigate } from '@reach/router';

import SmallScreen from '../Responsive/SmallScreen';
import FullWidth from '../FullWidth';
import BigScreen from '../Responsive/BigScreen';
import BannerImage from './BannerImage';
import { smallScreenCss } from '../../styles/responsive-css';
import SearchBox from '../SearchBox';
import breakpoints from '../../styles/breakpoints';
import { ENTER } from '../../constants/keys';

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

const TitleWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
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

const Title = styled.h1`
  color: #fff;
`;

const SubTitle = styled.h4`
  color: #fff;
`;

function Header({ title, subTitle, wrapper: ContentWrapper }) {
  return (
    <Wrapper>
      <FullWidthMaxHeight>
        <BannerImage />
        {!title && (
          <SearchWrapper>
            <SmallScreen>
              <LargeHeaderText>What are you looking for?</LargeHeaderText>
            </SmallScreen>
            <SearchBoxWrapper>
              <SearchBox
                onKeyDown={event => {
                  if (event.keyCode === ENTER) {
                    navigate(`/search?q=${event.target.value}`);
                  }
                }}
              />
            </SearchBoxWrapper>
            <BigScreen>
              <HeaderText>
                Have fun and learning while experiencing authentic locals with your local friend
              </HeaderText>
            </BigScreen>
          </SearchWrapper>
        )}
        {title && (
          <TitleWrapper>
            <ContentWrapper>
              <Title>{title}</Title>
              <SubTitle>{subTitle}</SubTitle>
            </ContentWrapper>
          </TitleWrapper>
        )}
      </FullWidthMaxHeight>
    </Wrapper>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  wrapper: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({})]).isRequired,
};

Header.defaultProps = {
  title: null,
  subTitle: null,
};

export default Header;
