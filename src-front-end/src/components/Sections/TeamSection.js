import React, { useState, useEffect } from 'react';
// nodejs library that concatenates classes
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { Spin } from 'antd';
import breakpoints from '../../assets/styles/breakpoints';

// @material-ui/icons
// core components
import GuideListItem from '../GuideListItem';
// import GridContainer from '../Grid/GridContainer.js';
import GridItem from '../Grid/GridItem.js';
import SectionHeader from '../SectionHeader';
import * as API from '../../apis';

import styles from '../../assets/styles/commonStyle.js';
import Carousel from './Carousel/Carousel';

const SliderWrapper = styled.div`
  max-width: ${breakpoints.lg};
  .slick-next {
    @media (min-width: 1201px) {
      left: 91%;
    }
    @media (min-width: 992px) and (max-width: 1200px) {
      left: 95%;
    }
    @media (min-width: 768px) and (max-width: 991px) {
      left: 85%;
    }
    @media (min-width: 501px) and (max-width: 767px) {
      left: 90%;
    }
    @media (min-width: 447px) and (max-width: 500px) {
      left: 85%;
    }
    @media (min-width: 350px) and (max-width: 446px) {
      left: 240px;
    }
    @media (max-width: 349px) {
      left: 235px;
    }
  }
  .slick-prev:before {
    color: black;
    font-size: 40px;
    margin-inline: 48px;
  }
  .slick-next:before {
    color: black;
    font-size: 40px;
  }
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

  console.log(tourGuides);

  return (
    <div className={classes.container}>
      {data > 0 && (
        <Spin spinning={loading}>
          <GridItem xs={12} sm={12} md={12}>
            <div className={classes.description}>
              <SectionHeader title="Tour Guide" />
              <SliderWrapper>
                <Carousel topSize="25%">
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
                </Carousel>
              </SliderWrapper>
            </div>
          </GridItem>
        </Spin>
      )}
    </div>
  );
}

export default TeamSection;
