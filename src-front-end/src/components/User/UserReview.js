/* eslint-disable react/no-danger */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState, useLayoutEffect,} from 'react';
import styled from 'styled-components';
import { Avatar, Tag, Spin } from 'antd';
import { UserOutlined, CrownOutlined } from '@ant-design/icons';
import { FormatQuote, Star, StarHalf } from '@material-ui/icons';
import _ from 'lodash';
import qs from 'query-string';
import classNames from 'classnames';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

import breakpoints from '../../assets/styles/breakpoints';
import Layout from '../CustomLayout';

import Parallax from '../Parallax/Parallax.js';
import GridContainer from '../Grid/GridContainer.js';
import GridItem from '../Grid/GridItem.js';
import Footer from '../Footer/Footer.js';
import InterestsOrExtras from '../InterestsOrExtras';
import SmallScreen from '../Responsive/SmallScreen';
import BigScreen from '../Responsive/BigScreen';
import Button from '../CustomButtons/Button';
import { bigScreenCss, smallScreenCss } from '../../assets/styles/responsive-css';
import * as API from '../../apis';
import iconTour from '../../assets/img/icon-tour.svg';
import iconReview from '../../assets/img/icon-review.svg';
import iconLicense from '../../assets/img/icon-license.svg';
import iconCustomer from '../../assets/img/icon-customer.svg';
import iconLanguage from '../../assets/img/icon-language.svg';
import iconLocation from '../../assets/img/icon-location.svg';
import iconSex from '../../assets/img/icon-sex.svg';
import styles from '../../assets/styles/profilePage.js';
import 'react-bnb-gallery/dist/style.css';
import defaultImage from '../../assets/img/noimage-600x400.jpg';
import { getUserProfile, ISUSER } from '../../utils/auth';
import { navigate } from 'gatsby';

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

const IconWrapper = styled.img`
  width: 25px;
  height: 25px;
  margin-bottom: 0;
`;
const useStyles = makeStyles(styles);

function UserReview({ location }) {
  const [userProfile] = useState(getUserProfile());
  if (userProfile.role != ISUSER) {
    navigate('/');
    return null;
  }
  const classes = useStyles();
  const dataQueryParams = qs.parse(location.search);
  const uid = dataQueryParams.uid
  
  const [profile, setProfile] = useState({});
  const [rootCountry, setRootCountry] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {      
      setLoading(true);      
      const res = await API.getUserProfile(uid);       
      if( (res.data.reqActive == 0) && (res.data.role == 1)) {
        navigate('/app/profile');
        return null;
      }       
      setProfile(res.data);
      setLoading(false);
    };
    fetchData();
  }, [setProfile, uid]);
  
  useEffect(() => {
    (async () => {
      const { data } = await API.getAllCountry();
      const newData = _.keyBy(data, item => item.code);
      setRootCountry(newData);
    })();
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
 
  return (
    <Layout scrollHeight={300}> 
      {((profile.reqActive == 0) && (profile.role == 1)) && (
        <>   
      <Parallax small filter image={require('../../assets/img/home-banner.jpg')} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <Spin spinning={loading}>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12}>
                <div className={classes.description}>
                  <InfoAvatarAndBackgroundImg>
                    <div className="info__guide">
                      <Avatar size={128} icon={<UserOutlined />} src={profile.avatar} />
                      <div className="info__guide__details">
                        <h2 style={{ color: '#ffffff' }}>{profile.fullname}</h2>
                        <Tag
                          icon={<CrownOutlined />}
                          color="#f12f60"
                          className="guide__details__best"
                        >
                          {handleLevelGuide(profile.level)}
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
                    {profile.user?.intro !== '' && (
                      <div
                        className={classes.description}
                        style={{ paddingTop: '0px', paddingBottom: '10px' }}
                      >
                        <FormatQuote style={{ color: '#e91e63' }} />
                        <i>{profile.intro}</i>
                        <FormatQuote style={{ color: '#e91e63' }} />
                      </div>
                    )}
                    <h1>Biography</h1>
                    <div dangerouslySetInnerHTML={{ __html: profile.experience }} />

                    <div className="details__information mt-40">
                      {profile.language && (
                        <div className="details__information__item">
                          <IconWrapper src={iconLanguage} alt="Customers" />
                          <h4>{profile.language?.split(';').join(', ')}</h4>
                        </div>
                      )}
                      {(profile.city || profile.country) && (
                        <div className="details__information__item">
                          <IconWrapper src={iconLocation} alt="Customers" />
                          <h4>
                            {profile.city}
                            {profile.city && ','} {rootCountry[profile.country]?.name}
                          </h4>
                        </div>
                      )}
                      {profile.user?.sex && (
                        <div className="details__information__item">
                          <IconWrapper src={iconSex} alt="Customers" />
                          <h4>
                            {profile.sex === 0 ? 'Female' : 'Male'}, {profile.age} years old
                          </h4>
                        </div>
                      )}
                    </div>
                    <div className="mt-40">
                      {profile.interest && (
                        <InterestsOrExtras data={profile.interest} title="Interests" />
                      )}
                      {profile.extras && (
                        <InterestsOrExtras data={profile.extras} title="Extras" />
                      )}
                    </div>
                    {profile.education && (
                      <div className="education__information">
                        <b>Education:</b>
                        <p>{profile.education}</p>
                      </div>
                    )}
                    {profile.certification && (
                      <div className="education__information">
                        <b>Certification:</b>
                        <p>{profile.certification}</p>
                      </div>
                    )}
                  </InfoIntroduction>
                </div>
              </GridItem>
            </GridContainer>
          </div> 
        </Spin>
      </div>
      <Footer />
      </>
    )}  
    </Layout>
  );
}
export default UserReview;
