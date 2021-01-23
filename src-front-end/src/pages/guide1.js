/* eslint-disable react/no-danger */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';
import styled from 'styled-components';
import { Avatar, Tag } from 'antd';
import { UserOutlined, CrownOutlined } from '@ant-design/icons';
import {FormatQuote,Star,StarHalf} from "@material-ui/icons";
import _ from 'lodash';
import Gallery from 'react-grid-gallery';
import qs from 'query-string';
import PropTypes from 'prop-types';
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import SectionHeader from '../components/SectionHeader';
import breakpoints from '../assets/styles/breakpoints';
import { smallScreenCss } from '../assets/styles/responsive-css';
import CommentListItem from '../components/CommentListItem';
import RatingStars from '../components/RatingStars';
import DestinationListItem from '../components/DestinationListItem';
import { getCndResourceUrl } from '../utils/commons';
import Layout from '../components/CustomLayout';
import SEO from '../components/SEO';
import Parallax from "../components/Parallax/Parallax.js";
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
import Footer from "../components/Footer/Footer.js";
import InterestsOrExtras from '../components/InterestsOrExtras';
import * as API from '../apis';
import iconTour from '../assets/img/icon-tour.svg'
import iconReview from '../assets/img/icon-review.svg';
import iconLicense from '../assets/img/icon-license.svg';
import iconCustomer from '../assets/img/icon-customer.svg';
import iconBooking from '../assets/img/icon-booking.svg';
import iconLanguage from '../assets/img/icon-language.svg';
import iconLocation from '../assets/img/icon-location.svg';
import iconSex from '../assets/img/icon-sex.svg';
import banner from '../assets/img/home-banner.jpg';
import styles from "../assets/styles/profilePage.js";

const InfoAvatarAndBackgroundImg = styled.div`    
  .info__guide {
    height: 15px;
    display: flex;
    position: relative;
    bottom: 28px;
    align-items: center;
    .info__guide__details {
      margin-left: 10px;
      line-height: 30px;
      .guide__details__best {
        display: inline-block;
      }
    }
  }
  @media (min-width: 768px) {
    .info__guide {
      height: 15px;
      bottom: 43px;
      .info__guide__details {
        .guide__details__best {
          display: inline-block;
        }      
      }
    }
  }
  @media (min-width: 992px) {
    .info__guide {
      height: 15px;
      bottom: 43px;
    }
  }
`;

const GalleryWrapper = styled.div`
  display: block;
  margin-top: 0;
  .ReactGridGallery_tile {
    background: none !important;
  }
  img {
    object-fit: cover !important;
    margin-left: 0 !important;
    padding: 2px !important;
    border-radius: 8px;
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
  .flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .details__information {
    .details__information__item {
      display: flex;
      color: #ee305f;
      gap: 20px;
      align-items: center;
      margin-bottom: 20px;
      & > h3 {
        margin: 0;
        color: #525f6b;
        font-weight: 400;
      }
    }
  }
  .mt-40 {
    margin-top: 40px;
  }
  @media (min-width: 768px) {
    .general__information {
      margin-top: 0px;
      padding-right:30px;
    }
  }
  @media (min-width: 992px) {
    .general__information {
      flex-direction: row;
      justify-content: space-between;
      padding-right:30px;
      .list__icon {
        justify-content: flex-end;
      }
      & > h1 {
        order: 0;
      }
    }
  }
`;

const ListWrapper = styled.div`
  max-width: ${breakpoints.lg};
  overflow: auto;
  .comment:last-child .delimiter {
    display: none;
  }
`;
const Gap = styled.div`
  display: inline-block;
  width: 15px;
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
      margin-left: 1rem;
    }
  `)}

  & .destination + .destination,
  & .tour + .tour {
    margin-left: 1rem;
  }

  & .blog + .blog {
    margin-left: 1.5rem;
  }
`;

const IconWrapper = styled.img`
  width: 25px;
  height: 25px;
  margin-bottom: 0;
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
  console.log(profile);
  return (
    <Layout scrollHeight={300}>
      <SEO title="Guide Profile" /> 
      <Parallax small filter image={require("../assets/img/home-banner.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={12}>
              <div className={classes.description}>
                <InfoAvatarAndBackgroundImg>                
                  <div className="info__guide">
                    <Avatar size={128} icon={<UserOutlined />} src={profile.guide?.avatar} />
                    <div className="info__guide__details">
                      <h2 style={{ color: '#ffffff' }}>{profile.guide?.fullname}</h2>
                      <Tag icon={<CrownOutlined />} color="#f12f60" className="guide__details__best">
                        {handleLevelGuide(profile.guide?.level)}
                      </Tag>                  
                      <p style={{ color: '#EE305F', margin: 0 }}>Possible to plan personalised tour</p>
                    </div>
                  </div>
                </InfoAvatarAndBackgroundImg>  
              </div>           
            </GridItem>
          </GridContainer>
        </div>    
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={12}>
              <div className={classes.description}>
                <InfoIntroduction>
                  <div className="general__information">
                    {/*<h1>Biography</h1>*/}
                    <div className="list__icon" >
                      <div className="flex-center" style={{ flexDirection: 'column' }}>
                        <IconWrapper src={iconTour} alt="Tours" />
                        <p style={{ color: '#525F6B' }}>20 Tours</p>
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
                  
                  <div className={classes.description} style={{ paddingTop: '0px', paddingBottom: '10px' }}>
                    <FormatQuote style={{ color : "#e91e63"}}/>
                    <i>An artist of considerable range, Chet Faker — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, 
                      performs and records all of his own music, giving it a warm, intimate feel with a solid groove structure.</i>
                    <FormatQuote style={{ color : "#e91e63"}}/>
                  </div>  

                  <h1>Biography</h1>
                  <div dangerouslySetInnerHTML={{ __html: profile.guide?.experience }} />
                  
                  <div className="details__information mt-40">
                    {profile.guide?.language && (
                      <div className="details__information__item">
                        <IconWrapper src={iconLanguage} alt="Customers" />
                        <h4>{profile.guide?.language?.split(';').join(', ')}</h4>
                      </div>
                    )}
                    {(profile.guide?.city || profile.guide?.country) && (
                      <div className="details__information__item">
                        <IconWrapper src={iconLocation} alt="Customers" />
                        <h4>
                          {profile.guide?.city}
                          {profile.guide?.city && ','} {rootCountry[profile.guide?.country]?.name}
                        </h4>
                      </div>
                    )}
                    {profile.guide?.sex && (
                      <div className="details__information__item">
                        <IconWrapper src={iconSex} alt="Customers" />
                        <h4>
                          {profile.guide?.sex === 0 ? 'Female' : 'Male'} {profile.guide?.age}
                        </h4>
                      </div>
                    )}
                  </div>
                  <div className="mt-40">
                    {profile.guide?.interest && (
                      <InterestsOrExtras data={profile.guide?.interest} title="Interests" />
                    )}
                    {profile.guide?.extras && (
                      <InterestsOrExtras data={profile.guide?.extras} title="Extras" />
                    )}
                  </div>
                  {profile.guide?.education && (
                    <div className="education__information">
                      <b>Education:</b>
                      <p>{profile.guide?.education}</p>
                    </div>
                  )}
                  {profile.guide?.specialities && (
                    <div className="education__information">
                      <b>Certification:</b>
                      <p>{profile.guide?.specialities}</p>
                    </div>
                  )}
                </InfoIntroduction>
              </div>  
            </GridItem>
          </GridContainer>
        </div>      
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={12}>
              <div className={classes.description}>
                {
                  tour.related?.allTour > 3 && <SectionHeader title="Related Tour" subTitle="View all" /> 
                }
                {
                  tour.related?.tours.length > 0 && tour.related?.allTour.length < 3 && <SectionHeader title="Related Tour"/> 
                }                
                <ListWrapper>
                  <ListContainer>
                    {_.map(tour.related?.tours, (tour, index) => (
                      <DestinationListItem
                        key={index}
                        name={tour.name}
                        location={`${tour.city} ${tour.country}`}
                        picture={tour.cover}
                        className="destination"
                        id={tour.id}
                        uid={tour.uid}
                      />
                    ))}
                  </ListContainer>                  
                </ListWrapper>
              </div>
            </GridItem>
          </GridContainer>
        </div>        
        <br/><br/>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={12}>
              <div className={classes.description}>
                {profile.reviews?.listReviews?.length > 0 && (
                  <SectionHeader
                    title={                      
                      <>
                        Reviews ({profile.reviews?.totalReview})
                        <Gap />
                        <RatingStars rate={4.5} />
                      </>
                    }
                  />
                )}
                <ListWrapper>
                  {_.map(profile.reviews?.listReviews, (comment, index) => (
                    <CommentListItem
                      key={index}
                      content={comment.content}
                      user={comment.fullname}
                      date={comment.createdAt}
                      avatar={comment.avatar}
                      className="comment"
                    />
                  ))}
                </ListWrapper>
              </div>
            </GridItem>
          </GridContainer>
        </div>        
        {/*<ListWrapper>
          <GalleryWrapper ref={galleryWrapperComp}>
            {photos?.length > 0 && (
              <>
                <SectionHeader title="Photo" />
                <Gallery
                  enableImageSelection={false}
                  images={_.map(photos, (photo, i) => ({
                    src: getCndResourceUrl(photo.name),
                    thumbnail: getCndResourceUrl(photo.name),
                    caption: photo.caption,
                    thumbnailWidth: thumbnailWidths[i] || 240,
                    thumbnailHeight: 175,
                  }))}
                />
              </>
            )}
          </GalleryWrapper>
        </ListWrapper>*/}
      </div>  
      <Footer />
    </Layout>
  );
}
export default GuideProfile;


