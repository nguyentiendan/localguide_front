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
import ReviewListItem from '../ReviewListItem';
import * as API from '../../apis';

import styles from '../../assets/styles/commonStyle.js';
import backpackers from '../../assets/img/mocks/blogs/backpackers.png';
import face1 from '../../assets/img/faces/christian.jpg';
import face2 from '../../assets/img/faces/kendall.jpg';
import face3 from '../../assets/img/faces/marc.jpg';

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

function ReviewSection() {
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
              <SectionHeader title="Review" />
              <ListWrapper>
                <ListContainer>
                  <ReviewListItem
                    key={1}
                    content="A solemn declaration usually made orally by a witness under oath in response to interrogation by a lawyer or authorized public official"
                    user="User 1"
                    date="2021/04/01"
                    avatar={face1}
                    className="comment"
                  />
                  <ReviewListItem
                    key={2}
                    content="The hobble decision has been coming up during testimony from some of the state's key witnesses, such as Arradondo"
                    user="User 2"
                    date="2021/04/23"
                    avatar={face2}
                    className="comment"
                  />
                  <ReviewListItem
                    key={3}
                    content="Something that someone says especially in a court of law while formally promising to tell the truth"
                    user="User 3"
                    date="2021/04/24"
                    avatar={face3}
                    className="comment"
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

export default ReviewSection;
