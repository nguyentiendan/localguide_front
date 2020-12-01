/* eslint-disable react/no-danger */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';
import styled from 'styled-components';
import { Avatar, Tag } from 'antd';
import { UserOutlined, CrownOutlined } from '@ant-design/icons';
import _ from 'lodash';
import Gallery from 'react-grid-gallery';
import qs from 'query-string';
import PropTypes from 'prop-types';

import SectionHeader from '../components/SectionHeader';
import breakpoints from '../styles/breakpoints';
import { smallScreenCss } from '../styles/responsive-css';
import CommentListItem from '../components/CommentListItem';
import RatingStars from '../components/RatingStars';
import DestinationListItem from '../components/DestinationListItem';
import { getCndResourceUrl } from '../utils/commons';
import Layout from '../components/Layout';
import InterestsOrExtras from '../components/InterestsOrExtras';
import * as API from '../apis';
import iconTour from '../images/icon-tour.svg';
import iconReview from '../images/icon-review.svg';
import iconLicense from '../images/icon-license.svg';
import iconCustomer from '../images/icon-customer.svg';
import iconBooking from '../images/icon-booking.svg';
import iconLanguage from '../images/icon-language.svg';
import iconLocation from '../images/icon-location.svg';
import iconSex from '../images/icon-sex.svg';
import banner from '../images/home-banner.jpg';

const InfoAvatarAndBackgroundImg = styled.div`
  background: url(${banner}) no-repeat center;
  background-size: cover;
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
  .guide__details__booking {
    display: flex;
    width: 115px;
    background-color: #f12f60;
    border-radius: 4px;
    padding: 0px 8px;
    color: #ffffff;
    & > img {
      width: 20px;
      margin-bottom: 0px;
      margin-right: 5px;
    }
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

const IconWrapper = styled.img`
  width: 35px;
  height: 35px;
  margin-bottom: 0;
`;

function User({ location }) {
  const [profile, setProfile] = useState({
    guide: {},
    reviews: { totalReview: 0, listReviews: [] },
    tours: [],
  });
  const [rootCountry, setRootCountry] = useState({});
  const [photos, setPhotos] = useState([]);
  const [thumbnailWidths, setThumbnailWidths] = useState([]);
  const galleryWrapperComp = useRef();
  const dataQueryParams = qs.parse(location.search);

  useLayoutEffect(() => {
    if (!galleryWrapperComp || !galleryWrapperComp.current || !photos) {
      return () => {};
    }
    const updateSize = _.debounce(() => {
      const wrapperWidth = galleryWrapperComp.current.offsetWidth;
      const maxColumn = Math.round(wrapperWidth / 275);
      const minColumn = 2;
      const maxRows = Math.ceil(photos.length / ((maxColumn + minColumn) / 2));
      let widths = [];
      for (let i = 0; i < maxRows; i++) {
        const randomColumns = Math.floor(Math.random() * (maxColumn - minColumn + 1) + minColumn);
        const minWidth = (wrapperWidth * 0.6) / randomColumns;
        const maxWidth = (wrapperWidth * 1.25) / randomColumns;
        const rowWidths = [];
        for (let j = 0; j < randomColumns; j++) {
          if (widths.length === photos.length - 1) {
            rowWidths.push(wrapperWidth - _.sum(rowWidths));
            break;
          } else if (j === randomColumns - 1) {
            rowWidths.push(wrapperWidth - _.sum(rowWidths));
          } else {
            rowWidths.push(Math.floor(Math.random() * (maxWidth - minWidth + 1) + minWidth));
          }
        }
        widths = [...widths, ...rowWidths];
      }
      setThumbnailWidths(widths);
    }, 350);
    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, [galleryWrapperComp, photos]);

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
        tours: res.tour,
      });
    };
    fetchData();
  }, [setProfile, dataQueryParams.uid, dataQueryParams.id]);

  useLayoutEffect(() => {
    const fetchPhotos = async () => {
      const res = await API.getPhotosGuide({
        uid: dataQueryParams.uid,
      });
      setPhotos(res.data);
    };
    fetchPhotos();
  }, [setProfile, API.getPhotosGuide, dataQueryParams.uid]);

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
                <div className="guide__details__booking">
                  <img src={iconBooking} alt="booking" />
                  Book now
                </div>
                <p style={{ color: '#EE305F', margin: 0 }}>Possible to plan personalised tour</p>
              </div>
            </div>
            <div className="info__book-now">
              <div style={{ color: '#ffffff', textAlign: 'center', cursor: 'pointer' }}>
                <IconWrapper src={iconBooking} alt="Booking" />
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
          <div dangerouslySetInnerHTML={{ __html: profile.guide?.experience }} />
          <div className="details__information mt-40">
            {profile.guide?.language && (
              <div className="details__information__item">
                <IconWrapper src={iconLanguage} alt="Customers" />
                <h3>{profile.guide?.language?.split(';').join(', ')}</h3>
              </div>
            )}
            {(profile.guide?.city || profile.guide?.country) && (
              <div className="details__information__item">
                <IconWrapper src={iconLocation} alt="Customers" />
                <h3>
                  {profile.guide?.city}
                  {profile.guide?.city && ','} {rootCountry[profile.guide?.country]?.name}
                </h3>
              </div>
            )}
            {profile.guide?.sex && (
              <div className="details__information__item">
                <IconWrapper src={iconSex} alt="Customers" />
                <h3>
                  {profile.guide?.sex === 0 ? 'Female' : 'Male'} {profile.guide?.age}
                </h3>
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
        <ListWrapper>
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
        </ListWrapper>
        {profile.tours.length > 0 && <SectionHeader title="Related Tour" subTitle="View all" />}
        <ListWrapper>
          <ListContainer>
            {_.map(profile.tours, (tour, index) => (
              <DestinationListItem
                key={index}
                name={tour.Name}
                location={`${tour.City} ${tour.Country}`}
                picture={tour.Cover}
                className="destination"
                id={tour.ID}
                uid={tour.UID}
              />
            ))}
          </ListContainer>
        </ListWrapper>
        {profile.reviews?.listReviews?.length > 0 && (
          <SectionHeader
            title={
              // eslint-disable-next-line react/jsx-wrap-multilines
              <>
                Reviews ({profile.reviews?.totalReview})
                <Gap />
                <RatingStars rate={5} />
              </>
            }
          />
        )}
        <ListWrapper>
          {_.map(profile.reviews?.listReviews, (comment, index) => (
            <CommentListItem
              key={index}
              content={comment.Content}
              user={comment.Fullname}
              date={comment.Created_At}
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
