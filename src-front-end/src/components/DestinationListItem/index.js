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
  width: 325px;
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
  width: 325px;
  height: 175px;
  border-radius: 6px;
  object-fit: cover;
  object-position: center;
  margin-bottom: 0.75rem;
`;

const DestinationListItem = ({ className, name, location, picture, id, uid }) => (
  <Wrapper className={className}>
    <Link to={`/tours/${uid}/${id}?status=view`}>
      <Picture src={picture} />
      <Title>{name}</Title>
      <SubTitle>{location}</SubTitle>
    </Link>
  </Wrapper>
);

DestinationListItem.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  uid: PropTypes.string.isRequired,
};

DestinationListItem.defaultProps = {
  className: '',
};

export default DestinationListItem;
