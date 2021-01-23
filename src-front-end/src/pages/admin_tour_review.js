/* eslint-disable react/no-danger */
import React, { useState, useEffect, useLayoutEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import classNames from "classnames";
import styled from 'styled-components';
import { makeStyles } from "@material-ui/core/styles";
import Gallery from 'react-grid-gallery';
import { AiOutlineSchedule } from 'react-icons/ai';
import { FaSuitcase, FaMoneyBill, FaUsers,FaStar,FaMoneyCheckAlt,FaRegCalendarAlt } from 'react-icons/fa';
import { MdGTranslate } from 'react-icons/md';
import { Avatar, Spin } from 'antd';
import _ from 'lodash';
import qs from 'query-string';

import * as API from '../apis';
import Layout from '../components/CustomLayout';
import Parallax from "../components/Parallax/Parallax.js";
import SEO from '../components/SEO';
import Footer from "../components/Footer/Footer.js";
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";

import SmallScreen from '../components/Responsive/SmallScreen';
import BigScreen from '../components/Responsive/BigScreen';
import RatingStars from '../components/RatingStars';
import colors from '../assets/styles/colors';
import SectionHeader from '../components/SectionHeader';
import CommentListItem from '../components/CommentListItem';
import breakpoints from '../assets/styles/breakpoints';
import NavItem from '../components/Layout/NavItem';
import Button from '../components/CustomButtons/Button';
import { bigScreenCss, smallScreenCss } from '../assets/styles/responsive-css';
import TourGuideListItem from '../components/TourGuideListItem';
import { getCndResourceUrl, safeFuncCall } from '../utils/commons';

import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';
import {FormatQuote,Star,StarHalf} from "@material-ui/icons";

import styles from "../assets/styles/tourPage.js";

const Title = styled.h1`
  font-weight: bold;
  clear: both;
  margin: 0 0 1.125rem 0;
  padding-top: 0.5rem;

  ${smallScreenCss(`
    margin: 0 0.5rem .5rem 0;
  `)};
`;

const SubTitle = styled.h3`
  font-weight: bold;
  font-size:18px;
  color: ${colors.grey[80]};
  margin: 0 0 0 0;

  ${smallScreenCss(`
    margin: 0 0 0.5rem 0;
    font-size: 1.125rem;
  `)};
`;

const SectionTitle = styled.h3`
  font-weight: normal;
  color: ${colors.grey[70]};
  margin: 1.5rem 0 0.5rem 0;
  font-weight: 500;
  clear: both;
`;

const HeaderWrapper = styled.div`
  display: flex;
  clear: both;
  padding-top: 0px;
  justify-content: center;

  ${SectionTitle} {
    margin-top: 0;
  }
`;
const LocationWrapper = styled.div`
  flex: 1;
`;
const TagWrapper = styled.div``;
const TourGuideWrapper = styled.div``;

const Tag = styled.span`
  background: ${colors.grey[50]};
  color: ${colors.white};
  padding: 5px 10px;
  margin-right: 5px;
  margin-bottom: 5px;
  border-radius: 4px;
  white-space: nowrap;
  display: inline-block;
`;

const ListWrapper = styled.div`
  max-width: ${breakpoints.lg};
  overflow: auto;

  .comment:last-child .delimiter {
    display: none;
  }
`;

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${bigScreenCss(`
    flex-direction: row;
  `)}
`;

const PriceMenuWrapper = styled.div`
  flex: 1;
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .nav-item {
    pointer-events: none;
    flex-basis: 0;
    flex-grow: 1;

    [class*='NavItem__Wrapper'] {
      ${bigScreenCss(`
        font-size: 1.75rem;
      `)}
    }

    [class*='NavItem__Title'] {
      color: ${colors.grey[60]};
      font-size: 0.825rem;
      margin-top: 5px;
    }
  }
`;
const Price = styled.div`
  color: ${colors.magenta[60]};
  font-size: 30px;
  font-weight: 400;
  margin-right: 10px;
  
`;

const BookButton = styled(Button)`
  flex: 0.65;
  width: 100%;
  justify-content: center;

  ${smallScreenCss(`
    margin-top: 15px;
  `)}
`;

const DescriptionWrapper = styled.div`
  color: ${colors.grey[60]};
  padding-top: 10px;
`;

const TourIcon = styled(FaSuitcase)`
  vertical-align: text-top;
  font-size: 1.5rem;
  color: ${colors.magenta[50]};
`;

const Gap = styled.div`
  display: inline-block;
  width: 5px;
`;

const TourIncludingListItem = styled.li`
  margin-bottom: 0;
  color: ${colors.grey[60]};
`;

const TourDescriptionDay = styled.div`
  font-weight: bold;
  margin-bottom: 0;
  color: ${colors.grey[60]};
`;

const TourDescription = styled.ul`
  margin: 5px 0 15px 23px;
  color: ${colors.grey[60]};
`;

const TourDescriptionTitle = styled.div`
  font-weight: bold;
  color: ${colors.grey[60]};
`;

const TourDescriptionItem = styled.li`
  margin: 0;
  color: ${colors.grey[60]};

  &:first-letter {
    text-transform: uppercase;
  }
`;



const useStyles = makeStyles(styles);

function TourDetail({ location }) {
  const classes = useStyles();

  const dataQueryParams = qs.parse(location.search);
  var uid = dataQueryParams.uid;
  var id = dataQueryParams.id;

  
  {/*const { tour, reviews = { comments: [] } } = data || {};*/}
  const [images, setImages] = useState([]);
  //const [tourDetails, setTourDetails] = useState({});
  const [tourDetails, setTourDetails] = useState({
    tour: [],
    reviews: { totalReview: 0, listReviews: [] },
  });

  const [tourDescriptionDays, setTourDescriptionDays] = useState([]);
  const [loading, setLoading] = useState(false);
  
  
  const tourQuery = useMemo(() => {
    const query = {};
    query.uid = uid;
    query.id = id;    
    return query;
  }, [uid, id]);

  useEffect(() => {
    let shouldCancel = false;

    const fetchImage = async () => {
      const response = await API.getTourPhotos(tourQuery);

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

  useEffect(() => {
    const fetchData = async () => {
      const res = await API.getTourDetail(tourQuery);
      console.log(res)
      setTourDetails({
        tour: res.tour,
        reviews: {
          totalReview: res.total_review,
          listReviews: res.review,
        },
      });
    };
    fetchData();    
  }, [tourQuery]);

  useEffect(() => {
    const fetchTourDetails = async () => {
      try {
        setLoading(true);
        const descDays = {};
        const { data: transport } = await safeFuncCall(() => API.getTourFeeTransport(tourQuery));
        _.forEach(transport, ({ Trans: transports }, day) => {
          descDays[day] = descDays[day] || {};
          descDays[day].transports = transports;
        });
        const { data: meal } = await safeFuncCall(() => API.getTourFeeMeal(tourQuery));
        _.forEach(meal, ({ Meal: meals }, day) => {
          descDays[day] = descDays[day] || {};
          descDays[day].meals = meals;
        });
        const { data: other } = await safeFuncCall(() => API.getTourFeeOther(tourQuery));
        _.forEach(other, ({ Other: others }, day) => {
          descDays[day] = descDays[day] || {};
          descDays[day].others = others;
        });
        const { data: pickup } = await safeFuncCall(() => API.getTourSchedulePickUp(tourQuery));
        _.forEach(pickup, ({ Pickup: pickups }, day) => {
          descDays[day] = descDays[day] || {};
          descDays[day].pickups = pickups;
        });
        const { data: schedule } = await safeFuncCall(() => API.getTourSchedule(tourQuery));
        _.forEach(schedule, ({ Schedule: schedules }, day) => {
          descDays[day] = descDays[day] || {};
          descDays[day].schedules = schedules;
        });
        setTourDescriptionDays(descDays);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTourDetails();
  }, [tourQuery]);

  
  return (
    <Layout scrollHeight={10} textColor="black">
      <SEO title={tourDetails.name || ''} />
      {/*<Parallax small filter image={require("../assets/img/home-banner.jpg")} />*/}
      <div className={classNames(classes.main, classes.mainRaised)} style={{ paddingTop: "70px"}}>
        <div className={classes.container}>
          <Spin spinning={loading}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12}>
                <div className={classes.description}>                  
                  <SmallScreen>                    
                    <Title style={{ textAlign: "left"}}>{tourDetails.tour[0]?.name}</Title>
                    <SubTitle style={{ textAlign: "left"}}>                      
                      <span style={{fontSize:"25px"}}>4.5</span>
                      <Gap />                      
                      <RatingStars rate={4.5} style={{ verticalAlign: 'text-bottom' }} />                                                            
                      {/*<RatingStars rate={reviews?.rate} style={{ verticalAlign: 'text-bottom' }} />*/}
                    </SubTitle>                    
                    <div style={{ textAlign: "left", fontSize:"11px"}}>1,305 votes</div>                    
                  </SmallScreen>

                  <BigScreen>
                    <Title style={{ textAlign: "left"}}>{tourDetails.tour[0]?.name}</Title>
                    <SubTitle style={{ textAlign: "left"}}>                      
                      <span style={{fontSize:"25px"}}>4.5</span>
                      <Gap />                      
                      <RatingStars rate={4.5} style={{ verticalAlign: 'text-bottom' }} />                      
                    </SubTitle>                    
                    <div style={{ textAlign: "left", fontSize:"11px"}}>1,305 votes</div>
                  </BigScreen>
                </div>
              </GridItem>
            </GridContainer>    

            {images?.length > 0 && 
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12}>
                <div className={classes.description}>                  
                  <ImageGallery items={images}  
                    lazyLoad={true} autoPlay={true} 
                    infinite={true} 
                    showFullscreenButton={false} 
                    showPlayButton={false} 
                    showThumbnails={false}
                    slideDuration={250}
                  />                  
                </div>  
              </GridItem>
            </GridContainer>
            }
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12}>
                <div className={classes.description} style={{paddingTop:"0px"}}>
                  <FormatQuote style={{ color : "#e91e63"}}/>
                  <i>{tourDetails.tour[0]?.shortDesc}</i>
                  <FormatQuote style={{ color : "#e91e63"}}/>
                </div>  
              </GridItem>
            </GridContainer>

            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12}>
                <div className={classes.description}  style={{paddingTop:"0px"}}>                  
                  <HeaderWrapper >
                    <LocationWrapper>
                      <h2 style={{ textAlign: "left"}}>
                        {tourDetails.tour[0]?.city &&
                          tourDetails.tour[0]?.country &&
                          `${tourDetails.tour[0]?.city}, ${tourDetails.tour[0]?.country}`}</h2>                      
                      <TagWrapper style={{ textAlign: "left"}}>
                        {tourDetails.tour[0]?.tag &&
                        _.map(tourDetails.tour[0]?.tag.split(';'), tag => <Tag key={tag}>{tag}</Tag>)}
                      </TagWrapper>
                    </LocationWrapper>
                    <TourGuideWrapper>
                      <span style={{ paddingBottom: "5px"}}>Tour post by</span>
                      <TourGuideListItem                        
                        //level={tourDetails?.level}
                        avatar={tourDetails.tour[0]?.avatar}
                        name={tourDetails.tour[0]?.fullName}
                      />
                    </TourGuideWrapper>
                  </HeaderWrapper>
                </div>
              </GridItem>
            </GridContainer>

            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12}>
                <div className={classes.description} style={{ textAlign: "left" }} >
                  <PriceWrapper>
                    <PriceMenuWrapper>
                      <NavItem
                        className="nav-item"
                        title="18 booked"
                        icon={<FaMoneyCheckAlt style={{ color: '#f12f60' }}/>}
                        isActive
                      />
                      <NavItem
                        className="nav-item"
                        title="2 days"
                        icon={<FaRegCalendarAlt style={{ color: '#f12f60' }}/>}
                        isActive
                      />
                      {/*<NavItem
                        className="nav-item"
                        title={tourDetails.language || 'No language'}
                        icon={<MdGTranslate />}
                        isActive
                      />
                      <NavItem
                        className="nav-item"
                        title={`${tourDetails.availableTours || 0} Tours`}
                        icon={<FaSuitcase />}
                        isActive
                      />
                      <NavItem
                        className="nav-item"
                        title={`${tourDetails.minPax || 0}-${tourDetails.maxPax || 0}`}
                        icon={<FaUsers />}
                        isActive
                      />*/}
                      <Price>${tourDetails.tour[0]?.total || 0}</Price>
                    </PriceMenuWrapper>
                    <BookButton color="rose" loading={loading} disabled={loading}>Book now</BookButton>
                  </PriceWrapper>  
                </div>  
              </GridItem>
            </GridContainer>    
            
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12}>
                <div className={classes.description}>                  
                  <h2 style={{ textAlign: "left"}}>Tour description</h2>
                  {/*<TourDescription>
                    <div dangerouslySetInnerHTML={{ __html: tourDetails.content }} />                   
                  </TourDescription>*/}
                  <div style={{ textAlign: "left",}} dangerouslySetInnerHTML={{ __html: tourDetails.tour[0]?.content }} />
                      
                    <DescriptionWrapper style={{ textAlign: "left"}}>
                      <ul>
                        {_.map(
                          tourDescriptionDays,
                          ({ transports, meals, others, pickups, schedules }, day) => (
                            <li key={day}>
                              <TourDescriptionDay>{`Day ${day}:`}</TourDescriptionDay>
                              {transports && (
                                <TourDescription>
                                  <TourDescriptionTitle>Transportations:</TourDescriptionTitle>
                                  {_.map(transports, ({ from, to, vehicle }, i) => (
                                    <TourDescriptionItem key={i}>
                                      {`${from} - ${to} ${vehicle}`}
                                    </TourDescriptionItem>
                                  ))}
                                </TourDescription>
                              )}

                              {meals && (
                                <TourDescription>
                                  <TourDescriptionTitle>Meals:</TourDescriptionTitle>
                                  {_.map(meals, ({ time, name }, i) => (
                                    <TourDescriptionItem key={i}>{`${time} at ${name}`}</TourDescriptionItem>
                                  ))}
                                </TourDescription>
                              )}
                              {others && (
                                <TourDescription>
                                  <TourDescriptionTitle>Other:</TourDescriptionTitle>
                                  {_.map(others, ({ name }, i) => (
                                    <TourDescriptionItem key={i}>{`${name}`}</TourDescriptionItem>
                                  ))}
                                </TourDescription>
                              )}
                              {pickups && (
                                <TourDescription>
                                  <TourDescriptionTitle>Pickup:</TourDescriptionTitle>
                                  {_.map(
                                    pickups,
                                    (
                                      {
                                        pickup_time: pickupTime,
                                        pickup_location: pickupLocation,
                                        finish_time: finishTime,
                                        finish_location: finishLocation,
                                      },
                                      i
                                    ) =>
                                      _.map(
                                        [
                                          { time: pickupTime, location: pickupLocation, mes: 'pick up at' },
                                          { time: finishTime, location: finishLocation, mes: 'finish at' },
                                        ],
                                        ({ time, location, mes }, j) => (
                                          <TourDescriptionItem key={`${i}-${j}`}>
                                            {`${time} ${mes} ${location}`}
                                          </TourDescriptionItem>
                                        )
                                      )
                                  )}
                                </TourDescription>
                              )}
                              {schedules && (
                                <TourDescription>
                                  <TourDescriptionTitle>Schedule:</TourDescriptionTitle>
                                  {_.map(schedules, ({ from, to, location }, i) => (
                                    <TourDescriptionItem key={i}>
                                      {`${from} - ${to} ${location}`}
                                    </TourDescriptionItem>
                                  ))}
                                </TourDescription>
                              )}
                            </li>
                          )
                        )}
                      </ul>
                    </DescriptionWrapper>
                </div>
              </GridItem>
            </GridContainer>

            
            

            {tourDetails.tourIncluding && (
              <>
                <SectionTitle>
                  <TourIcon />
                  <Gap />
                  Tour including:
                </SectionTitle>
                <ul>
                  {_.map(tourDetails.tourIncluding, i => (
                    <TourIncludingListItem key={i}>{i}</TourIncludingListItem>
                  ))}
                </ul>
              </>
            )}
            <br />
            <br />

            {/*<SectionHeader
              title={
                // eslint-disable-next-line react/jsx-wrap-multilines
                <>{`Reviews (${reviews.total})`}</>
              }
            />
            <ListWrapper>
              {_.map(reviews.comments, comment => (
                <CommentListItem
                  key={comment.id}
                  content={comment.content}
                  user={comment.user}
                  date={comment.date}
                  avatar={comment.avatar}
                  className="comment"
                />
              ))}
            </ListWrapper>*/}
          </Spin>
        </div>
      </div>
      <Footer />
    </Layout>
  );
}

export default TourDetail;

