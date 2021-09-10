import React, { useState, useEffect } from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { Spin } from 'antd';
import breakpoints from '../../assets/styles/breakpoints';
import { smallScreenCss } from '../../assets/styles/responsive-css';

// @material-ui/icons
// core components
import GuideListItem from '../GuideListItem';
import GridContainer from '../Grid/GridContainer.js';
import GridItem from '../Grid/GridItem.js';
import SectionHeader from '../SectionHeader';
import * as API from '../../apis';

import styles from '../../assets/styles/commonStyle.js';

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

  & .tour-guide + .tour-guide {
    margin-left: 3rem;
  }

  ${smallScreenCss(`
    & .tour-guide + .tour-guide {
      margin-left: 1.5rem;
    }
  `)}
`;

const useStyles = makeStyles(styles);

function TeamSection() {
  const [tourGuides, setTourGuides] = useState();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  const classes = useStyles();

  useEffect(() => {
    const fetchTourGuides = async () => {
      try {
        setLoading(true);
        const response = await API.getAllTourGuides();
        if (response.data.length == 0) {
          setData(0);
        } else {
          setData(response.data.length);
          setTourGuides(response.data);
        }

        // TODO : if network down or data not found => call mock API
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTourGuides();
    const interval = setInterval(() => fetchTourGuides(), 100000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={classes.container}>
      {data > 0 && (
        <Spin spinning={loading}>
          <GridContainer justifyContent="center">
            <GridItem xs={12} sm={12} md={12}>
              <div className={classes.description}>
                <SectionHeader title="Tour Guide" />
                <ListWrapper>
                  <ListContainer>
                    {tourGuides &&
                      tourGuides.map((guide, index) => {
                        return (
                          <GuideListItem
                            key={index}
                            id={guide.id}
                            uid={guide.uid}
                            name={guide.fullname}
                            level={guide.level}
                            intro={guide.intro}
                            avatar={guide.avatar}
                            className="tour-guide"
                          />
                        );
                      })}
                  </ListContainer>
                </ListWrapper>
              </div>
            </GridItem>
          </GridContainer>
        </Spin>
      )}
    </div>
  );
}

export default TeamSection;
