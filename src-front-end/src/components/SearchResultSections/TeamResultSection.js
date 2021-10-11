import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// nodejs library that concatenates classes
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { Col, Row, Spin } from 'antd';
import { Link } from 'gatsby';
import Slider from 'react-slick';
import breakpoints from '../../assets/styles/breakpoints';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// @material-ui/icons
// core components
import SectionHeader from '../SectionHeader';
import styles from '../../assets/styles/searchPage';
import colors from '../../assets/styles/colors';
import Card from '../Card/Card';
import CardBody from '../Card/CardBody';
import defaultAvatar from '../../assets/img/avatar-default.jpg';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
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
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  margin: 0 auto;
  margin-bottom: 1rem;
  text-align: center;
`;

const SubTitle = styled.h5`
  color: ${colors.grey[40]};
  display: flex;
  justify-content: center;
  font-weight: normal;
  margin-bottom: 12px;
`;

const SliderWrapper = styled.div`
  max-width: ${breakpoints.lg};
  .slick-next {
    @media (min-width: 1201px) {
      left: 97%;
    }
    @media (min-width: 992px) and (max-width: 1200px) {
      left: 96%;
    }
    @media (min-width: 768px) and (max-width: 991px) {
      left: 96%;
    }
    @media (min-width: 501px) and (max-width: 767px) {
      left: 95%;
    }
    @media (min-width: 447px) and (max-width: 500px) {
      left: 90%;
    }
    @media (min-width: 350px) and (max-width: 446px) {
      left: 92%;
    }
    @media (max-width: 349px) {
      left: 95%;
    }
  }
  .slick-prev {
    @media (min-width: 1201px) {
      left: -10px;
    }
    @media (min-width: 992px) and (max-width: 1200px) {
      left: -10px;
    }
    @media (min-width: 768px) and (max-width: 991px) {
      left: -13px;
    }
    @media (min-width: 501px) and (max-width: 767px) {
      left: -15px;
    }
    @media (min-width: 447px) and (max-width: 500px) {
      left: -15px;
    }
    @media (min-width: 350px) and (max-width: 446px) {
      left: -15px;
    }
    @media (max-width: 349px) {
      left: -20px;
    }
  }
  .slick-prev:before {
    color: black;
    font-size: 40px;
    @media (max-width: 349px) {
      font-size: 30px;
    }
  }
  .slick-next:before {
    color: black;
    font-size: 40px;
    @media (max-width: 349px) {
      font-size: 30px;
    }
  }
`;

const useStyles = makeStyles(styles);

function TeamResultSection({ tourGuideData, dataLength }) {
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
        role="none"
        className={className}
        style={{
          ...style,
          top: '25%',
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
        role="none"
        className={className}
        style={{
          ...style,
          top: '25%',
          zIndex: '100',
        }}
        onClick={onClick}
      />
    );
  };

  SampleNextArrow.propTypes = {
    className: PropTypes.string,
    style: PropTypes.shape({}),
    onClick: PropTypes.func,
  }

  SampleNextArrow.defaultProps = {
    className: '',
    style: null,
    onClick: PropTypes.func,
  }

  SamplePrevArrow.propTypes = {
    className: PropTypes.string,
    style: PropTypes.shape({}),
    onClick: PropTypes.func,
  }

  SamplePrevArrow.defaultProps = {
    className: '',
    style: null,
    onClick: PropTypes.func,
  }


  const settings = {
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    speed: 500,
    arrow: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 446,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const fetchTourGuides = async () => {
      try {
        setLoading(true);
        if (dataLength == 0) {
          setData(0);
        } else {
          setData(dataLength);
          setTourGuides([...tourGuideData]);
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
  }, [tourGuideData, dataLength]);

  return (
    <div>
      <Spin spinning={loading}>
        <div className={classes.description}>
          <Row align="bottom">
            <Col>
              <SectionHeader className={classes.title} title="Tour Guide" />
            </Col>
            <Col>
              <SubTitle>{`${dataLength} results found`}</SubTitle>
            </Col>
          </Row>
          {!data && (
            <div style={{ marginLeft: '10px' }}>
              <h4 style={{ size: '20px', color: '#2e2e2e' }}>Not found results.</h4>
            </div>
          )}
          {data > 0 && (
            <SliderWrapper>
              <Slider {...settings}>
                {tourGuides &&
                  tourGuides.map(guide => {
                    return (
                      <Wrapper key={guide.id}>
                        <Link to={`/guide?uid=${guide.uid}&id=${guide.id}`}>
                          <Card plain style={{ margin: 0 }}>
                            <Avatar src={guide.avatar || defaultAvatar} />
                            <Title>{guide.fullname}</Title>
                            <CardBody
                              style={{ paddingLeft: '5px', paddingRight: '5px', paddingTop: 0 }}
                            >
                              <SubTitle>{`${guide.country}/${guide.city}`}</SubTitle>
                            </CardBody>
                          </Card>
                        </Link>
                      </Wrapper>
                    );
                  })}
              </Slider>
            </SliderWrapper>
          )}
        </div>
      </Spin>
    </div>
  );
}

TeamResultSection.propTypes = {
  tourGuideData: PropTypes.arrayOf(PropTypes.shape({})),
  dataLength: PropTypes.number,
}

TeamResultSection.defaultProps = {
  tourGuideData: {},
  dataLength: '',
}

export default TeamResultSection;
