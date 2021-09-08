import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import breakpoints from '../../../assets/styles/breakpoints';

const SliderWrapper = styled.div`
  max-width: ${breakpoints.lg};
  .slick-next {
    @media (min-width: 1200px) {
      left: 93%;
    }
    @media (min-width: 993px) and (max-width: 1200px) {
      left: 95%;
    }
    @media (min-width: 768px) and (max-width: 992px) {
      left: 88%;
    }
    @media (min-width: 489px) and (max-width: 767px) {
      left: 90%;
    }
    @media (min-width: 417px) and (max-width: 488px) {
      left: 90%;
    }
    @media (min-width: 350px) and (max-width: 416px) {
      left: 265px;
    }
    @media (max-width: 349px) {
      left: 85%;
    }
  }
  .slick-prev:before {
    color: black;
    font-size: 40px;
    margin-inline: 30px;
  }
  .slick-next:before {
    color: black;
    font-size: 40px;
  }
`

function Carousel({children}) {
  const SampleNextArrow = props => {
    const { className, style, onClick } = props;
    if (className.includes('slick-disabled')) {
      style.display = 'none';
    }
    return (
      <div
        className={className}
        style={{
          ...style,
          top: '30%',
          zIndex: '100',
        }}
        onClick={onClick}
      />
    );
  };

  const SamplePrevArrow = props => {
    const { className, style, onClick } = props;
    if (className.includes('slick-disabled')) {
      style.display = 'none';
    }
    return (
      <div
        className={className}
        style={{
          ...style,
          top: '30%',
          zIndex: '100',
        }}
        onClick={onClick}
      />
    );
  };

  const settings = {
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    arrow: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1.25,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 416,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <SliderWrapper>
      <Slider {...settings}>{children}</Slider>
    </SliderWrapper>
  )
}

export default Carousel;