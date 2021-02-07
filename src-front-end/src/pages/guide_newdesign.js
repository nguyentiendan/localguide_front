import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
import styled from 'styled-components';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// @material-ui/icons
import {
  LocationOn,
  Camera,
  Palette,
  Favorite,
  Language,
  CardTravel,
  Star,
  StarHalf,
  StarRate,
} from '@material-ui/icons';
// core components
import _ from 'lodash';
import qs from 'query-string';
// import ImageGallery from 'react-image-gallery';
import { navigate, Link } from 'gatsby';
import { Avatar, Tag, Card, Tooltip, Statistic } from 'antd';
import { UserOutlined, CrownOutlined } from '@ant-design/icons';
import Layout from '../components/CustomLayout';
import SEO from '../components/SEO';
import Footer from '../components/Footer/Footer.js';
import GridContainer from '../components/Grid/GridContainer.js';
import GridItem from '../components/Grid/GridItem.js';
import NavPills from '../components/NavPills/NavPills.js';
import Parallax from '../components/Parallax/Parallax.js';
import InterestsOrExtras from '../components/InterestsOrExtras';
import { getCndResourceUrl } from '../utils/commons';
import * as API from '../apis';
// import 'react-image-gallery/styles/css/image-gallery.css';

import styles from '../assets/styles/profilePage.js';

const Title = styled.h3`
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const CardDesc = styled.div`
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;
const useStyles = makeStyles(styles);

function GuideProfile({ location }) {
  const [profile, setProfile] = useState({
    guide: {},
    reviews: { totalReview: 0, listReviews: [] },
  });
  const [tour, setTour] = useState({
    tour: [],
    allTour: [],
  });
  const [rootCountry, setRootCountry] = useState({});
  const classes = useStyles();
  const imageClasses = classNames(classes.imgRaised, classes.imgRoundedCircle, classes.imgFluid);
  const imageClasses_1 = classNames(classes.imgRaised, classes.imgRounded, classes.imgFluid);
  const [images, setImages] = useState([]);
  const dataQueryParams = qs.parse(location.search);

  useEffect(() => {
    const fetchData = async () => {
      const res = await API.getGuideProfileOverview({
        uid: dataQueryParams.uid,
        guideId: dataQueryParams.id,
      });
      setProfile({
        guide: res.guide,
        reviews: {
          totalReview: res.total_review,
          listReviews: res.review,
        },
      });
    };
    fetchData();
  }, [setProfile, dataQueryParams.uid, dataQueryParams.id]);

  useEffect(() => {
    const fetchRelatedTour = async () => {
      const res = await API.getRelatedTour({
        uid: dataQueryParams.uid,
      });
      setTour({
        tour: res.tour,
        allTour: res.allTour,
      });
    };
    fetchRelatedTour();
    const interval = setInterval(() => fetchRelatedTour(), 200000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  console.log(tour);

  useEffect(() => {
    (async () => {
      const { data } = await API.getAllCountry();
      const newData = _.keyBy(data, item => item.code);
      setRootCountry(newData);
    })();
  }, []);

  useEffect(() => {
    let shouldCancel = false;

    const fetchImage = async () => {
      const response = await API.getPhotosGuide({
        uid: dataQueryParams.uid,
      });

      if (!shouldCancel && response.data && response.data.length > 0) {
        setImages(
          response.data.map(photo => ({
            original: getCndResourceUrl(photo.name),
            description: photo.caption,
            thumbnail: getCndResourceUrl(photo.name),
          }))
        );
      }
    };
    fetchImage();
    return () => (shouldCancel = true);
  }, []);

  return (
    <Layout noLogin>
      <SEO title="Guide Profile" />
      <Parallax small filter image={require('../assets/img/profile-bg.jpg')} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    {/* <img src={profile.guide?.avatar} alt="..." className={imageClasses} /> */}
                    <Avatar size={128} icon={<UserOutlined />} src={profile.guide?.avatar} />
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>{profile.guide?.fullname}</h3>
                    <h6>
                      {profile.guide?.sex === 0 ? 'Female' : 'Male'} - Living at{' '}
                      {rootCountry[profile.guide?.country]?.name}/{profile.guide?.city}
                    </h6>
                  </div>
                </div>
              </GridItem>
            </GridContainer>

            {/* <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                <NavPills
                    alignCenter
                    color="rose"
                    tabs={[
                      {
                        tabButton: "Tour",
                        tabIcon: CardTravel,
                        tabContent: (
                          <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={6}>                          
                              Have register <h1><a href="#related">{profile.alltour}</a></h1> tours 
                            </GridItem>
                          </GridContainer>
                        )                        
                      },
                      {
                        tabButton: "Reviews",
                        tabIcon: StarHalf, 
                        tabContent: (
                          <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={6}>                          
                              With over <h1><a href="">50</a></h1> reviews
                            </GridItem>
                          </GridContainer>
                        )                                                                   
                      },
                      {
                        tabButton: "Language",
                        tabIcon: Language,  
                        tabContent: (
                          <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={6}>                          
                              Can support <h5>{profile.guide?.language?.split(';').join(', ')}</h5>
                            </GridItem>
                          </GridContainer>
                        )                      
                      },
                    ]}    
                />            
              </GridItem>
            </GridContainer> */}

            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8}>
                <div className={classes.description}>
                  <h2 style={{ textAlign: 'left' }}>Experience</h2>
                  <div
                    style={{ textAlign: 'left' }}
                    dangerouslySetInnerHTML={{ __html: profile.guide?.experience }}
                  />
                </div>
              </GridItem>
            </GridContainer>

            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8}>
                <div className={classes.description}>
                  {/* <h2 style={{ textAlign: "left"}}>Interests</h2> */}
                  {profile.guide?.interest && (
                    <InterestsOrExtras data={profile.guide?.interest} title="" />
                  )}
                </div>
              </GridItem>
            </GridContainer>

            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8}>
                <div className={classes.description}>
                  {/* <h2 style={{ textAlign: "left"}}>Extras</h2> */}
                  {profile.guide?.extras && (
                    <InterestsOrExtras data={profile.guide?.extras} title="" />
                  )}
                </div>
              </GridItem>
            </GridContainer>

            {tour.length > 0 && (
              <GridContainer justify="center" id="related">
                <GridItem xs={12} sm={12} md={8}>
                  <div className={classes.description}>
                    <h2 style={{ textAlign: 'left' }}>Related tours</h2>
                    {_.map(profile.tours, (tour, index) => (
                      <GridContainer key={index}>
                        <GridItem xs={12} sm={12} md={4}>
                          <img
                            src={tour.cover}
                            alt="..."
                            className={imageClasses_1}
                            style={{
                              cursor: 'pointer',
                              maxWidth: 200,
                              minWidth: 200,
                              maxHeight: 150,
                              minHeight: 100,
                              borderRadius: 10,
                            }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={8} style={{ textAlign: 'left' }}>
                          <Title>{tour.name}</Title>
                          <CardDesc>{tour.shortDesc}</CardDesc>
                          {tour.country}/{tour.city}&nbsp;&nbsp;&nbsp;in &nbsp;&nbsp;&nbsp;
                          {tour.day}
                          <br />
                          <Star style={{ color: '#e91e63' }} />
                          <Star style={{ color: '#e91e63' }} />
                          <Star style={{ color: '#e91e63' }} />
                          <Star style={{ color: '#e91e63' }} />
                          <StarHalf style={{ color: '#e91e63' }} />
                        </GridItem>
                      </GridContainer>
                    ))}
                  </div>
                </GridItem>
              </GridContainer>
            )}

            {images?.length > 0 && (
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={8}>
                  <div className={classes.description}>
                    <h2 style={{ textAlign: 'left' }}>Photos</h2>
                    <ImageGallery items={images} lazyLoad infinite />
                  </div>
                </GridItem>
              </GridContainer>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
}

export default GuideProfile;
