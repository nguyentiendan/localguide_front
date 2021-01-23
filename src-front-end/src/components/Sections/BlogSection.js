import React, { useState, useEffect } from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// @material-ui/icons
import { Spin, Card, Badge, Tooltip } from 'antd';
import { navigate, Link } from 'gatsby';
import { StarFilled } from '@ant-design/icons';
// core components
import styled from 'styled-components';
import GridContainer from '../Grid/GridContainer.js';
import GridItem from '../Grid/GridItem.js';
import Button from '../CustomButtons/Button';
import * as API from '../../apis';

import styles from '../../assets/styles/teamStyle.js';
import backpackers from '../../assets/img/mocks/blogs/backpackers.png';

const useStyles = makeStyles(styles);

const CardWrapper = styled(Card)`
  .totalReview {
    display: flex;
    justify-content: space-between;
  }
  && {
    .ant-card-actions {
      border-radius: 0px 0px 10px 10px;
    }
  }
`;
const WrapperImageCard = styled.div`
  position: relative;
  .styled-box-price {
    position: absolute;
    left: 5px;
    background: #f12f60;
    padding: 10px 15px;
    bottom: 0px;
    color: #fff;
    font-weight: bold;
    font-size: 18px;
    box-shadow: lavender;
    box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.38);
    border-radius: 5px 5px 5px 5px;
  }
`;

const Image = styled.img`
  height: 158px;
  width: auto;
  object-fit: cover;
  border-radius: 10px 10px 0px 0px;
  // margin-bottom: 0px;
`;

const CardDesc = styled.div`
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  width: 325px;
  maxwidth: 325px;
`;

const Title = styled.h3`
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const SubTitle = styled.h5`
  color: #635e69;
  font-weight: normal;
`;

const Picture = styled.img`
  width: 325px;
  height: 175px;
  border-radius: 6px;
  object-fit: cover;
  object-position: center;
  margin-bottom: 0.75rem;
`;

function TourSection() {
  const [tours, setTours] = useState();
  const [loading, setLoading] = useState(false);

  const classes = useStyles();
  const imageClasses = classNames(classes.imgRaised, classes.imgRoundedCircle, classes.imgFluid);

  useEffect(() => {
    const fetchAllTour = async () => {
      try {
        setLoading(true);
        const response = await API.getAllTours();
        setTours(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllTour();
    const interval = setInterval(() => fetchAllTour(), 100000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  console.log(tours);

  return (
    <div className={classes.section_odd}>
      <h2 className={classes.title}>Tour Blog</h2>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Wrapper style={{ textAlign: 'left' }}>
              <Link to={`/tours/${1}/${2}?status=view`}>
                <Picture src={backpackers} />
                <Title>Royal Trip Holidays</Title>
                <SubTitle>
                  Hanoi: Hanoi, a city of lakes, shaded boulevards and public parks, is the capital
                  of Vietnam. It is a very attractive city with French-style architecture. Take part
                  in the Water Puppet show. Halong Bay: Overnight cruise in a traditional Junk boat,
                  discover caves & fishing villages, explore the lagoon.
                </SubTitle>
              </Link>
            </Wrapper>
          </GridItem>

          <GridItem xs={12} sm={12} md={4}>
            <Wrapper style={{ textAlign: 'left' }}>
              <Link to={`/tours/${1}/${2}?status=view`}>
                <Picture src={backpackers} />
                <Title>Royal Trip Holidays</Title>
                <SubTitle>
                  Hanoi: Hanoi, a city of lakes, shaded boulevards and public parks, is the capital
                  of Vietnam. It is a very attractive city with French-style architecture. Take part
                  in the Water Puppet show. Halong Bay: Overnight cruise in a traditional Junk boat,
                  discover caves & fishing villages, explore the lagoon.
                </SubTitle>
              </Link>
            </Wrapper>
          </GridItem>

          <GridItem xs={12} sm={12} md={4}>
            <Wrapper style={{ textAlign: 'left' }}>
              <Link to={`/tours/${1}/${2}?status=view`}>
                <Picture src={backpackers} />
                <Title>Royal Trip Holidays</Title>
                <SubTitle>
                  Hanoi: Hanoi, a city of lakes, shaded boulevards and public parks, is the capital
                  of Vietnam. It is a very attractive city with French-style architecture. Take part
                  in the Water Puppet show. Halong Bay: Overnight cruise in a traditional Junk boat,
                  discover caves & fishing villages, explore the lagoon.
                </SubTitle>
              </Link>
            </Wrapper>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}

export default TourSection;
