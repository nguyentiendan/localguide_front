import React, { useState, useEffect } from 'react';
// nodejs library that concatenates classes
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// @material-ui/icons
import { Spin } from 'antd';

// core components
// import styled from 'styled-components';
import SectionHeader from '../SectionHeader';
import TourListItem from '../TourListItem';
import GridContainer from '../Grid/GridContainer.js';
import GridItem from '../Grid/GridItem.js';
import * as API from '../../apis';
import styles from '../../assets/styles/commonStyle.js';

import Carousel from './Carousel/Carousel';

const useStyles = makeStyles(styles);

// `

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


  return (
    <div className={classes.container}>
      <Spin spinning={loading}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12}>
            <div className={classes.description}>
              <SectionHeader title="Popular Tour" />
              <Carousel>
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
              </Carousel>
            </div>
          </GridItem>
        </GridContainer>
      </Spin>
    </div>
  );
}

export default TourSection;
