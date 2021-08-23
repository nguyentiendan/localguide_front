/* eslint-disable react/no-danger */
import React, { useState, useEffect, useMemo } from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import {
  FaSuitcase,
  FaMoneyCheckAlt,
  FaRegCalendarAlt,
  FaShare,
  FaTwitter,
  FaBookmark,
  FaLanguage,
  FaUsers,
} from 'react-icons/fa';
import { CheckCircleOutlined, AppstoreAddOutlined, CommentOutlined } from '@ant-design/icons';
import { Drawer, Input, Button, Spin, Modal, message } from 'antd';
import _ from 'lodash';
import { FormatQuote } from '@material-ui/icons';
import ReactBnbGallery from 'react-bnb-gallery';
import NumberFormat from 'react-number-format';
import * as API from '../../../apis';
import Layout from '../../CustomLayout';
import Footer from '../../Footer/Footer.js';
import GridContainer from '../../Grid/GridContainer.js';
import GridItem from '../../Grid/GridItem.js';
import SmallScreen from '../../Responsive/SmallScreen';
import BigScreen from '../../Responsive/BigScreen';
import RatingStars from '../../RatingStars';
import colors from '../../../assets/styles/colors';
import SectionHeader from '../../SectionHeader';
import CommentListItem from '../../CommentListItem';
import breakpoints from '../../../assets/styles/breakpoints';
import NavItem from '../../Layout/NavItem';
// import Button from '../../CustomButtons/Button';
import { bigScreenCss, smallScreenCss } from '../../../assets/styles/responsive-css';
import TourGuideListItem from '../../TourGuideListItem';
import { safeFuncCall } from '../../../utils/commons';
import defaultImage from '../../../assets/img/noimage-600x400.jpg';
import styles from '../../../assets/styles/tourPage.js';
import 'react-bnb-gallery/dist/style.css';
import { getUserProfile } from '../../../utils/auth';
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import ReviewCommentListItem from '../../CommentListItem/ReviewCommentListItem';
import { navigate } from 'gatsby';

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
  font-size: 18px;
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

const TitleWrapper = styled.div`
  flex: 1;
  width: 98%;
  //height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const VoteWrapper = styled.div`
  flex: 1;
  width: 98%;
  //height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TotalWrapper = styled.div`
  display: flex;
  padding-top: 0px;
  justify-content: flex-end;
`;

const SocialWrapper = styled.div`
  display: flex;
  padding-top: 0px;
  justify-content: flex-end;
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

const PhotoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;

  ${bigScreenCss(`
    flex-direction: row;
  `)}
`;

const ImgMainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  flex: 1;
  .imgstyle {
    width: 98%;
    height: 100%;
    //padding-right:8px;
    box-shadow: lavender;
    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.38);
    border-radius: 5px 5px 5px 5px;
    margin-bottom: 6px;
  }
  .buttonOnImage {
    font-weight: 400;
    color: white;
    margin: 0;
    position: absolute;
    top: 88%;
    left: 78%;
    font-size: 11px;
    transform: translate(-50%, -50%);
  }

  @media (min-width: 768px) {
    width: 50%;
    height: 400px;
    .imgstyle {
      width: 98%;
      height: 100%;
      //padding-right:8px;
      box-shadow: lavender;
      box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.38);
      border-radius: 5px 5px 5px 5px;
      margin-bottom: 6px;
    }
  }
  @media (min-width: 992px) {
    width: 50%;
    height: 400px;
    .imgstyle {
      width: 98%;
      height: 100%;
      //padding-right:8px;
      box-shadow: lavender;
      box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.38);
      border-radius: 5px 5px 5px 5px;
      margin-bottom: 6px;
    }
  }
`;
const ImgSecondWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 400px;
  flex: 1;
`;

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  height: 200px;
  margin-bottom: 0px;
`;

const ImgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  //flex-basis: 100%;
  flex: 1;
  .imgstyle {
    width: 96%;
    height: 96%;
    margin-bottom: 0px;
    box-shadow: lavender;
    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.38);
    border-radius: 5px 5px 5px 5px;
    cursor: pointer;
  }
  .buttonOnImage {
    font-weight: 500;
    color: white;
    margin: 0;
    position: absolute;
    top: 92%;
    left: 87%;
    font-size: 12px;
    transform: translate(-50%, -50%);
  }

  @media (min-width: 768px) {
    .imgstyle {
      width: 96%;
      height: 96%;
      margin-bottom: 0px;
      box-shadow: lavender;
      box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.38);
      border-radius: 5px 5px 5px 5px;
    }
  }
  @media (min-width: 992px) {
    .imgstyle {
      width: 96%;
      height: 96%;
      margin-bottom: 0px;
      box-shadow: lavender;
      box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.38);
      border-radius: 5px 5px 5px 5px;
    }
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
  font-size: 25px;
  font-weight: 700;
  margin-right: 0px;
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

const Space = styled.div`
  display: inline-block;
  width: 20px;
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

/** TODO
 * 1) Them icon Language (chi de 1 languagua, khi re vao thi ra tooltip)
 */
const useStyles = makeStyles(styles);
const { TextArea } = Input;

function AdminTourReview({ uid, id }) {
  const classes = useStyles();
  const user = getUserProfile();
  const [tourPhotos, setTourPhotos] = useState([]);
  // const [isApprove, setIsApprove] = useState(false);
  const [tourDetails, setTourDetails] = useState({});
  const [tourDescriptionDays, setTourDescriptionDays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [comments, setComments] = useState({});
  const [replyComment, setReplyComment] = useState([]);
  const [content, setContent] = useState();

  const tourQuery = useMemo(() => {
    const query = {};
    query.uid = uid;
    query.id = id;
    return query;
  }, [uid, id]);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const res = await API.getTourPhotos(tourQuery);
      if (res.status === false) {
        const data = [{ photo: defaultImage, subcaption: 'no image' }];
        setTourPhotos(data);
      } else {
        setTourPhotos(res.data);
      }
      setLoading(false);
    };
    fetchData();
    const interval = setInterval(() => fetchData(), 200000);
    return () => {
      clearInterval(interval);
    };
  }, [tourQuery]);

  useEffect(() => {
    const fetchTourDetails = async () => {
      try {
        setLoading(true);
        const { data: details } = await safeFuncCall(() => API.adminReviewTour(tourQuery));
        setTourDetails(_.mapKeys(details[0], (v, k) => _.camelCase(k)));

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

  const handleGetAllReply = async commentId => {
    setLoading(true);
    const res = await API.handleGetAllReply({ id: commentId });
    setReplyComment(res.data);
    setLoading(false);
  };

  const handleCreateComment = async (uid, id) => {
    if (content) {
      const { data } = await API.handleCreateComment({
        uid,
        reviewId: parseInt(id),
        type: 'tour',
        content,
      });
      const newComment = { ...data[0] };
      setComments([...comments, newComment]);
      setContent('');
    }
  };

  const handleCreateReply = async (e, commentId, uid) => {
    if (e.target.value.trim() != '') {
      const { data } = await API.handleCreateReply2({
        uid,
        commentId,
        content: e.target.value,
      });
      const newReply = { ...data[0] };
      setReplyComment([...replyComment, newReply]);
    }
  };

  const handleDeleteComment = async id => {
    const newData = _.remove(comments, item => {
      return item.id !== id;
    });
    setComments(newData);
    const res = await API.handleDeleteComment(id);
    if (res.status) {
      message.success('Delete success');
    }
  };

  const handleDeleteReply = async replyId => {
    const newData = _.remove(replyComment, item => {
      return item.id !== replyId;
    });
    setReplyComment(newData);
    const res = await API.handleDeleteReply2(replyId);
    if (res.status) {
      message.success('Delete success');
    }
  };

  const showComment = () => {
    setVisible(true);
    const fetchAllComment = async () => {
      setLoading(true);
      const res = await API.GetAllReviewComment({ id, type: 'tour' }); // id : account id
      setComments(res.data);
      setLoading(false);
    };
    fetchAllComment();
  };

  const onClose = () => {
    setVisible(false);
  };

  const confirmApproveTour = () => {
    Modal.confirm({
      title: 'Confirmation',
      content: (
        <div>
          <p>Approve is make tour active</p>
          <p>Are you sure</p>
        </div>
      ),
      closable: true,
      centered: true,
      okText: 'OK',
      onOk() {
        handleApproveTour();
      },
      onCancel() {},
    });
  };

  const handleApproveTour = async () => {
    setLoading(true);
    const { status } = await API.handleAdminApproveTour({ uid, id, status: 1 });
    if (status === true) {
      message.success('Actived success');
      navigate('app/adminTourList/');
    }
    // setIsApprove(true);
    setLoading(false);
  };

  return (
    <Layout scrollHeight={10} textColor="black">
      <div className={classNames(classes.main, classes.mainRaised)} style={{ paddingTop: '70px' }}>
        <div className={classes.container}>
          <Spin spinning={loading}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12}>
                <div className={classes.description}>
                  <SmallScreen>
                    <TitleWrapper>
                      <Title style={{ textAlign: 'left', fontSize: '20px' }}>
                        {tourDetails.name}
                      </Title>
                      <SocialWrapper>
                        <NavItem
                          className="nav-item"
                          title=""
                          icon={<FaBookmark style={{ color: '#f12f60' }} />}
                          isActive
                        />
                        <Space />
                        <NavItem
                          className="nav-item"
                          title=""
                          icon={<FaTwitter style={{ color: '#f12f60' }} />}
                          isActive
                        />
                        <Space />
                        <NavItem
                          className="nav-item"
                          title=""
                          icon={<FaShare style={{ color: '#f12f60' }} />}
                          isActive
                        />
                      </SocialWrapper>
                    </TitleWrapper>
                    <SubTitle style={{ textAlign: 'left' }}>
                      <span style={{ fontSize: '25px' }}>4.5</span>
                      <Gap />
                      <RatingStars rate={4.5} style={{ verticalAlign: 'text-bottom' }} />
                      {/* <RatingStars rate={reviews?.rate} style={{ verticalAlign: 'text-bottom' }} /> */}
                    </SubTitle>
                    <div style={{ textAlign: 'left', fontSize: '10px' }}>1,305 votes</div>
                  </SmallScreen>

                  <BigScreen>
                    <TitleWrapper>
                      <Title style={{ textAlign: 'left' }}>{tourDetails.name}</Title>
                      <SocialWrapper>
                        <NavItem className="nav-item" title="" icon={<FaBookmark />} isActive />
                        <Space />
                        <NavItem className="nav-item" title="" icon={<FaTwitter />} isActive />
                        <Space />
                        <NavItem className="nav-item" title="" icon={<FaShare />} isActive />
                      </SocialWrapper>
                    </TitleWrapper>
                    <VoteWrapper>
                      <SubTitle style={{ textAlign: 'left' }}>
                        <span style={{ fontSize: '25px' }}>4.5</span>
                        <Gap />
                        <RatingStars rate={4.5} style={{ verticalAlign: 'text-bottom' }} />
                        <div style={{ textAlign: 'left', fontSize: '11px' }}>1,305 votes</div>
                      </SubTitle>
                      <TotalWrapper>
                        <Price>
                          <NumberFormat
                            value={tourDetails.total || 0}
                            displayType="text"
                            thousandSeparator
                            prefix="$"
                          />
                        </Price>
                      </TotalWrapper>
                    </VoteWrapper>
                  </BigScreen>
                </div>
              </GridItem>
            </GridContainer>

            {tourPhotos.length > 0 && (
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={12}>
                  <div className={classes.description}>
                    <SmallScreen>
                      <ImgMainWrapper>
                        <img
                          src={tourPhotos[0]?.photo || defaultImage}
                          className="imgstyle"
                          onClick={() => setIsOpen(true)}
                        />
                        {tourPhotos.length > 1 && (
                          <Button
                            className="buttonOnImage"
                            color="rose"
                            size="sm"
                            onClick={() => setIsOpen(true)}
                          >
                            1 / {tourPhotos.length} photos
                          </Button>
                        )}
                      </ImgMainWrapper>
                    </SmallScreen>
                    <BigScreen>
                      <PhotoWrapper>
                        <ImgMainWrapper>
                          <img
                            src={
                              tourPhotos[Math.floor(Math.random() * tourPhotos.length)]?.photo ||
                              defaultImage
                            }
                            className="imgstyle"
                            onClick={() => setIsOpen(true)}
                          />
                        </ImgMainWrapper>
                        <ImgSecondWrapper>
                          <RowWrapper>
                            <ImgWrapper>
                              <img
                                src={
                                  tourPhotos[Math.floor(Math.random() * tourPhotos.length)]
                                    ?.photo || defaultImage
                                }
                                className="imgstyle"
                                onClick={() => setIsOpen(true)}
                              />
                            </ImgWrapper>
                            <ImgWrapper>
                              <img
                                src={
                                  tourPhotos[Math.floor(Math.random() * tourPhotos.length)]
                                    ?.photo || defaultImage
                                }
                                className="imgstyle"
                                onClick={() => setIsOpen(true)}
                              />
                            </ImgWrapper>
                          </RowWrapper>
                          <RowWrapper>
                            <ImgWrapper>
                              <img
                                src={
                                  tourPhotos[Math.floor(Math.random() * tourPhotos.length)]
                                    ?.photo || defaultImage
                                }
                                className="imgstyle"
                                onClick={() => setIsOpen(true)}
                              />
                            </ImgWrapper>
                            <ImgWrapper>
                              <img
                                src={
                                  tourPhotos[Math.floor(Math.random() * tourPhotos.length)]
                                    ?.photo || defaultImage
                                }
                                className="imgstyle"
                                onClick={() => setIsOpen(true)}
                              />
                              {tourPhotos.length > 5 && (
                                <Button
                                  className="buttonOnImage"
                                  color="rose"
                                  size="sm"
                                  onClick={() => setIsOpen(true)}
                                >
                                  +{tourPhotos.length - 5} Photos
                                </Button>
                              )}
                            </ImgWrapper>
                          </RowWrapper>
                        </ImgSecondWrapper>
                      </PhotoWrapper>
                    </BigScreen>
                  </div>
                </GridItem>
              </GridContainer>
            )}
            <div>
              <ReactBnbGallery show={isOpen} photos={tourPhotos} onClose={() => setIsOpen(false)} />
            </div>

            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12}>
                <div className={classes.description} style={{ paddingTop: '0px' }}>
                  <FormatQuote style={{ color: '#e91e63' }} />
                  <i>{tourDetails.shortDesc}</i>
                  <FormatQuote style={{ color: '#e91e63' }} />
                </div>
              </GridItem>
            </GridContainer>

            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12}>
                <div className={classes.description} style={{ paddingTop: '0px' }}>
                  <HeaderWrapper>
                    <LocationWrapper>
                      <h2 style={{ textAlign: 'left' }}>
                        {tourDetails.city &&
                          tourDetails.country &&
                          `${tourDetails.city}, ${tourDetails.country}`}
                      </h2>
                      <TagWrapper style={{ textAlign: 'left' }}>
                        {tourDetails.tag &&
                          _.map(tourDetails.tag.split(';'), tag => <Tag key={tag}>{tag}</Tag>)}
                      </TagWrapper>
                    </LocationWrapper>
                    <TourGuideWrapper>
                      {/* <span style={{ paddingBottom: '5px' }}>Tour post by</span> */}
                      <TourGuideListItem
                        // level={tourDetails?.level}
                        avatar={tourDetails.avatar}
                        uid={tourDetails.uid}
                        id={tourDetails.id}
                        // name={tourDetails.tour[0]?.fullName}
                      />
                    </TourGuideWrapper>
                  </HeaderWrapper>
                </div>
              </GridItem>
            </GridContainer>

            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12}>
                <div className={classes.description} style={{ textAlign: 'left' }}>
                  <PriceWrapper>
                    <PriceMenuWrapper>
                      <NavItem
                        className="nav-item"
                        title="18 booked"
                        icon={<FaMoneyCheckAlt style={{ color: '#f12f60' }} />}
                        isActive
                      />
                      <NavItem
                        className="nav-item"
                        title="2 days"
                        icon={<FaRegCalendarAlt style={{ color: '#f12f60' }} />}
                        isActive
                      />
                      <NavItem
                        className="nav-item"
                        title={tourDetails.language || 'No language'}
                        icon={<FaLanguage style={{ color: '#f12f60' }} />}
                        isActive
                      />
                      <NavItem
                        className="nav-item"
                        title={`${tourDetails.minPax || 0}-${tourDetails.maxPax || 0}`}
                        icon={<FaUsers style={{ color: '#f12f60' }} />}
                        isActive
                      />
                    </PriceMenuWrapper>
                    <BookButton
                      type="primary"
                      loading={loading}
                      disabled={loading}
                      style={{ height: 50 }}
                    >
                      <span style={{ fontSize: 20, fontWeight: 500 }}>Book now</span>
                    </BookButton>
                  </PriceWrapper>
                </div>
              </GridItem>
            </GridContainer>

            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12}>
                <div className={classes.description}>
                  <h2 style={{ textAlign: 'left' }}>Tour description</h2>
                  <div
                    style={{ textAlign: 'left' }}
                    dangerouslySetInnerHTML={{ __html: tourDetails.content }}
                  />

                  <SectionTitle style={{ textAlign: 'left' }}>
                    <TourIcon />
                    <Gap />
                    Tour including
                  </SectionTitle>
                  <DescriptionWrapper style={{ textAlign: 'left' }}>
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
                                  <TourDescriptionItem key={i}>
                                    {`${time} at ${name}`}
                                  </TourDescriptionItem>
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
                                        {
                                          time: pickupTime,
                                          location: pickupLocation,
                                          mes: 'pick up at',
                                        },
                                        {
                                          time: finishTime,
                                          location: finishLocation,
                                          mes: 'finish at',
                                        },
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

            {tourDetails.reviews?.totalReview > 0 && (
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={12}>
                  <div className={classes.description}>
                    <SectionHeader
                      title={
                        // eslint-disable-next-line react/jsx-wrap-multilines
                        <>{`Reviews (${tourDetails.reviews?.totalReview})`}</>
                      }
                    />
                    <ListWrapper style={{ textAlign: 'left' }}>
                      {_.map(tourDetails.reviews?.listReviews, (comment, index) => (
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
            )}
          </Spin>
          <Fab
            mainButtonStyles={{ backgroundColor: '#f12f60' }}
            icon={<AppstoreAddOutlined />}
            alwaysShowTitle
          >
            {tourDetails.status == 2 && (
              <Action
                style={{ backgroundColor: '#F897AF' }}
                text="Approve"
                onClick={() => confirmApproveTour()}
              >
                <CheckCircleOutlined />
              </Action>
            )}
            <Action style={{ backgroundColor: '#F897AF' }} text="Comment" onClick={showComment}>
              <CommentOutlined />
            </Action>
          </Fab>
          <Drawer
            title="Comments"
            width={350}
            closable={false}
            onClose={onClose}
            visible={visible}
            bodyStyle={{ paddingBottom: 80 }}
            footer={
              <div
                style={{
                  textAlign: 'left',
                  // height:150,
                }}
              >
                <TextArea
                  rows={4}
                  showCount
                  maxLength={300}
                  placeholder="Please input comment"
                  value={content || ''}
                  onChange={e => setContent(e.target.value.slice(0, 300))}
                  style={{ marginTop: 5 }}
                />
                <Button onClick={onClose} style={{ marginTop: 5, marginRight: 8 }}>
                  Cancel
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    handleCreateComment(user.uid, id);
                  }}
                >
                  Comment
                </Button>
              </div>
            }
          >
            <div>
              {comments.length > 0 && (
                <Spin spinning={loading}>
                  <ReviewCommentListItem
                    comments={comments}
                    replyComment={replyComment}
                    handleGetAllReply={handleGetAllReply}
                    handleCreateReply={handleCreateReply}
                    handleDeleteComment={handleDeleteComment}
                    handleDeleteReply={handleDeleteReply}
                    uid={user.uid} // uid of user logining
                    className="comment"
                  />
                </Spin>
              )}
            </div>
          </Drawer>
        </div>
      </div>
      <Footer />
    </Layout>
  );
}

export default AdminTourReview;
