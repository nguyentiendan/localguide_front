/* eslint-disable react/no-danger */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';
import styled from 'styled-components';
import { Avatar, Tag, Spin } from 'antd';
import _ from 'lodash';

import classNames from 'classnames';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
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

import styles from '../assets/styles/landingPage.js';

const useStyles = makeStyles(styles);

function IndexPage() {
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  return (
    <Layout>
      <SEO title="Localguide Pal" />
      <Parallax filter image={require('../assets/img/home-banner.jpg')}>
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

      <div className={classNames(classes.main, classes.mainRaised)}>
        <Spin spinning={loading}>
          <TeamSection />
          <DestinationSection />
          <TourSection />
          <BlogSection />
        </Spin>
      </div>
      <Footer />
    </Layout>
  );
}
export default IndexPage;
