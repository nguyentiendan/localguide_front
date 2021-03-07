import React, { useState, useEffect } from 'react';
// nodejs library that concatenates classes
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// @material-ui/icons
import { Spin } from 'antd';
// core components
import styled from 'styled-components';
import breakpoints from '../../assets/styles/breakpoints';
import SectionHeader from '../SectionHeader';
import BlogListItem from '../BlogListItem';
import GridContainer from '../Grid/GridContainer.js';
import GridItem from '../Grid/GridItem.js';
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

  & .blog + .blog {
    margin-left: 2rem;
  }
`;

function BlogSection() {
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
              <SectionHeader title="Tour Blog" />
              <ListWrapper>
                <ListContainer>
                  <BlogListItem
                    key={1}
                    name="Greate Tour in Tokyo"
                    description="Hanoi: Hanoi, a city of lakes, shaded boulevards and public parks, is the capital
                    of Vietnam. It is a very attractive city with French-style architecture"
                    picture={backpackers}
                    className="blog"
                  />
                  <BlogListItem
                    key={2}
                    name="Greate Tour in Tokyo"
                    description="Hanoi: Hanoi, a city of lakes, shaded boulevards and public parks, is the capital
                    of Vietnam. It is a very attractive city with French-style architecture"
                    picture={backpackers}
                    className="blog"
                  />
                  <BlogListItem
                    key={3}
                    name="Greate Tour in Tokyo"
                    description="Hanoi: Hanoi, a city of lakes, shaded boulevards and public parks, is the capital
                    of Vietnam. It is a very attractive city with French-style architecture"
                    picture={backpackers}
                    className="blog"
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

export default BlogSection;
