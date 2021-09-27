import React, { useState, useEffect } from 'react';
// nodejs library that concatenates classes
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { Link } from 'gatsby';

// @material-ui/icons
import { Col, Divider, Row, Spin } from 'antd';
import { MdStar } from 'react-icons/md';
import RatingStars from '../RatingStars';
import Card from '../Card/Card';
import Button from '../CustomButtons/Button';

// core components
// import styled from 'styled-components';
import SectionHeader from '../SectionHeader';
import * as API from '../../apis';
import styles from '../../assets/styles/commonStyle';
import colors from '../../assets/styles/colors';
import defaultTourImage from '../../assets/img/mocks/tours/tour-1.jpg';
import defaultAvatar from '../../assets/img/avatar-default.jpg';

const useStyles = makeStyles(styles);

const FullStar = styled(MdStar)`
  color: ${colors.magenta[50]};
  font-size: large;
`;

const GuideTitle = styled.p`
  color: black;
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 0;
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
  width: 260px;
  height: 160px;
  border-radius: 6px;
  object-fit: cover;
  object-position: center;
  margin-bottom: 0.75rem;
`;

const Text = styled.p`
  color: black;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const PriceText = styled.p`
  color: ${colors.magenta[50]};
  font-size: 24px;
  font-weight: bold;
  line-height: 30px;
  margin-bottom: 0;
  margin-top: 10px;
`;

const Avatar = styled.img`
  width: 55px;
  height: 55px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  margin: 0 auto;
  /* margin-bottom: 2rem; */
  //align-items: center;
  text-align: center;
`;

const BookButton = styled(Button)`
  width: 100%;
  height: 25px;
`;

function TourResultSection({ data }) {
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
    console.log(tours);
  }, []);

  return (
    <div className={classes.container}>
      <Spin spinning={loading}>
        <div className={classes.description}>
          <SectionHeader title="Popular Tour" subTitleHref={false} subTitle="115 results found" />
          {tours &&
            tours.map((tour, index) => {
              return (
                <>
                  <Link to={`/tour?uid=${tour.uid}&id=${tour.id}`} key={index}>
                    <Row justify="space-between" gutter={12}>
                      <Col span={8}>
                        <Picture src={tour.cover || defaultTourImage} />
                      </Col>
                      <Col span={16}>
                        <Row justify="space-between">
                          <Col span={16}>
                            <Title>{tour.name}</Title>
                          </Col>
                          <Col span={4}>
                            <p>(32booked)</p>
                          </Col>
                        </Row>
                        <Description style={{ height: '42px' }}>{tour.shortDesc}</Description>
                        <Row justify="space-between" align="bottom">
                          <Col span={10}>
                            <Text>
                              {tour.country}/{tour.city}
                            </Text>
                            <Text>Tour in {tour.day} day</Text>
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}
                            >
                              <FullStar />
                              <span>4.7 (321 reviews)</span>
                            </div>
                          </Col>
                          <Col span={6} style={{ textAlign: 'center' }}>
                            <PriceText>1.000 $</PriceText>
                            <BookButton
                              color="rose"
                              loading={loading}
                              disabled={loading}
                              id="booknow"
                            >
                              Book now
                            </BookButton>
                          </Col>
                          <Col span={6} style={{ textAlign: 'center' }}>
                            <Link to="/guide?uid=&id=">
                              <Card plain style={{ margin: 0 }}>
                                <div>
                                  <Avatar src={defaultAvatar} />
                                </div>
                                <GuideTitle>testGuide1</GuideTitle>
                              </Card>
                            </Link>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Link>
                  <Divider />
                </>
              );
            })}
        </div>
      </Spin>
    </div>
  );
}

export default TourResultSection;
