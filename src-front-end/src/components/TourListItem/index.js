import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'gatsby';
import colors from '../../styles/colors';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  width: 175px;
`;

const Title = styled.h3`
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const SubTitle = styled.h5`
  color: ${colors.grey[60]};
  font-weight: normal;
`;

const Picture = styled.img`
  width: 175px;
  height: 175px;
  border-radius: 6px;
  object-fit: cover;
  object-position: center;
  margin-bottom: 0.75rem;
`;

const TourListItem = ({ className, id, name, location, picture }) => (
  <Wrapper className={className}>
    <Link to={`/tours/${id}`}>
      <Picture src={picture} />
      <Title>{name}</Title>
      <SubTitle>{location}</SubTitle>
    </Link>
  </Wrapper>
);

TourListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  className: PropTypes.string,
};

TourListItem.defaultProps = {
  className: '',
};

export default TourListItem;
