import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import _ from 'lodash';

import { Spin } from 'antd';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import SectionHeader from '../components/SectionHeader';
import TourGuideListItem from '../components/TourGuideListItem';
import DestinationListItem from '../components/DestinationListItem';
import breakpoints from '../assets/styles/breakpoints';
import BlogListItem from '../components/BlogListItem';
import TourListItem from '../components/TourListItem';
import RatingStars from '../components/RatingStars';
import CommentListItem from '../components/CommentListItem';
import JoinUsSection from '../components/JoinUsSection';
import { smallScreenCss } from '../assets/styles/responsive-css';

import * as API from '../apis';

const ListWrapper = styled.div`
  max-width: ${breakpoints.lg};
  overflow: auto;

  .comment:last-child .delimiter {
    display: none;
  }
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

const Gap = styled.div`
  display: inline-block;
  width: 15px;
`;

const ExploreTourWrapper = styled.div`
  max-height: 400px;
  position: relative;
  margin: 2rem -1rem;
`;

function IndexPage({ data }) {
  const {
    tourGuideNodes = { nodes: [] },
    destinationNodes = { nodes: [] },
    tourNodes = { nodes: [] },
    blogNodes = { nodes: [] },
    reviews = { comments: [] },
    exploreTourImg,
  } = data;
  const [loadingTours, setLoadingTours] = useState(false);
  const [loadingTourGuides, setLoadingTourGuides] = useState(false);
  const [tourGuides, setTourGuides] = useState(_.map(tourGuideNodes.nodes, node => node));
  const [tours, setTours] = useState(_.map(tourNodes.nodes, node => node));
  const destinations = _.map(destinationNodes.nodes, node => node);
  const blogs = _.map(blogNodes.nodes, node => node);
  /*
  useEffect(() => {
    const refreshAllTours = async () => {
      try {
        setLoadingTours(true);
        const { data: allTours } = await API.getAllTours();
        setTours(allTours);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingTours(false);
      }
    };
    const refreshAllTourGuides = async () => {
      try {
        setLoadingTourGuides(true);
        const { data: allTourGuides } = await API.getAllTourGuides();
        setTourGuides(allTourGuides);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingTourGuides(false);
      }
    };

    refreshAllTours();
    refreshAllTourGuides();
  }, []);
  console.log({ destinations });
  */
  return (
    <Layout>
      <SEO title="Home" />
      <SectionHeader title="Tour Guide" subTitle="View all" />
      <Spin spinning={loadingTourGuides}>
        <ListWrapper>
          <ListContainer>
            {_.map(tourGuides, tourGuide => {
              return (
                <Link to={`/guide?uid=${tourGuide.uid}&id=${tourGuide.id}`}>
                  <TourGuideListItem
                    key={tourGuide.id}
                    name={tourGuide.fullname}
                    level={tourGuide.level}
                    avatar={tourGuide.avatar}
                    className="tour-guide"
                  />
                </Link>
              );
            })}
          </ListContainer>
        </ListWrapper>
      </Spin>

      <SectionHeader title="Destinations we love" subTitle="View all" />
      <ListWrapper>
        <ListContainer>
          {_.map(destinations, destination => (
            <DestinationListItem
              key={destination.id}
              name={destination.name}
              location={destination.location}
              picture={destination.picture}
              className="destination"
            />
          ))}
        </ListContainer>
      </ListWrapper>

      <SectionHeader title="Popular Tour" subTitle="View all" />
      <Spin spinning={loadingTours}>
        <ListWrapper>
          <ListContainer>
            {_.map(tours, tour => (
              <TourListItem
                key={tour.id}
                id={tour.id}
                uid={tour.uid}
                cover={tour.cover}
                name={tour.name}
                country={tour.country}
                city={tour.city}
                className="tour"
              />
            ))}
          </ListContainer>
        </ListWrapper>
      </Spin>

      <SectionHeader title="Blog" subTitle="View all" />
      <ListWrapper>
        <ListContainer>
          {_.map(blogs, blog => (
            <BlogListItem
              key={blog.id}
              name={blog.name}
              description={blog.description}
              picture={blog.picture}
              className="blog"
            />
          ))}
        </ListContainer>
      </ListWrapper>

      <SectionHeader
        title={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <>
            {`Reviews (${reviews.total})`}
            <Gap />
            <RatingStars rate={reviews.rate} />
          </>
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

      <ExploreTourWrapper>
        <Img fluid={exploreTourImg.childImageSharp.fluid} style={{ position: 'initial' }} />
      </ExploreTourWrapper>

      <JoinUsSection />
    </Layout>
  );
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    tourGuideNodes: PropTypes.shape({
      nodes: PropTypes.arrayOf(PropTypes.shape({})),
    }),
    destinationNodes: PropTypes.shape({
      nodes: PropTypes.arrayOf(PropTypes.shape({})),
    }),
    tourNodes: PropTypes.shape({
      nodes: PropTypes.arrayOf(PropTypes.shape({})),
    }),
    blogNodes: PropTypes.shape({
      nodes: PropTypes.arrayOf(PropTypes.shape({})),
    }),
    reviews: PropTypes.shape({
      rate: PropTypes.number,
      total: PropTypes.number,
      comments: PropTypes.arrayOf(PropTypes.shape({})),
    }),
    exploreTourImg: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fluid: PropTypes.shape({}),
      }),
    }),
  }).isRequired,
};

export default IndexPage;

/*export const pageQuery = graphql`
  query {
    tourGuideNodes: allTourGuide {
      nodes {
        fullname
        avatar
        level
        id
      }
    }
    destinationNodes: allDestination {
      nodes {
        name
        location
        picture
        id
      }
    }
    tourNodes: allTour {
      nodes {
        name
        country
        city
        cover
        id
        uid
        rawID
      }
    }
    blogNodes: allBlog {
      nodes {
        name
        description
        picture
        id
      }
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
    exploreTourImg: file(relativePath: { eq: "explore-tour.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1600) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
*/
