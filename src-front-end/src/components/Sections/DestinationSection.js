import React, { useState, useEffect } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { Spin } from 'antd';
import breakpoints from '../../assets/styles/breakpoints';
import GridContainer from '../Grid/GridContainer.js';
import GridItem from '../Grid/GridItem.js';
import SectionHeader from '../SectionHeader';
import DestinationListItem from '../DestinationListItem';
import styles from '../../assets/styles/commonStyle.js';
import * as API from '../../apis';

const useStyles = makeStyles(styles);

const ListWrapper = styled.div`
  max-width: ${breakpoints.lg};
  //overflow: auto;
  .comment:last-child .delimiter {
    display: none;
  }
`;

const ListContainer = styled.div`
  display: inline-flex;
  flex-direction: row;
  overflow: hidden;

  & .destination + .destination,
  & .tour + .tour {
    margin-left: 2rem;
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
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12}>
            <div className={classes.description}>
              <SectionHeader title="Destination" />
              <ListWrapper>
                <ListContainer>
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
                </ListContainer>
              </ListWrapper>
            </div>
          </GridItem>
        </GridContainer>
      </Spin>
    </div>
  );
}

export default DestinationSection;
