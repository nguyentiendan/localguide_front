/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';
import styled from 'styled-components';
import { Avatar, Tag } from 'antd';
import { UserOutlined, CrownOutlined } from '@ant-design/icons';
import { FaSuitcase, FaUsers } from 'react-icons/fa';
import _ from 'lodash';
import Gallery from 'react-grid-gallery';
import { AiTwotoneProfile } from 'react-icons/ai';
import qs from 'query-string';
import PropTypes from 'prop-types';

import SectionHeader from '../components/SectionHeader';
import breakpoints from '../styles/breakpoints';
import { smallScreenCss } from '../styles/responsive-css';
import CommentListItem from '../components/CommentListItem';
import RatingStars from '../components/RatingStars';
import DestinationListItem from '../components/DestinationListItem';
import { getCndResourceUrl, resizeImageGallery } from '../utils/commons';
import Layout from '../components/Layout';
import InterestsOrExtras from '../components/InterestsOrExtras';
import * as API from '../apis';

const InfoAvatarAndBackgroundImg = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  .container {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    height: 250px;
  }
  .info__guide {
    display: flex;
    position: relative;
    bottom: -115px;
    align-items: center;
    .info__guide__details {
      margin-left: 25px;
      line-height: 30px;
      .guide__details__best {
        display: none;
      }
    }
  }
  .info__book-now {
    display: flex;
    align-items: flex-end;
    display: none;
  }
  @media (min-width: 768px) {
    .info__guide {
      bottom: -70px;
      .info__guide__details {
        .guide__details__best {
          display: inline-block;
        }
        .guide__details__booking {
          display: none;
        }
      }
    }
    .info__book-now {
      display: block;
    }
  }
  @media (min-width: 992px) {
    .container {
      height: 465px;
    }
    .info__guide {
      bottom: -70px;
    }
    .info__book-now {
      display: flex;
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
      gap: 60px;
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
    }
  }
  @media (min-width: 992px) {
    .general__information {
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

function User({ location }) {
  const [profile, setProfile] = useState({
    guide: {},
    reviews: [],
    tours: [],
  });
  const [photos, setPhotos] = useState({});
  const [thumbnailWidths, setThumbnailWidths] = useState([]);
  const galleryWrapperComp = useRef();
  const dataQueryParams = qs.parse(location.search);

  useLayoutEffect(() => {
    resizeImageGallery({
      useRef: galleryWrapperComp,
      photos: photos?.customDataPhotos,
      useStateSetWidth: setThumbnailWidths,
    });
  }, [galleryWrapperComp, photos?.customDataPhotos, resizeImageGallery, setThumbnailWidths]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await API.getGuideProfileOverview({
        uid: dataQueryParams.uid,
        guideId: dataQueryParams.id,
      });
      setProfile({ guide: res.guide, reviews: res.review, tours: res.tour });
    };
    fetchData();
  }, [setProfile, dataQueryParams.uid, dataQueryParams.id]);

  useEffect(() => {
    const fetchPhotos = async () => {
      const res = await API.getPhotosGuide({
        uid: dataQueryParams.uid,
      });
      const customDataPhotos = _.map(res.data, (photo, i) => {
        return {
          src: getCndResourceUrl(photo.name),
          thumbnail: getCndResourceUrl(photo.name),
          caption: photo.caption,
          thumbnailWidth: thumbnailWidths[i],
          thumbnailHeight: 175,
        };
      });
      setPhotos({
        customDataPhotos,
      });
    };
    fetchPhotos();
  }, [setProfile, API.getPhotosGuide]);

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
    <div>
      <InfoAvatarAndBackgroundImg>
        <Layout noHeader>
          <div className="container">
            <div className="info__guide">
              <Avatar size={128} icon={<UserOutlined />} src={profile.guide?.avatar} />
              <div className="info__guide__details">
                <h2 style={{ color: '#ffffff' }}>{profile.guide?.fullname}</h2>
                <Tag icon={<CrownOutlined />} color="#f12f60" className="guide__details__best">
                  {handleLevelGuide(profile.guide?.level)}
                </Tag>
                <Tag icon={<CrownOutlined />} color="#f12f60" className="guide__details__booking">
                  Book now
                </Tag>
                <p style={{ color: '#EE305F', margin: 0 }}>Possible to plan personalised tour</p>
              </div>
            </div>
            <div className="info__book-now">
              <div style={{ color: '#ffffff' }}>
                <p style={{ margin: 0 }}>Book now</p>
              </div>
            </div>
          </div>
        </Layout>
      </InfoAvatarAndBackgroundImg>
      <Layout noHeader>
        <InfoIntroduction>
          <div className="general__information">
            <h1>Biography</h1>
            <div className="list__icon">
              <div className="flex-center" style={{ flexDirection: 'column' }}>
                <FaSuitcase style={{ fontSize: '26px' }} />
                <p style={{ color: '#525F6B' }}>20 Tours</p>
              </div>
              <div className="flex-center" style={{ flexDirection: 'column' }}>
                <FaSuitcase style={{ fontSize: '26px' }} />
                <p style={{ color: '#525F6B' }}>45 Reviews</p>
              </div>
              <div className="flex-center" style={{ flexDirection: 'column' }}>
                <AiTwotoneProfile style={{ fontSize: '26px' }} />
                <p style={{ color: '#525F6B' }}>Have license</p>
              </div>
              <div className="flex-center" style={{ flexDirection: 'column' }}>
                <FaUsers style={{ fontSize: '26px' }} />
                <p style={{ color: '#525F6B' }}>365 Custommers</p>
              </div>
            </div>
          </div>
          <p>{profile.guide?.experience}</p>
          <div className="details__information mt-40">
            <div className="details__information__item">
              <FaSuitcase style={{ fontSize: '26px' }} />
              <h3>{profile.guide?.language?.split(';').join(', ')}</h3>
            </div>
            <div className="details__information__item">
              <FaSuitcase style={{ fontSize: '26px' }} />
              <h3>
                {profile.guide?.city}, {profile.guide?.country}
              </h3>
            </div>
            <div className="details__information__item">
              <FaSuitcase style={{ fontSize: '26px' }} />
              <h3>
                {profile.guide?.sex === 0 ? 'Female' : 'Male'} {profile.guide?.age}
              </h3>
            </div>
          </div>
          <div className="mt-40">
            <InterestsOrExtras data={profile.guide?.interest} title="Interests" />
            <InterestsOrExtras data={profile.guide?.extras} title="Extras" />
          </div>
          <div className="education__information">
            <b>Education:</b>
            <p>{profile.guide?.education}</p>
          </div>
          <div className="education__information">
            <b>Certification:</b>
            <p>{profile.guide?.specialities}</p>
          </div>
        </InfoIntroduction>
        <ListWrapper ref={galleryWrapperComp}>
          {photos?.customDataPhotos && (
            <>
              <SectionHeader title="Photo" />
              <Gallery enableImageSelection={false} images={photos?.customDataPhotos} />
            </>
          )}
        </ListWrapper>
        <SectionHeader title="Related Tour" subTitle="View all" />
        <ListWrapper>
          <ListContainer>
            {_.map(profile.tours, (tour, index) => (
              <DestinationListItem
                key={index}
                name={tour.Name}
                location={`${tour.City} ${tour.Country}`}
                picture={tour.Cover}
                className="destination"
              />
            ))}
          </ListContainer>
        </ListWrapper>

        <SectionHeader
          title={
            // eslint-disable-next-line react/jsx-wrap-multilines
            <>
              Reviews (45)
              <Gap />
              <RatingStars rate={5} />
            </>
          }
        />
        <ListWrapper>
          {_.map(profile.reviews, (comment, index) => (
            <CommentListItem
              key={index}
              content={comment.Content}
              user={comment.Fullname}
              date={comment.Date}
              avatar={comment.Avatar}
              className="comment"
            />
          ))}
        </ListWrapper>
      </Layout>
    </div>
  );
}
export default User;

User.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
};
