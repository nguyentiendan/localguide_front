import React, { useState, useEffect } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// @material-ui/icons
// core components
import styled from 'styled-components';
import { Spin } from 'antd';
import breakpoints from '../../assets/styles/breakpoints';
import GridContainer from '../Grid/GridContainer.js';
import GridItem from '../Grid/GridItem.js';
import SectionHeader from '../SectionHeader';
import DestinationListItem from '../DestinationListItem';
import * as API from '../../apis';

import styles from '../../assets/styles/commonStyle.js';
import backpackers from '../../assets/img/mocks/blogs/backpackers.png';

const useStyles = makeStyles(styles);

const ListWrapper = styled.div`
  max-width: ${breakpoints.lg};
  overflow: auto;
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

  return (
    <div className={classes.container}>
      <Spin spinning={loading}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12}>
            <div className={classes.description}>
              <SectionHeader title="Destination" />
              <ListWrapper>
                <ListContainer>
                  <DestinationListItem
                    key="1"
                    name="Greate Tour in Tokyo"
                    location="Tokyo"
                    picture={backpackers}
                    className="destination"
                    id={1}
                    uid="134234234234234"
                  />

                  <DestinationListItem
                    key="2"
                    name="Greate Tour in Osaka"
                    location="Tokyo"
                    picture={backpackers}
                    className="destination"
                    id={1}
                    uid="1123123123123"
                  />

                  <DestinationListItem
                    key="3"
                    name="Greate Tour in Nagoya"
                    location="Tokyo"
                    picture={backpackers}
                    className="destination"
                    id={1}
                    uid="11231231231232222"
                  />
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
