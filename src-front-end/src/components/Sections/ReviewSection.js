import React, { useState, useEffect } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// @material-ui/icons
// core components

import { Spin } from 'antd';
import GridContainer from '../Grid/GridContainer.js';
import GridItem from '../Grid/GridItem.js';
import SectionHeader from '../SectionHeader';
import ReviewListItem from '../ReviewListItem';
import Carousel from './Carousel/Carousel';
import * as API from '../../apis';

import styles from '../../assets/styles/commonStyle.js';
import backpackers from '../../assets/img/mocks/blogs/backpackers.png';
import face1 from '../../assets/img/faces/christian.jpg';
import face2 from '../../assets/img/faces/kendall.jpg';
import face3 from '../../assets/img/faces/marc.jpg';

const useStyles = makeStyles(styles);

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
          </div>
        </GridItem>        
      </Spin>
    </div>
  );
}

export default ReviewSection;
