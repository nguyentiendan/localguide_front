import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'gatsby';
import colors from '../../assets/styles/colors';
import Button from '../Button';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  width: 100%;
`;

const Title = styled.h1``;
const PrimaryText = styled.span`
  color: ${colors.magenta[50]};
`;

const SubTitle = styled.h3`
  font-weight: normal;
`;
const UnderlineText = styled.span`
  text-decoration: underline;
`;

const StartCreateTour = ({ onStart, location }) => {
  return (
    <Wrapper>
      <Title>
        Welcome to&nbsp;
        <PrimaryText>GuidePal</PrimaryText>
        &nbsp;Community!
      </Title>
      <br />
      <SubTitle>
        Let&apos;s create an&nbsp;
        <UnderlineText>unique</UnderlineText>
        ,&nbsp;
        <UnderlineText>fun</UnderlineText>
        &nbsp;and&nbsp;
        <UnderlineText>educational</UnderlineText>
        &nbsp;tour for your dearest friends!
      </SubTitle>
      <br />
      <div>
        <Button onClick={onStart}>
          {location.pathname === '/edit-tour' ? 'Edit Tour' : 'Start'}
        </Button>
        <Button style={{ marginLeft: 20 }}>
          <Link to="/my-tours" style={{ color: '#ffffff' }}>
            Cancel
          </Link>
        </Button>
      </div>
    </Wrapper>
  );
};

StartCreateTour.propTypes = {
  onStart: PropTypes.func,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

StartCreateTour.defaultProps = {
  onStart: () => {},
};

export default StartCreateTour;
