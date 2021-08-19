import React, { useState, useEffect } from 'react';
// nodejs library that concatenates classes
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

// @material-ui/icons
import { Spin, Row, Col, Carousel } from 'antd';
import Slider from 'react-slick';

// core components
import styled from 'styled-components';
import breakpoints from '../../assets/styles/breakpoints';
import SectionHeader from '../SectionHeader';
import TourListItem from '../TourListItem';
import GridContainer from '../Grid/GridContainer.js';
import GridItem from '../Grid/GridItem.js';
import * as API from '../../apis';
import styles from '../../assets/styles/commonStyle.js';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const useStyles = makeStyles(styles);

const ListWrapper = styled.div`
  max-width: ${breakpoints.lg};
  //overflow: auto;
  .comment:last-child .delimiter {
    display: none;
  }
`;

const ListContainer = styled.div`

//  display: inline-flex;
//  flex-direction: row;

  display: flex;
  //overflow: hidden;
  flex-wrap: norap;
  width: 1024px;
  max-width: 1024px;

  & .destination + .destination,
  & .tour + .tour {
    margin-left: 2rem;
  }

  & .slick-slider,
  & .slick-list {
    width: 1024px;
    max-width: 1024px;
  }

  & .slick-prev:before,
  & .slick-next:before {
    opacity: 1;
    font-size: 15px;
    box-shadow: 0 0 8px gray;
    border-radius: 50%;
    color: #000;
    background-color: #fff;
    padding: 10px;
  }
  & .slick-next:before {
    content: '＞'
  }
  & .slick-prev:before {
    content: '＜'
  }
`;

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
    return (
      <div
        className={className}
        style={{
          // ...style,
          color: '＃000',
          fontSize: '15px',
          lineHeight: '1.5715',
          marginInline: '50px',
          top: '20%',
          right: '-30px',
        }}
        onClick={onClick}
      >
        {/* <RightOutlined /> */}
      </div>
    );
  };

  const SamplePrevArrow = props => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          // ...style,
          content: '＜',
          color: '#000',
          fontSize: '15px',
          lineHeight: '1.5715',
          // marginInline:'50px',
        }}
        onClick={onClick}
      >
        <LeftOutlined />
      </div>
    );
  };

  const settings = {
    // dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    adaptiveHeight: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
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
              <ListWrapper>
                <ListContainer>
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
                </ListContainer>
              </ListWrapper>
            </div>
          </GridItem>
        </GridContainer>
      </Spin>
    </div>
  );
}

export default TourSection;
