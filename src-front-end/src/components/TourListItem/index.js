import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { Tooltip } from 'antd';
import RatingStars from '../RatingStars';
import colors from '../../assets/styles/colors';
import defaultTourImage from '../../assets/img/mocks/tours/tour-1.jpg';

import { smallScreenCss } from '../../assets/styles/responsive-css';
import { bigScreenCss } from '../../assets/styles/responsive-css';

console.log(smallScreenCss);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  //width: 400px;
  //width: 310px;
  //width: calc((310/334)*100%);
  width: 190px;
  overflow: hidden;

  ${smallScreenCss(`
      //width: 100%;
      width: calc((190/350)*100%);

      &img: 100%;
  `)}
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
  //height: 175px;
  border-radius: 6px;
  object-fit: cover;
  object-position: center;
  margin-bottom: 0.75rem;
`;


const settings = {
  // dots: true,
  autoplay: true,
  infinite: true,
  slidesToShow: 5,
  slidesToScroll: 1,
  speed: 500,
  // nextArrow: <SampleNextArrow />,
  // prevArrow: <SamplePrevArrow />,
    responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
      },
    },
  ],
};

const TourListItem = ({ className, id, uid, name, description, country, city, day, cover }) => (
  <Wrapper className={className}>
    <Link to={`/tour?uid=${uid}&id=${id}`}>
      {/*<Picture src={cover || defaultTourImage} />*/}
      <Picture src={require('../../assets/img/test/190x190.jpeg')} />
      <Title>{name}</Title>
      <div style={{ display: 'flex', color: '#635e69', justifyContent: 'flex-start' }}>
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
