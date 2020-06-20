import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Gallery from 'react-grid-gallery';
import _ from 'lodash';

import * as API from '../apis';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Spinner from '../components/Spinner';
import SmallScreen from '../components/Responsive/SmallScreen';
import BigScreen from '../components/Responsive/BigScreen';
import RatingStars from '../components/RatingStars';
import colors from '../styles/colors';

const Title = styled.h1`
  font-weight: bold;
  clear: both;
  margin: 0 1rem 1.5rem 0;
  padding-top: 0.5rem;
`;

const SubTitle = styled.h3`
  font-weight: normal;
  color: ${colors.grey[50]};
  margin: 0 0 0.5rem 0;
`;

const SectionTitle = styled.h3`
  font-weight: normal;
  color: ${colors.grey[70]};
  margin: 1rem 0 0.5rem 0;
  font-weight: 500;
`;

const GalleryWrapper = styled.div`
  display: block;

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
  const { tour } = data;
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
    if (!galleryWrapperComp || !galleryWrapperComp.current) {
      return () => {};
    }

    const maxRows = 3;
    const maxColumn = 4;
    const minColumn = 2;
    const updateSize = _.debounce(() => {
      const wrapperWidth = galleryWrapperComp.current.offsetWidth;
      let widths = [];
      for (let i = 0; i < maxRows; i++) {
        const randomColumns = Math.floor(Math.random() * (maxColumn - minColumn + 1) + minColumn);
        const minWidth = (wrapperWidth * 0.5) / randomColumns;
        const maxWidth = (wrapperWidth * 1.5) / randomColumns;
        const rowWidths = [];
        for (let j = 0; j < randomColumns; j++) {
          if (j === randomColumns - 1) {
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
  }, [galleryWrapperComp]);

  return (
    <Layout noHeader>
      <SEO title={tourDetails.name} />

      <SmallScreen>
        <Title>{tourDetails.name}</Title>
        <SubTitle>
          Day Trips
          <RatingStars rate={5} style={{ verticalAlign: 'middle' }} />
        </SubTitle>
        <SubTitle>
          Transportation:
          {tourDetails.transportation}
        </SubTitle>
        <br />
      </SmallScreen>

      {loading && <Spinner />}

      <GalleryWrapper ref={galleryWrapperComp}>
        {tourDetails.pictures && (
          <Gallery
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
          <RatingStars rate={5} />
        </SubTitle>
        <SubTitle>
          Transportation:
          {tourDetails.transportation}
        </SubTitle>
      </BigScreen>

      <SectionTitle>{tourDetails.location}</SectionTitle>
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
  }
`;
