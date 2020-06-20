import React, { useState, useEffect, useLayoutEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Gallery from 'react-grid-gallery';
import { AiOutlineSchedule } from 'react-icons/ai';
import { FaSuitcase, FaMoneyBill, FaUsers } from 'react-icons/fa';
import { MdGTranslate } from 'react-icons/md';
import _ from 'lodash';

import * as API from '../apis';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Spinner from '../components/Spinner';
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
  margin-bottom: 0rem;
  color: ${colors.grey[60]};
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

function TourPage({ data }) {
  const { tour, reviews = { comments: [] } } = data;
  const [tourDetails, setTourDetails] = useState(tour);
  const [thumbnailWidths, setThumbnailWidths] = useState([]);
  const [loading, setLoading] = useState(false);
  const galleryWrapperComp = useRef();

  useEffect(() => {
    const fetchTourDetails = async () => {
      try {
        setLoading(true);
        const response = await API.getTourDetail({ id: tour.id, uid: tour.uid });
        setLoading(false);
        setTourDetails(response);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    };

    fetchTourDetails();
  }, []);

  useLayoutEffect(() => {
    if (!galleryWrapperComp || !galleryWrapperComp.current || !tourDetails.pictures) {
      return () => {};
    }
    const updateSize = _.debounce(() => {
      const wrapperWidth = galleryWrapperComp.current.offsetWidth;
      const maxColumn = Math.round(wrapperWidth / 275);
      const minColumn = 2;
      const maxRows = Math.ceil(tourDetails.pictures.length / ((maxColumn + minColumn) / 2));
      let widths = [];
      for (let i = 0; i < maxRows; i++) {
        const randomColumns = Math.floor(Math.random() * (maxColumn - minColumn + 1) + minColumn);
        const minWidth = (wrapperWidth * 0.6) / randomColumns;
        const maxWidth = (wrapperWidth * 1.25) / randomColumns;
        const rowWidths = [];
        for (let j = 0; j < randomColumns; j++) {
          if (widths.length === tourDetails.pictures.length - 1) {
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
  }, [galleryWrapperComp, tourDetails]);

  const tourGuide = useMemo(() => tourDetails.tourGuide || {}, [tourDetails]);

  return (
    <Layout noHeader>
      <SEO title={tourDetails.name} />

      <SmallScreen>
        <br />
        <Title>{tourDetails.name}</Title>
        <SubTitle>
          Day Trips
          <Gap />
          <RatingStars rate={5} style={{ verticalAlign: 'text-bottom' }} />
        </SubTitle>
        <SubTitle>
          Transportation:
          {tourDetails.transportation}
        </SubTitle>
      </SmallScreen>

      {loading && <Spinner />}

      <GalleryWrapper ref={galleryWrapperComp}>
        {tourDetails.pictures && (
          <Gallery
            enableImageSelection={false}
            images={_.map(tourDetails.pictures, (pic, i) => ({
              src: pic,
              thumbnail: pic,
              thumbnailWidth: thumbnailWidths[i],
              thumbnailHeight: 175,
            }))}
          />
        )}
      </GalleryWrapper>

      <BigScreen>
        <Title>{tourDetails.name}</Title>
        <SubTitle>
          Day Trips
          <Gap />
          <RatingStars rate={5} style={{ verticalAlign: 'text-bottom' }} />
        </SubTitle>
        <SubTitle>
          Transportation:
          {tourDetails.transportation}
        </SubTitle>
      </BigScreen>

      <HeaderWrapper>
        <LocationWrapper>
          <SectionTitle>{tourDetails.location}</SectionTitle>
          <TagWrapper>
            {_.map(tourDetails.tags, tag => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </TagWrapper>
        </LocationWrapper>
        <TourGuideWrapper>
          <TourGuideListItem
            level={tourGuide.level}
            avatar={tourGuide.avatar}
            name={tourGuide.name}
          />
        </TourGuideWrapper>
      </HeaderWrapper>

      <SectionTitle>Price</SectionTitle>
      <PriceWrapper>
        <PriceMenuWrapper>
          <NavItem className="nav-item" title={tourDetails.price} icon={<FaMoneyBill />} isActive />
          <NavItem
            className="nav-item"
            title={tourDetails.duration}
            icon={<AiOutlineSchedule />}
            isActive
          />
          <NavItem
            className="nav-item"
            title={tourDetails.language}
            icon={<MdGTranslate />}
            isActive
          />
          <NavItem
            className="nav-item"
            title={`${tourDetails.availableTours} Tours`}
            icon={<FaSuitcase />}
            isActive
          />
          <NavItem
            className="nav-item"
            title={`${tourDetails.tourSizeFrom}-${tourDetails.tourSizeTo}`}
            icon={<FaUsers />}
            isActive
          />
        </PriceMenuWrapper>
        <BookButton>Book</BookButton>
      </PriceWrapper>
      <SectionTitle>Tour description</SectionTitle>
      <DescriptionWrapper>{tourDetails.description}</DescriptionWrapper>

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
    </Layout>
  );
}

TourPage.propTypes = {
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
};

export default TourPage;

export const pageQuery = graphql`
  query($id: String!) {
    tour(rawID: { eq: $id }) {
      id
      name
      location
      picture
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
