import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
// nodejs library that concatenates classes
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { Link } from 'gatsby';

// @material-ui/icons
import { Col, Divider, Row, Select, Spin, Pagination } from 'antd';
import { MdStar } from 'react-icons/md';
import Card from '../Card/Card';
import Button from '../CustomButtons/Button';

// core components
import SectionHeader from '../SectionHeader';
import styles from '../../assets/styles/searchPage'
import colors from '../../assets/styles/colors';
import defaultTourImage from '../../assets/img/mocks/tours/tour-1.jpg';
import defaultAvatar from '../../assets/img/avatar-default.jpg';
import { PERPAGE } from '../../constants/keys';

const useStyles = makeStyles(styles);
const { Option } = Select;

const FullStar = styled(MdStar)`
  color: ${colors.magenta[50]};
  font-size: large;
`;

const GuideTitle = styled.p`
  color: black;
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 0;
  @media (max-width: 340px) {
    font-size: 12px;
  }
`;

const Title = styled.h3`
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const SubTitle = styled.h5`
  color: ${colors.grey[40]};
  display: flex;
  font-weight: normal;
  margin-bottom: 12px;
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
  @media (max-width: 767px) {
    width: 100vh;
  }
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
  @media (max-width: 400px) {
    font-size: 16px;
  }
`;

const Avatar = styled.img`
  width: 55px;
  height: 55px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  margin: 0 auto;
  text-align: center;
`;

const BookButton = styled(Button)`
  width: 100%;
  height: 25px;
`;

const StarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  @media (max-width: 355px) {
    flex-direction: column;
  }
`;

const PaginationWrapper = styled.div`
  float: right;
`;

function TourResultSection({ tourData, dataLength }) {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [start, setStart] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const classes = useStyles();

  const handleSortByAscend = key => {
    const line = tours.sort((a, b) => {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    });
    setTours([...line]);
  }

  const handleSortByDescend = key => {
    const line = tours.sort((a, b) => {
      if (a[key] < b[key]) return 1;
      if (a[key] > b[key]) return -1;
      return 0;
    });
    setTours([...line]);
  }

  const handleChange = useCallback(
    value => {
      if (value === 'popularity') {
        handleSortByDescend('review'); // book機能実装後'book'を参照すること
      } else if (value === 'descendprice') {
        handleSortByDescend('total');
      } else if (value === 'ascendprice') {
        handleSortByAscend('total');
      } else if (value === 'descendrating') {
        handleSortByDescend('rating');
      }
    },
    [tours, setTours]
  );

  const pageChange = page => {
    setStart((page - 1) * PERPAGE);
    setCurrentPage(page);
  }

  const fetchTour = useCallback(() => {
    try{
      setLoading(true);
      setTours([...tourData]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [tourData]);

  useEffect(() => {
    fetchTour();
    setStart(0);
    setCurrentPage(1);
    const interval = setInterval(() => fetchTour(), 1000);
    return () => {
      clearInterval(interval);
    };
  }, [tourData]);

  return (
    <div>
      <Spin spinning={loading}>
        <div className={classes.description}>
          <Row justify="space-between" align="middle">
            <Col lg={16} md={14}>
              <Row align="bottom">
                <Col>
                  <SectionHeader className={classes.title} title="Popular Tour" />
                </Col>
                <Col>
                  <SubTitle>{`${dataLength} results found`}</SubTitle>
                </Col>
              </Row>
            </Col>
            <Col lg={8} md={10}>
              <Select 
                defaultValue="popularity" 
                onChange={handleChange} 
                style={{ minWidth: '170px', margin: '3px 0', float: 'right' }}
              >
                <Option value="popularity">Popularity</Option>
                <Option value="descendprice">Tour Price(Descending)</Option>
                <Option value="ascendprice">Tour Price(ascending)</Option>
                <Option value="descendrating">Tour Rating(High to low)</Option>
              </Select>
            </Col>
          </Row>
          {!dataLength && (
            <div style={{ marginLeft: '10px' }}>
              <h4 style={{ size: '20px', color: '#2e2e2e' }}>Not found results.</h4>
            </div>
          )}
          {tours &&
            tours.slice(start, start + PERPAGE).map(tour => {
              return (
                <div key={tour.id}>
                  <Link to={`/tour?uid=${tour.uid}&id=${tour.id}`}>
                    <Row justify="space-between" gutter={12}>
                      <Col md={8}>
                        <Picture src={tour.cover || defaultTourImage} />
                      </Col>
                      <Col md={16}>
                        <Row justify="space-between" align="middle">
                          <Col lg={10} sm={14}>
                            <Title>{tour.name}</Title>
                          </Col>
                          <Col lg={6} sm={6}>
                            <p>(32booked)</p>
                          </Col>
                        </Row>
                        <Description style={{ height: '42px' }}>{tour.shortDesc}</Description>
                        <Row justify="space-between" align="bottom">
                          <Col span={10}>
                            <Text>
                              {tour.country}/{tour.city}
                            </Text>
                            <Text>{`Tour in ${tour.day} day`}</Text>
                            <StarWrapper>
                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                <FullStar />
                                <span>{tour.rating || 'No rating'}</span>
                              </div>
                              <span>{`(${tour.review} reviews)`}</span>
                            </StarWrapper>
                          </Col>
                          <Col span={6} style={{ textAlign: 'center' }}>
                            <PriceText>{`${tour.total} $`}</PriceText>
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
                            <Card plain style={{ margin: 0 }}>
                              <div>
                                <Avatar src={tour.avatar || defaultAvatar} />
                              </div>
                              <GuideTitle>{tour.fullName}</GuideTitle>
                            </Card>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Link>
                  <Divider />
                </div>
              );
            })}
        </div>
        {dataLength > 0 && (
          <PaginationWrapper>
            <Pagination
              defaultCurrent={1}
              current={currentPage}
              total={dataLength}
              onChange={pageChange}
              defaultPageSize={PERPAGE}
              responsive
            />
          </PaginationWrapper>
        )}
      </Spin>
    </div>
  );
}

TourResultSection.propTypes = {
  tourData: PropTypes.arrayOf(PropTypes.shape({})),
  dataLength: PropTypes.number,
}

TourResultSection.defaultProps = {
  tourData: {},
  dataLength: '',
}

export default TourResultSection;
