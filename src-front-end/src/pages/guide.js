import React, {useEffect, useState,} from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import styled from 'styled-components';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import {FormatQuote,Star,StarHalf} from "@material-ui/icons";
// core components
import Layout from '../components/CustomLayout';
import SEO from '../components/SEO';
import Footer from "../components/Footer/Footer.js";
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
import Parallax from "../components/Parallax/Parallax.js";
import InterestsOrExtras from '../components/InterestsOrExtras';
import RatingStars from '../components/RatingStars';
import _ from 'lodash';
import { getCndResourceUrl } from '../utils/commons';
import qs from 'query-string';
import * as API from '../apis';
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';

import {Avatar, Spin, Tag, Tooltip, Statistic } from 'antd';
import styles from "../assets/styles/profilePage.js";

import { UserOutlined, CrownOutlined } from '@ant-design/icons';
import iconTour from '../assets/img/icon-tour.svg';
import iconReview from '../assets/img/icon-review.svg';
import iconLicense from '../assets/img/icon-license.svg';
import iconCustomer from '../assets/img/icon-customer.svg';

const InfoAvatar = styled.div`
  .info__guide {
    display: flex;
    position: relative;
    bottom: 85px; //in smartphone mode
    align-items: center;
    .info__guide__details {
      text-align: left;
      margin-left: 10px;
      line-height: 30px;
      .guide__details__best {
        display: none;
      }
    }
  }
  
  @media (min-width: 768px) {
    .info__guide {
      bottom: 99px;
      .info__guide__details {
        .guide__details__best {
          display: inline-block;
        }
      }
    }
    
  }
  @media (min-width: 992px) {
    .container {
      height: 465px;
    }
    .info__guide {
      bottom: 99px;
    }
    
  }
`;

const InfoIntroduction = styled.div`
  .general__information {
    display: flex;
    flex-direction: column;
    margin-top: 60px;
    .list__icon {
      display: flex;
      justify-content: space-between;
      text-align: center;
      gap: 40px;
      color: #ee305f;
      flex-grow: 0.6;
    }
    & > h1 {
      order: 2;
    }
  }
  @media (min-width: 768px) {
    .general__information {
      margin-top: 0px;
      padding-top:10px;
    }
  }
  @media (min-width: 992px) {
    .general__information {
      padding-top:30px;
      flex-direction: row;
      justify-content: space-between;
      .list__icon {
        justify-content: flex-end;
      }
      & > h1 {
        order: 0;
      }
    }
  }
`;

const IconWrapper = styled.img`
  width: 25px;
  height: 25px;
  margin-bottom: 0;
`;

const Title = styled.h3`
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const CardDesc = styled.div`
  overflow: hidden;
  text-align:left;
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
    related: { tours: [], allTour: [] },
  });
  const [rootCountry, setRootCountry] = useState({});
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const imageClasses_1 = classNames(
    classes.imgRaised,
    classes.imgRounded,
    classes.imgFluid
  );
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
        related: {
          tours: res.tour,
          allTour: res.allTour
        }        
      });
    };
    fetchRelatedTour();
    const interval = setInterval(() => fetchRelatedTour(), 200000)
    return () => {
      clearInterval(interval);
    }    
  }, []);
  console.log(profile)

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
            description:photo.caption,
            thumbnail: getCndResourceUrl(photo.name)
          }))
        );
      }
    };
    fetchImage();
    return () => (shouldCancel = true);
  }, []);

  const handleLevelGuide = level => {
    switch (level) {
      case 0:
        return 'Junior guide';
      case 1:
        return 'Senior guide';
      case 2:
        return 'Professional guide';
      default:
        return null;
    }
  };
  /*
  //TODO
  1-Add loading Spin
  2-Add short description for guide
  3-Add link for Related Tour
  4-Save Country
  5-Chinh lai Related Tour cho nam ngang
  */
  return (    
    <Layout scrollHeight={300}>
      <SEO title="Guide Profile" /> 
      <Parallax small filter image={require("../assets/img/home-banner.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12}>
                <div className={classes.description}>
                  <InfoAvatar>
                    <div className="info__guide">
                      <Avatar size={128} icon={<UserOutlined />} src={profile.guide?.avatar} />
                      <div className="info__guide__details">
                        <h2 style={{ color: '#ffffff' }}>{profile.guide?.fullname}</h2>
                        <Tag icon={<CrownOutlined />} color="#f12f60">
                          {handleLevelGuide(profile.guide?.level)}
                        </Tag>            
                        <p style={{ color: '#EE305F', margin: 0 }}>Possible to plan personalised tour</p>
                      </div>
                    </div>
                  </InfoAvatar>
                  
                </div>  
                {/*<div className={classes.name}>
                    <h3 className={classes.title}>{profile.guide?.fullname}</h3>
                    <h6>{profile.guide?.sex === 0 ? 'Female' : 'Male'} - Living at {rootCountry[profile.guide?.country]?.name}/{profile.guide?.city}</h6>                    
                </div>*/}
              </GridItem>
            </GridContainer>

            {/*<GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12}>
                <InfoIntroduction>
                  <div className="general__information">                    
                    <div className="list__icon">
                      <div className="flex-center" style={{ flexDirection: 'column' }}>
                        <IconWrapper src={iconTour} alt="Tours" />
                        <p style={{ color: '#525F6B' }}><a href="#related">{tour.related?.allTour} tours</a></p>
                      </div>
                      <div className="flex-center" style={{ flexDirection: 'column' }}>
                        <IconWrapper src={iconReview} alt="Review" />
                        <p style={{ color: '#525F6B' }}>45 Reviews</p>
                      </div>
                      <div className="flex-center" style={{ flexDirection: 'column' }}>
                        <IconWrapper src={iconLicense} alt="License" />
                        <p style={{ color: '#525F6B' }}>Have license</p>
                      </div>
                      <div className="flex-center" style={{ flexDirection: 'column' }}>
                        <IconWrapper src={iconCustomer} alt="Customers" />
                        <p style={{ color: '#525F6B' }}>365 Customers</p>
                      </div>
                    </div>
                  </div>
                </InfoIntroduction>
              </GridItem>
              </GridContainer>*/}

            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12}>
                <div className={classes.description}>
                  <FormatQuote style={{ color : "#e91e63"}}/>
                  <i>An artist of considerable range, Chet Faker — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, 
                    performs and records all of his own music, giving it a warm, intimate feel with a solid groove structure.</i>
                  <FormatQuote style={{ color : "#e91e63"}}/>
                </div>  
              </GridItem>
            </GridContainer>
            <br/><br/>
          
            {profile.guide?.language && (
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12}>
                <div className={classes.description}>
                  <h4 style={{ textAlign: "left"}}>Speak language</h4>
                  {profile.guide?.interest && (
                    <InterestsOrExtras data={profile.guide?.language} title="" />
                  )}
                </div>
              </GridItem>
            </GridContainer>
            )}

            {profile.guide?.interest && (
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12}>
                <div className={classes.description}>
                  {/*<h4 style={{ textAlign: "left"}}>Interests</h4>*/}
                  {profile.guide?.interest && (
                    <InterestsOrExtras data={profile.guide?.interest} title="Interests" />
                  )}
                </div>
              </GridItem>
            </GridContainer>
            )}

            {profile.guide?.extras && ( 
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12}>
                <div className={classes.description} >
                  {/*<h4 style={{ textAlign: "left"}}>Extras</h4>*/}
                  {profile.guide?.extras && (
                    <InterestsOrExtras data={profile.guide?.extras} title="Extras" />
                  )}
                </div>
              </GridItem>
            </GridContainer>
            )}

            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12}>
                <div className={classes.description}>
                  <h2 style={{ textAlign: "left"}}>Experience</h2>
                  <div style={{ textAlign: "left",color: "#494848"}} dangerouslySetInnerHTML={{ __html: profile.guide?.experience}} />   
                </div>
              </GridItem>
            </GridContainer>
            

            {profile.guide?.education && (                            
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12}>
                <div className={classes.description}>
                  <h4 style={{ textAlign: "left"}}>Education</h4>
                  <p style={{ textAlign: "left"}}>{profile.guide?.education}</p>
                </div>
              </GridItem>
            </GridContainer>
            )}

            {profile.guide?.specialities && (                    
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12}>
                <div className={classes.description}>
                  <h4 style={{ textAlign: "left"}}>Certification</h4>
                  <p style={{ textAlign: "left"}}>{profile.guide?.specialities}</p>
                </div>
              </GridItem>
            </GridContainer>
            )}

            {images?.length > 0 && 
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12}>
                <div className={classes.description}>
                  <h2 style={{ textAlign: "left"}}>Photos</h2>
                    { images?.length == 1 &&
                      <ImageGallery items={images}  lazyLoad={true} infinite={true} showFullscreenButton={false} showPlayButton={false} showThumbnails={false}/>
                    }
                    { images?.length > 1 &&
                      <ImageGallery items={images}  lazyLoad={true} infinite={true} />                  
                    }  
                </div>  
              </GridItem>
            </GridContainer>
            }
             
            {tour.related?.tours.length > 0 &&        
            <GridContainer justify="center" id="related">
              <GridItem xs={12} sm={12} md={12}>
                <div className={classes.description}>
                  <h2 style={{ textAlign: "left"}}>Related tours</h2> 
                  {_.map(tour.related?.tours, (tour, index) => (
                    <GridContainer key={index} style={{ textAlign: "left"}}>
                        <GridItem xs={12} sm={12} md={4}>
                          <img src={tour.cover} alt="..." className={imageClasses_1} style={{ cursor: 'pointer', maxWidth: 230, minWidth: 230, maxHeight: 130, minHeight: 130, paddingRigh: 10, borderRadius: 5 }} />                    
                        </GridItem>
                        <GridItem xs={12} sm={12} md={8} style={{ textAlign: "left"}}>
                          <Title>{tour.name}</Title>
                          <CardDesc>{tour.shortDesc}</CardDesc>
                          {tour.country}/{tour.city}&nbsp;&nbsp;&nbsp;in &nbsp;&nbsp;&nbsp;{tour.day}<br/>
                          <RatingStars rate={4.5} style={{ verticalAlign: 'text-bottom' }} />                          
                        </GridItem>
                    </GridContainer>      
                  ))}
                </div>
              </GridItem>
            </GridContainer>
            }
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
}

export default GuideProfile;

