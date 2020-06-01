import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../Button';
import breakpoints from '../../styles/breakpoints';

const Wrapper = styled.div`
  width: 100%;
  margin: 1.5rem 0;
  text-align: center;
`;

const Title = styled.h3`
  margin-bottom: 0.5rem;
  font-weight: 300;
`;

const JoinUsButton = styled(Button)`
  width: 100%;
  justify-content: center;
  max-width: ${breakpoints.sm};
`;

const JoinUsSection = ({ className }) => (
  <Wrapper className={className}>
    <Title>Want to be a tour guide?</Title>
    <JoinUsButton>Join with us now</JoinUsButton>
  </Wrapper>
);

JoinUsSection.propTypes = {
  className: PropTypes.string,
};

JoinUsSection.defaultProps = {
  className: '',
};

export default JoinUsSection;
