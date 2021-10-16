import React, { useState, useEffect } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// @material-ui/icons
// core components

import { Spin } from 'antd';
import styled from 'styled-components';
// import GridContainer from '../Grid/GridContainer.js';
import GridItem from '../Grid/GridItem.js';
import SectionHeader from '../SectionHeader';
import ReviewListItem from '../ReviewListItem';
import Carousel from './Carousel/Carousel';
import * as API from '../../apis';

import styles from '../../assets/styles/commonStyle';
import backpackers from '../../assets/img/mocks/blogs/backpackers.png';
import face1 from '../../assets/img/faces/christian.jpg';
import face2 from '../../assets/img/faces/kendall.jpg';
import face3 from '../../assets/img/faces/marc.jpg';

const useStyles = makeStyles(styles);

const SliderWrapper = styled.div`
  .next-frame {
    position: absolute;
    top: 56px;
    left: 93.1%;
    width: 36.5px;
    height: 36.5px;
    border: 1px solid #f4f5f7;
    border-radius: 50%;
    @media (max-width: 1200px) {
      left: 95.2%;
    }
    @media (max-width: 991px) {
      left: 88.3%;
    }
    @media (max-width: 767px) {
      left: 90.4%;
    }
    @media (max-width: 446px) {
      left: 267px;
    }
    @media (max-width: 349px) {
      left: 85.6%;
    }
  }
  .prev-frame {
    position: absolute;
    top: 56px;
    left: 6.5px;
    width: 36.5px;
    height: 36.5px;
    border: 1px solid #f4f5f7;
    border-radius: 50%;
    z-index: 100;
  }
`;

function ReviewSection() {
  const [tours, setTours] = useState();
  const [loading, setLoading] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    /* const fetchAllTour = async () => {
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
    }; */
  }, []);

  return (
    <div className={classes.container}>
      <Spin spinning={loading}>
        <GridItem xs={12} sm={12} md={12}>
          <div className={classes.description}>
            <SectionHeader title="Review" />
            <SliderWrapper>
              <Carousel topSize="30%">
                <ReviewListItem
                  key={1}
                  title="International Activities Of The Frankfurt Book"
                  content="A solemn declaration usually made orally by a witness under oath in response to interrogation by a lawyer or authorized public official"
                  user="User 1"
                  date="Dec 06, 18"
                  avatar={face1}
                  favorite={72}
                  forum={23}
                  className="comment"
                />
                <ReviewListItem
                  key={2}
                  title="Reading Has A Signficant Info Number Of Benefits"
                  content="The hobble decision has been coming up during testimony from some of the state's key witnesses, such as Arradondo"
                  user="User 2"
                  date="Mar 08,18"
                  avatar={face2}
                  favorite={72}
                  forum={23}
                  className="comment"
                />
                <ReviewListItem
                  key={3}
                  title="The London Book Fair Is To Be Packed With Wxcinting"
                  content="Something that someone says especially in a court of law while formally promising to tell the truth"
                  user="User 3"
                  date="Nov 11,18"
                  avatar={face3}
                  favorite={72}
                  forum={23}
                  className="comment"
                />
              </Carousel>
            </SliderWrapper>
          </div>
        </GridItem>
      </Spin>
    </div>
  );
}

export default ReviewSection;
