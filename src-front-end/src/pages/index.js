/* eslint-disable react/no-danger */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';
import styled from 'styled-components';
import { Avatar, Tag, Spin } from 'antd';
import _ from 'lodash';

import classNames from 'classnames';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import Layout from '../components/CustomLayout';
import SEO from '../components/SEO';
import Parallax from '../components/Parallax/Parallax.js';
import GridContainer from '../components/Grid/GridContainer.js';
import GridItem from '../components/Grid/GridItem.js';
import Footer from '../components/Footer/Footer.js';
import TeamSection from '../components/Sections/TeamSection';
import TourSection from '../components/Sections/TourSection';
import DestinationSection from '../components/Sections/DestinationSection';
import BlogSection from '../components/Sections/BlogSection';
import ReviewSection from '../components/Sections/ReviewSection';
import WorkSection from '../components/Sections/WorkSection';
import styles from '../assets/styles/landingPage.js';
import CommentListItem from '../components/CommentListItem';
import JoinUsSection from '../components/JoinUsSection';
import SectionHeader from '../components/SectionHeader';
import exploreTourImg from '../assets/img/explore-tour.jpg';

import SearchBox from '../components/SearchBox';

const ListContainer = styled.div`
  display: inline-flex;
  flex-direction: row;
  overflow: hidden;

  & .tour-guide + .tour-guide {
    margin-left: 3rem;
  }

  & .destination + .destination,
  & .tour + .tour {
    margin-left: 1rem;
  }

  & .blog + .blog {
    margin-left: 1.5rem;
  }
`;

const Gap = styled.div`
  display: inline-block;
  width: 15px;
`;

const ExploreTourWrapper = styled.div`
  max-height: 400px;
  position: relative;
  margin: 2rem -1rem;
`;

const useStyles = makeStyles(styles);

function IndexPage() {
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  return (
    <Layout>
      <SEO title="Localguide Pal" />
      <Parallax small filter>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Explore tours in Japan</h1>
              <h3 className={classes.sub_title}>
                It is not where you travel to, it is who our travel with
              </h3>
              <br />
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <SearchBox />

      <div className={classNames(classes.main, classes.mainRaised)}>
        <Spin spinning={loading}>
          <TeamSection />
          <DestinationSection />
          <TourSection />
          <BlogSection />
          <ReviewSection />
          {/* <WorkSection /> */}

          {/* <ExploreTourWrapper>
            <Img fluid={exploreTourImg} style={{ position: 'initial' }} />
          </ExploreTourWrapper> */}

          <JoinUsSection />
        </Spin>
      </div>
      <Footer />
    </Layout>
  );
}

{
  /* IndexPage.propTypes = {
  data: PropTypes.shape({
    exploreTourImg: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fluid: PropTypes.shape({}),
      }),
    }),
  }).isRequired,
}; */
}

export default IndexPage;
