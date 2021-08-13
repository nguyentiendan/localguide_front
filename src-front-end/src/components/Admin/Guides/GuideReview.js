/* eslint-disable react/no-danger */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState, useLayoutEffect,} from 'react';
import styled from 'styled-components';
import { Avatar, Tag, Spin, Button, Drawer, Input, message } from 'antd';
import { UserOutlined, CrownOutlined, AppstoreAddOutlined,CommentOutlined, } from '@ant-design/icons';
import { FormatQuote, } from '@material-ui/icons';
import _ from 'lodash';
import qs from 'query-string';
import classNames from 'classnames';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

import ReactBnbGallery from 'react-bnb-gallery';
import SectionHeader from '../../SectionHeader';
import breakpoints from '../../../assets/styles/breakpoints';
import CommentListItem from '../../CommentListItem';
import RatingStars from '../../RatingStars';
import TourRelatedListItem from '../../TourRelated';
import Layout from '../../CustomLayout';
import Parallax from '../../Parallax/Parallax.js';
import GridContainer from '../../Grid/GridContainer.js';
import GridItem from '../../Grid/GridItem.js';
import Footer from '../../Footer/Footer.js';
import InterestsOrExtras from '../../InterestsOrExtras';
import SmallScreen from '../../Responsive/SmallScreen';
import BigScreen from '../../Responsive/BigScreen';
//import Button from '../../CustomButtons/Button';
import { bigScreenCss, smallScreenCss } from '../../../assets/styles/responsive-css';
import * as API from '../../../apis';
import iconTour from '../../../assets/img/icon-tour.svg';
import iconReview from '../../../assets/img/icon-review.svg';
import iconLicense from '../../../assets/img/icon-license.svg';
import iconCustomer from '../../../assets/img/icon-customer.svg';
import iconLanguage from '../../../assets/img/icon-language.svg';
import iconLocation from '../../../assets/img/icon-location.svg';
import iconSex from '../../../assets/img/icon-sex.svg';
import styles from '../../../assets/styles/profilePage.js';
import 'react-bnb-gallery/dist/style.css';
import defaultImage from '../../../assets/img/noimage-600x400.jpg';
import { getUserProfile,} from '../../../utils/auth';
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import ReviewCommentListItem from "../../CommentListItem/ReviewCommentListItem";

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

const PhotoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
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
      gap: 15px;
      align-items: center;
      margin-bottom: 10px;
      & > h4 {
        margin: 0;
        color: #525f6b;
        font-weight: 400;
      }
    }
  }
  .mt-40 {
    margin-top: 15px;
  }
  @media (min-width: 768px) {
    .general__information {
      margin-top: 0px;
      padding-right: 30px;
    }
  }
  @media (min-width: 992px) {
    .general__information {
      flex-direction: row;
      justify-content: space-between;
      padding-right: 30px;
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

  & .tour-related + .tour-related {
    margin-left: 2rem;
  }

  ${smallScreenCss(`
    & .tour-related + .tour-related {
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
const { TextArea } = Input;

function AdminGuideReview({ uid, id }) {
  const [userProfile] = useState(getUserProfile());
  const [profile, setProfile] = useState({
    guide: {},
    reviews: { totalReview: 0, listReviews: [] },
  });
  const [tour, setTour] = useState({
    related: { tours: [], allTour: [] },
  });

  const [rootCountry, setRootCountry] = useState({});
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const [photos, setPhotos] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [comments, setComments] = useState({});
  const [replyComment, setReplyComment] = useState([]);
  const [content, setContent] = useState();

  useEffect(() => {
    const fetchData = async () => {      
      setLoading(true);
      const res = await API.getGuideProfileOverview({uid,guideId:id});
      setProfile({
        guide: res.guide,
        reviews: {
          totalReview: res.total_review,
          listReviews: res.review,
        },
      });
      setLoading(false);
    };
    fetchData();
  }, [setProfile, uid, id]);

  useEffect(() => {
    const fetchRelatedTour = async () => {
      const res = await API.getRelatedTour({
        uid,
      });
      setTour({
        related: {
          tours: res.tour,
          allTour: res.allTour,
        },
      });
    };
    fetchRelatedTour();
    const interval = setInterval(() => fetchRelatedTour(), 200000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    (async () => {
      const { data } = await API.getAllCountry();
      const newData = _.keyBy(data, item => item.code);
      setRootCountry(newData);
    })();
  }, []);

  useLayoutEffect(() => {
    const fetchPhotos = async () => {
      const res = await API.getPhotosGuide({ uid });
      if (res.status === false) {
        setPhotos('');
      } else {
        setPhotos(res.data);
      }
    };
    fetchPhotos();
  }, []);

  const handleGetAllReply = async (commentId) => {    
    setLoading(true);
    const res = await API.handleGetAllReply({ id: commentId });
    setReplyComment(res.data);
    setLoading(false);
  };
  
  const handleCreateComment = async (uid, id) => {    
    if (content) {            
      const { data } = await API.handleCreateComment({
        uid, 
        reviewId:parseInt(id),
        type:'user',
        content
      });
      const newComment = {...data[0] };
      setComments([...comments, newComment]);
      setContent('');
    }
  };

  const handleCreateReply = async (e, commentId,uid) => {    
    if ( (e.target.value).trim() != "" ) {
      const { data } = await API.handleCreateReply2({
        uid,
        commentId,
        content: e.target.value,
      });
      const newReply = { ...data[0] };
      setReplyComment([...replyComment, newReply]);
    }
  };
  
  const handleDeleteComment = async (id)  => {
    const newData = _.remove(comments, item => {
      return item.id !== id;
    });
    setComments(newData);    
    let res = await API.handleDeleteComment(id);
    if (res.status) { 
      message.success("Delete success")
    }
  };

  const handleDeleteReply = async (replyId)  => {    
    const newData = _.remove(replyComment, item => {
      return item.id !== replyId;
    });
    setReplyComment(newData);
    let res = await API.handleDeleteReply2( replyId );    
    if (res.status) { 
      message.success("Delete success")
    }
  };

  const showComment = () => {
    setVisible(true);
    const fetchAllComment = async () => {      
      setLoading(true);              
      const res = await API.GetAllReviewComment({id, type:'user',}); //id : account id
      setComments(res.data)      
      setLoading(false);
    }
    fetchAllComment();
  };
  
  const onClose = () => {
    setVisible(false);
  };

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
 
  return (
    <Layout scrollHeight={300}>      
      <Parallax small filter image={require('../../../assets/img/home-banner.jpg')} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <Spin spinning={loading}>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12}>
                <div className={classes.description}>
                  <InfoAvatarAndBackgroundImg>
                    <div className="info__guide">
                      <Avatar size={128} icon={<UserOutlined />} src={profile.guide?.avatar} />
                      <div className="info__guide__details">
                        <h2 style={{ color: '#ffffff' }}>{profile.guide?.fullname}</h2>
                        <Tag
                          icon={<CrownOutlined />}
                          color="#f12f60"
                          className="guide__details__best"
                        >
                          {handleLevelGuide(profile.guide?.level)}
                        </Tag>
                        <p style={{ color: '#EE305F', margin: 0 }}>
                          Possible to plan personalised tour
                        </p>
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
                      {/* <h1>Biography</h1> */}
                      <div className="list__icon">
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
                    {profile.guide?.intro !== '' && (
                      <div
                        className={classes.description}
                        style={{ paddingTop: '0px', paddingBottom: '10px' }}
                      >
                        <FormatQuote style={{ color: '#e91e63' }} />
                        <i>{profile.guide?.intro}</i>
                        <FormatQuote style={{ color: '#e91e63' }} />
                      </div>
                    )}
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
                    {profile.guide?.certificated && (
                      <div className="education__information">
                        <b>Certification:</b>
                        <p>{profile.guide?.certificated}</p>
                      </div>
                    )}
                  </InfoIntroduction>
                </div>
              </GridItem>
            </GridContainer>
          </div>

          {tour.related?.tours.length > 0 && (
            <div className={classes.container}>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={12}>
                  <div className={classes.description}>
                    {tour.related?.allTour > 3 && (
                      <SectionHeader title="Related Tour" subTitle="View all" />
                    )}
                    {tour.related?.tours.length > 0 && tour.related?.allTour <= 3 && (
                      <SectionHeader title="Related Tour" />
                    )}
                    <ListWrapper>
                      <ListContainer>
                        {_.map(tour.related?.tours, (tour, index) => (
                          <TourRelatedListItem
                            key={index}
                            name={tour.name}
                            location={`${tour.city} ${tour.country}`}
                            picture={tour.cover}
                            className="tour-related"
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
          )}
          <br />
          {photos.length > 0 && (
            <div className={classes.container}>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={12}>
                  <div className={classes.description}>
                    <SectionHeader title={<>Photos ({photos.length})</>} />
                    <SmallScreen>
                      <ImgMainWrapper>
                        <img
                          src={photos[0]?.photo || defaultImage}
                          className="imgstyle"
                          onClick={() => setIsOpen(true)}
                        />
                        {photos.length > 1 && (
                          <Button
                            className="buttonOnImage"
                            //color="rose"
                            type="primary"
                            size="sm"
                            onClick={() => setIsOpen(true)}
                          >
                            1 / {photos.length} photos
                          </Button>
                        )}
                      </ImgMainWrapper>
                    </SmallScreen>
                    <BigScreen>
                      <PhotoWrapper>
                        <ImgMainWrapper>
                          <img
                            src={
                              photos[Math.floor(Math.random() * photos.length)]?.photo ||
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
                                  photos[Math.floor(Math.random() * photos.length)]?.photo ||
                                  defaultImage
                                }
                                className="imgstyle"
                                onClick={() => setIsOpen(true)}
                              />
                            </ImgWrapper>
                            <ImgWrapper>
                              <img
                                src={
                                  photos[Math.floor(Math.random() * photos.length)]?.photo ||
                                  defaultImage
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
                                  photos[Math.floor(Math.random() * photos.length)]?.photo ||
                                  defaultImage
                                }
                                className="imgstyle"
                                onClick={() => setIsOpen(true)}
                              />
                            </ImgWrapper>
                            <ImgWrapper>
                              <img
                                src={
                                  photos[Math.floor(Math.random() * photos.length)]?.photo ||
                                  defaultImage
                                }
                                className="imgstyle"
                                onClick={() => setIsOpen(true)}
                              />
                              {photos.length > 5 && (
                                <Button
                                  className="buttonOnImage"
                                  //color="rose"
                                  type="primary"
                                  size="sm"
                                  onClick={() => setIsOpen(true)}
                                >
                                  +{photos.length - 5} Photos
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
            </div>
          )}
          <div>
            <ReactBnbGallery show={isOpen} photos={photos} onClose={() => setIsOpen(false)} />
          </div>
          <br />
          {profile.reviews?.totalReview > 0 && (
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
          )}
        </Spin>
        <Fab      
          mainButtonStyles={{ backgroundColor: '#f12f60',}}
          icon={<AppstoreAddOutlined />}          
          alwaysShowTitle={true}          
        >
          {/*<Action
            style={{backgroundColor: '#F897AF',}}
            text="Disable"
            //onClick={() => confirmModal()} 
          >
            <SwitcherOutlined />
          </Action>*/}
          <Action
            style={{backgroundColor: '#F897AF',}}
            text="Comment"            
            onClick={showComment}
          >
            <CommentOutlined />
          </Action>
        </Fab>

        <Drawer
          title="Comments"
          width={350}
          closable={false}
          onClose={onClose}
          visible={visible}          
          bodyStyle={{paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: 'left',
                //height:150,
              }}
            > 
              <TextArea
                rows={4}
                showCount
                maxLength={300}
                placeholder="Please input comment"                
                value={content || ''}
                onChange={e => setContent((e.target.value).slice(0,300))}
                style={{ marginTop: 5 }}
              />
              <Button 
                onClick={onClose} 
                style={{ marginTop: 5, marginRight: 8 }}>
                Cancel
              </Button>
              <Button 
                type="primary"
                onClick={() => {
                  //setIsFeedback(true);
                  handleCreateComment(userProfile.uid, id);
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
                    uid={userProfile.uid}   //uid of user logining 
                    className="comment"
                  />                    
              </Spin>
            )}      
          </div>
        </Drawer>
      </div>
      <Footer />
    </Layout>
  );
}
export default AdminGuideReview;
