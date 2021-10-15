import React, { useState, useEffect } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { Spin } from 'antd';
// import GridContainer from '../Grid/GridContainer.js';
import GridItem from '../Grid/GridItem';
import SectionHeader from '../SectionHeader';
import DestinationListItem from '../DestinationListItem';
import styles from '../../assets/styles/commonStyle';
import * as API from '../../apis';
import Carousel from './Carousel/Carousel';

const useStyles = makeStyles(styles);

const SliderWrapper = styled.div`
  .next-frame {
    position: absolute;
    top: 67px;
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
    top: 67px;
    left: 6.5px;
    width: 36.5px;
    height: 36.5px;
    border: 1px solid #f4f5f7;
    border-radius: 50%;
    z-index: 100;
  }
`;

function DestinationSection() {
  const [tours, setTours] = useState();
  const [loading, setLoading] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    const fetchRecommendTour = async () => {
      try {
        setLoading(true);
        const response = await API.getRecommendTours();
        setTours(response.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendTour();
    const interval = setInterval(() => fetchRecommendTour(), 100000);
    return () => {
      clearInterval(interval);
    };
  }, []);


  return (
    <div className={classes.container}>
      <Spin spinning={loading}>
        <GridItem xs={12} sm={12} md={12}>
          <div className={classes.description}>
            <SectionHeader title="Destination" />
            <SliderWrapper>
              <Carousel topSize="30%">
                {tours &&
                  tours.map((tour, index) => {
                    return (
                      <DestinationListItem
                        key={index}
                        name={tour.name}
                        location={tour.city}
                        picture={tour.cover}
                        className="destination"
                        id={tour.id}
                        uid={tour.uid}
                      />
                    );
                  })}
              </Carousel>
            </SliderWrapper>
          </div>
        </GridItem>
      </Spin>
    </div>
  );
}

export default DestinationSection;
