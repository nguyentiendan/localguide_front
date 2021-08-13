import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'gatsby';
import RatingStars from '../RatingStars';
import defaultAvatar from '../../assets/img/avatar-default.jpg';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100px;
  text-align: center;
`;

const Title = styled.h3`
  margin-bottom: 0.5rem;
  font-weight: 600;
  font-size: 14px;
`;

const SubTitle = styled.h5`
  font-weight: normal;
`;

const Avatar = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  margin-bottom: 0.25rem;
  //align-items: right;
`;

const TourGuideListItem = ({ className, name, level, avatar, uid, id }) => (
  <Wrapper className={className}>
    <Link to={`/guide?uid=${uid}&id=${id}`}>
      <Avatar src={avatar || defaultAvatar} />
    </Link>
    {/* <Title>{name}</Title>
     <SubTitle>{level}</SubTitle> */}
  </Wrapper>
);

TourGuideListItem.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  level: PropTypes.number,
  avatar: PropTypes.string,
};

TourGuideListItem.defaultProps = {
  className: '',
  name: '',
  level: 0,
  avatar: '',
};

export default TourGuideListItem;
