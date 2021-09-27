import React, { useState, useEffect } from 'react';
// nodejs library that concatenates classes
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { Spin } from 'antd';
import { Link } from 'gatsby';
import Slider from 'react-slick';
import breakpoints from '../../assets/styles/breakpoints';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// @material-ui/icons
// core components
import GuideListItem from '../GuideListItem';
// import GridContainer from '../Grid/GridContainer.js';
import GridItem from '../Grid/GridItem';
import SectionHeader from '../SectionHeader';
import * as API from '../../apis';

import styles from '../../assets/styles/commonStyle';
import Carousel from '../Sections/Carousel/Carousel';
import Card from '../Card/Card';
import CardBody from '../Card/CardBody';
import defaultAvatar from '../../assets/img/avatar-default.jpg';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  //align-items: center;
  position: relative;
  width: 130px;
  text-align: center;
`;

const Title = styled.h3`
  margin-bottom: 0.5rem;
  font-weight: 600;
  font-size: 14px;
`;

const Avatar = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  margin: 0 auto;
  margin-bottom: 1rem;
  //align-items: center;
  text-align: center;
`;

const SubTitle = styled.h5`
  font-weight: normal;
`;

const SliderWrapper = styled.div`
  max-width: ${breakpoints.lg};
  .slick-next {
    @media (min-width: 1201px) {
      left: 97%;
    }
    @media (min-width: 992px) and (max-width: 1200px) {
      left: 93%;
    }
    @media (min-width: 768px) and (max-width: 991px) {
      left: 85%;
    }
    @media (min-width: 501px) and (max-width: 767px) {
      left: 90%;
    }
    @media (min-width: 447px) and (max-width: 500px) {
      left: 85%;
    }
    @media (min-width: 350px) and (max-width: 446px) {
      left: 240px;
    }
    @media (max-width: 349px) {
      left: 235px;
    }
  }
  .slick-prev:before {
    color: black;
    font-size: 40px;
    margin-inline: 5px;
  }
  .slick-next:before {
    color: black;
    font-size: 40px;
  }
`;

const useStyles = makeStyles(styles);

function TeamResultSection() {
  const [tourGuides, setTourGuides] = useState();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  const classes = useStyles();

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
          top: '35%',
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
          top: '35%',
          zIndex: '100',
        }}
        onClick={onClick}
      />
    );
  };

  const settings = {
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 500,
    arrow: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3.5,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 446,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const fetchTourGuides = async () => {
      try {
        setLoading(true);
        const response = await API.getAllTourGuides();
        if (response.data.length == 0) {
          setData(0);
        } else {
          setData(response.data.length);
          setTourGuides(response.data);
        }

        // TODO : if network down or data not found => call mock API
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTourGuides();
    const interval = setInterval(() => fetchTourGuides(), 100000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  console.log(tourGuides);

  return (
    <div className={classes.container}>
      {data > 0 && (
        <Spin spinning={loading}>
          <GridItem xs={12} sm={12} md={12}>
            <div className={classes.description}>
              <SectionHeader title="Tour Guide" subTitleHref={false} subTitle="14 results found" />
              <SliderWrapper>
                <Slider {...settings}>
                  {tourGuides &&
                    tourGuides.map((guide, index) => {
                      return (
                        <Wrapper key={index}>
                          <Link to={`/guide?uid=${guide.uid}&id=${guide.id}`}>
                            <Card plain>
                              <Avatar src={guide.avatar || defaultAvatar} />
                              <Title>{guide.fullname}</Title>
                              <CardBody
                                style={{ paddingLeft: '5px', paddingRight: '5px', paddingTop: 0 }}
                              >
                                <SubTitle>Japan/Tokyo</SubTitle>
                              </CardBody>
                            </Card>
                          </Link>
                        </Wrapper>
                      );
                    })}
                </Slider>
              </SliderWrapper>
            </div>
          </GridItem>
        </Spin>
      )}
    </div>
  );
}

export default TeamResultSection;
