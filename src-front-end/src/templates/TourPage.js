import React, { useState, useEffect, useLayoutEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';
import Gallery from 'react-grid-gallery';
import { AiOutlineSchedule } from 'react-icons/ai';
import { FaSuitcase, FaMoneyBill, FaUsers } from 'react-icons/fa';
import { MdGTranslate } from 'react-icons/md';
import { Spin, notification, Popconfirm } from 'antd';
import _ from 'lodash';
import qs from 'query-string';

import * as API from '../apis';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import SmallScreen from '../components/Responsive/SmallScreen';
import BigScreen from '../components/Responsive/BigScreen';
import RatingStars from '../components/RatingStars';
import colors from '../styles/colors';
import SectionHeader from '../components/SectionHeader';
import CommentListItem from '../components/CommentListItem';
import breakpoints from '../styles/breakpoints';
import NavItem from '../components/Layout/NavItem';
import Button from '../components/Button';
import { bigScreenCss, smallScreenCss } from '../styles/responsive-css';
import TourGuideListItem from '../components/TourGuideListItem';
import { getUserProfile } from '../utils/auth';
import { getCndResourceUrl, safeFuncCall } from '../utils/commons';
import ModalFeedback from '../components/Feedback/ModalFeedback';

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
  font-weight: normal;
  color: ${colors.grey[50]};
  margin: 0 0 0.5rem 0;

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
  padding-top: 25px;
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
  background: ${colors.magenta[50]};
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
  width: 15px;
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

const ButtonEventAdminWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  .style-button-approve,
  .style-button-edit,
  .style-button-feedback {
    border: 1px solid #ba7c2e;
  }
  .style-button-approve {
    margin-right: 20px;
    background: #92d050;
  }
  .style-button-edit {
    background: #3c78d8;
  }
  .style-button-feedback {
    background: #ff9900;
  }
`;
function TourPage({ data, id, uid, location: locationUrl }) {
  const { tour, reviews = { comments: [] } } = data || {};
  const [tourDetails, setTourDetails] = useState(tour || {});
  const [tourDescriptionDays, setTourDescriptionDays] = useState([]);
  const [tourPhotos, setTourPhotos] = useState([]);
  const [thumbnailWidths, setThumbnailWidths] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { status } = qs.parse(locationUrl?.search);
  const galleryWrapperComp = useRef();
  const user = getUserProfile();
  const tourQuery = useMemo(() => {
    const query = {};
    if (tour && tour.rawID && tour.uid) {
      query.id = tour.rawID;
      query.uid = tour.uid;
    } else if (id && uid) {
      query.id = id;
      query.uid = uid;
    }
    return query;
  }, [tour, id, uid]);
  useEffect(() => {
    const fetchTourDetails = async () => {
      try {
        setLoading(true);
        const { data: details } = await safeFuncCall(() => API.getTourDetail(tourQuery));
        setTourDetails(_.mapKeys(details[0], (v, k) => _.camelCase(k)));
        const { data: photos } = await safeFuncCall(() => API.getTourPhotos(tourQuery));
        setTourPhotos(photos);

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

  useLayoutEffect(() => {
    if (!galleryWrapperComp || !galleryWrapperComp.current || !tourPhotos) {
      return () => {};
    }
    const updateSize = _.debounce(() => {
      const wrapperWidth = galleryWrapperComp.current.offsetWidth;
      const maxColumn = Math.round(wrapperWidth / 275);
      const minColumn = 2;
      const maxRows = Math.ceil(tourPhotos.length / ((maxColumn + minColumn) / 2));
      let widths = [];
      for (let i = 0; i < maxRows; i++) {
        const randomColumns = Math.floor(Math.random() * (maxColumn - minColumn + 1) + minColumn);
        const minWidth = (wrapperWidth * 0.6) / randomColumns;
        const maxWidth = (wrapperWidth * 1.25) / randomColumns;
        const rowWidths = [];
        for (let j = 0; j < randomColumns; j++) {
          if (widths.length === tourPhotos.length - 1) {
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
  }, [galleryWrapperComp, tourPhotos]);
  const handleApproveTour = async () => {
    setLoading(true);
    await API.handleAdminApproveTour({ uid: user.uid, id: tour?.rawID || id });
    notification.success({ message: 'You have successfully approve tour.' });
    setLoading(false);
  };

  return (
    <Layout noHeader>
      <SEO title={tourDetails.name} />
      <Spin spinning={loading}>
        {!status && (
          <div>
            {user?.role === 3 && (
              <ButtonEventAdminWrapper>
                <div>
                  {tourDetails?.status !== 1 && (
                    <Popconfirm
                      title="Are you sure to approve tour?"
                      onConfirm={handleApproveTour}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button className="style-button-approve">Approve</Button>
                    </Popconfirm>
                  )}
                  <Button className="style-button-edit">
                    <Link to={`/edit-tour?q=${tourDetails?.id}`} style={{ color: '#ffffff' }}>
                      Edit
                    </Link>
                  </Button>
                </div>
                <div>
                  <Button className="style-button-feedback" onClick={() => setShowModal(true)}>
                    Tour Feedback
                  </Button>
                </div>
              </ButtonEventAdminWrapper>
            )}
            {user?.role === 2 && (
              <ButtonEventAdminWrapper>
                <div />
                <div>
                  <Button className="style-button-feedback" onClick={() => setShowModal(true)}>
                    Tour Feedback
                  </Button>
                </div>
              </ButtonEventAdminWrapper>
            )}
          </div>
        )}

        <SmallScreen>
          <br />
          <Title>{tourDetails.name}</Title>
          <SubTitle>
            Day Trips
            <Gap />
            <RatingStars rate={reviews?.rate} style={{ verticalAlign: 'text-bottom' }} />
          </SubTitle>
        </SmallScreen>

        <BigScreen>
          <Title>{tourDetails.name}</Title>
          <SubTitle>
            Day Trips
            <Gap />
            <RatingStars rate={reviews?.rate} style={{ verticalAlign: 'text-bottom' }} />
          </SubTitle>
        </BigScreen>

        <GalleryWrapper ref={galleryWrapperComp}>
          {tourPhotos && (
            <Gallery
              enableImageSelection={false}
              images={_.map(tourPhotos, (pic, i) => ({
                src: getCndResourceUrl(pic.name),
                thumbnail: getCndResourceUrl(pic.name),
                thumbnailWidth: thumbnailWidths[i],
                thumbnailHeight: 175,
              }))}
            />
          )}
        </GalleryWrapper>

        <HeaderWrapper>
          <LocationWrapper>
            <SectionTitle>
              {tourDetails.city &&
                tourDetails.country &&
                `${tourDetails.city}, ${tourDetails.country}`}
            </SectionTitle>
            <TagWrapper>
              {tourDetails.tag &&
                _.map(tourDetails.tag.split(';'), tag => <Tag key={tag}>{tag}</Tag>)}
            </TagWrapper>
          </LocationWrapper>
          <TourGuideWrapper>
            <TourGuideListItem
              // level={tourDetails.level}
              level={undefined}
              avatar={tourDetails.avatar}
              name={tourDetails.fullname}
            />
          </TourGuideWrapper>
        </HeaderWrapper>

        <SectionTitle>Price</SectionTitle>
        <PriceWrapper>
          <PriceMenuWrapper>
            <NavItem
              className="nav-item"
              title={`${tourDetails.total || 0}`}
              icon={<FaMoneyBill />}
              isActive
            />
            <NavItem
              className="nav-item"
              title={`${tourDetails.day || 1} day${tourDetails.day > 1 ? 's' : ''}`}
              icon={<AiOutlineSchedule />}
              isActive
            />
            <NavItem
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
            />
          </PriceMenuWrapper>
          <BookButton>Book</BookButton>
        </PriceWrapper>
        <SectionTitle>Tour description</SectionTitle>
        <TourDescription>{tourDetails.content}</TourDescription>
        <DescriptionWrapper>
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

        <SectionHeader
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
        </ListWrapper>
        <ModalFeedback
          showModal={showModal}
          setShowModal={setShowModal}
          user={user}
          tour={tour}
          id={tourDetails?.id}
        />
      </Spin>
    </Layout>
  );
}

TourPage.propTypes = {
  location: PropTypes.shape({ search: PropTypes.string }),
  data: PropTypes.shape({
    tour: PropTypes.shape({
      id: PropTypes.number,
      uid: PropTypes.string,
      name: PropTypes.string,
      location: PropTypes.string,
      picture: PropTypes.string,
    }),
    reviews: PropTypes.shape({
      rate: PropTypes.number,
      total: PropTypes.number,
      comments: PropTypes.arrayOf(PropTypes.shape({})),
    }),
  }).isRequired,
  id: PropTypes.number,
  uid: PropTypes.string,
};

TourPage.defaultProps = {
  id: undefined,
  uid: undefined,
  location: {},
};

export default TourPage;

export const pageQuery = graphql`
  query($id: Int!) {
    tour(rawID: { eq: $id }) {
      id
      rawID
      uid
      name
      country
      city
      cover
      content
      day
      guideFee
      maxPax
      minPax
      shortDesc
      tag
      total
    }
    reviews {
      rate
      total
      comments {
        avatar
        content
        date
        id
        user
      }
    }
  }
`;
