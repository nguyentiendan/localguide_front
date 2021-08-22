import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { Tooltip } from 'antd';
import RatingStars from '../RatingStars';
import colors from '../../assets/styles/colors';
import defaultTourImage from '../../assets/img/mocks/tours/tour-1.jpg';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  //width: 400px;
  //width: 310px;
  width: calc((310/334)*100%);
  overflow: hidden;
`;

const Title = styled.h3`
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const SubTitle = styled.h5`
  color: ${colors.grey[60]};
  font-weight: bold;
`;

const Description = styled.div`
  color: ${colors.grey[60]};
  font-weight: normal;
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const Picture = styled.img`
  //width: 400px;
  //height: 200px;
  //width: 310px;
  width: 100%;
  height: 175px;
  border-radius: 6px;
  object-fit: cover;
  object-position: center;
  margin-bottom: 0.75rem;
`;

const TourListItem = ({ className, id, uid, name, description, country, city, day, cover }) => (
  <Wrapper className={className}>
    <Link to={`/tour?uid=${uid}&id=${id}`}>
      <Picture src={cover || defaultTourImage} />
      <Title>{name}</Title>
      {/* <SubTitle>{`${country} - ${city}`}</SubTitle> */}
      <div
        style={{ display: 'flex', width: '95%', color: '#635e69', justifyContent: 'space-between' }}
      >
        <span>
          {country}/{city}
        </span>
        <span>{day} day</span>
      </div>
      <Tooltip placement="top" title={description}>
        <Description>{description}</Description>
      </Tooltip>
    </Link>
    <RatingStars rate={4.5} style={{ verticalAlign: 'text-bottom' }} />
  </Wrapper>
);

TourListItem.propTypes = {
  id: PropTypes.number.isRequired,
  uid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  country: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  day: PropTypes.number,
  cover: PropTypes.string.isRequired,
  className: PropTypes.string,
};

TourListItem.defaultProps = {
  className: '',
};

export default TourListItem;
