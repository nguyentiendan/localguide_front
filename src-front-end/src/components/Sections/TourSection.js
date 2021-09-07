import React, { useState, useEffect } from 'react';
// nodejs library that concatenates classes
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// @material-ui/icons
import { Spin } from 'antd';
import Slider from 'react-slick';

// core components
import styled from 'styled-components';
import SectionHeader from '../SectionHeader';
import TourListItem from '../TourListItem';
import GridContainer from '../Grid/GridContainer.js';
import GridItem from '../Grid/GridItem.js';
import * as API from '../../apis';
import styles from '../../assets/styles/commonStyle.js';

// react-slick styles
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const useStyles = makeStyles(styles);

const SliderWrapper = styled.div`
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

function TourSection() {
  const [tours, setTours] = useState();
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    const fetchAllTour = async () => {
      try {
        setLoading(true);
        const response = await API.getAllPopularTours();
        setTours(response.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchAllTour();
    /* const interval = setInterval(() => fetchAllTour(), 100000);
    return () => {
      clearInterval(interval);
    }; */
  }, []);

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
    <div className={classes.container}>
      <Spin spinning={loading}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12}>
            <div className={classes.description}>
              <SectionHeader title="Popular Tour" />
              <SliderWrapper>
                <Slider {...settings}>
                  {tours &&
                    tours.map((tour, index) => {
                      return (
                        <TourListItem
                          key={index}
                          id={tour.id}
                          uid={tour.uid}
                          name={tour.name}
                          description={tour.shortDesc}
                          cover={tour.cover}
                          country={tour.country}
                          day={tour.day}
                          city={tour.city}
                          className="tour"
                        />
                      );
                    })}
                </Slider>
              </SliderWrapper>
            </div>
          </GridItem>
        </GridContainer>
      </Spin>
    </div>
  );
}

export default TourSection;
