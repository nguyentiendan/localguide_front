import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import _ from 'lodash';
import queryString from 'query-string';
import { Col, Row, Spin } from 'antd';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/styles';
import { filter } from 'lodash/fp';

import Layout from '../components/CustomLayout';
import SEO from '../components/SEO';
import breakpoints from '../assets/styles/breakpoints';
import Parallax from '../components/Parallax/Parallax';
import Footer from '../components/Footer/Footer';
import styles from '../assets/styles/searchPage';
import GuideSearchPanel from '../components/SearchPanel/GuideSearchPanel';
import TourSearchPanel from '../components/SearchPanel/TourSearchPanel';
import TeamResultSection from '../components/SearchResultSections/TeamResultSection';
import TourResultSection from '../components/SearchResultSections/TourResultSection';
import Card from '../components/Card/Card';

const Title = styled.h3`
  font-size: 24px;
  font-weight: 400;
  margin-top: 30px;
  padding: 0 30px;
`;

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

const useStyles = makeStyles(styles);

// function IndexPage({ location, data }) {
function IndexPage() {
  // const { q } = queryString.parse(location.search);
  // const {
  //   tourGuideNodes = { nodes: [] },
  //   destinationNodes = { nodes: [] },
  //   tourNodes = { nodes: [] },
  //   blogNodes = { nodes: [] },
  //   reviews = { comments: [] },
  //   exploreTourImg,
  // } = data;
  // const tourGuides = _.map(tourGuideNodes.nodes, node => node);
  // const destinations = _.map(destinationNodes.nodes, node => node);
  // const tours = _.map(tourNodes.nodes, node => node);
  // const blogs = _.map(blogNodes.nodes, node => node);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    setLoading(true);
    // fetch data
    setLoading(false);
  });

  return (
    // <Layout title="search" subTitle="265 locations">
    //   <SEO title="Search" />
    //   <SectionHeader title="Search" />
    //   <SearchPanel />
    //   <SectionHeader title="Tour Guide" subTitle="View all" />
    <Layout>
      <SEO title="Search" />
      <Parallax small filter />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <Row>
            <Col span={6}>
              <Card plain style={{ border: '1px solid black' }}>
                <GuideSearchPanel />
              </Card>
              <Card plain style={{ border: '1px solid black' }}>
                <TourSearchPanel />
              </Card>
            </Col>
            <Col span={18}>
              <Title>Search with "Tokyo"</Title>
              <Spin spinning={loading}>
                <div className={classes.container}>
                  <TeamResultSection />
                </div>
              </Spin>
              <Spin spinning={loading}>
                <div className={classes.container}>
                  <TourResultSection />
                </div>
              </Spin>
            </Col>
          </Row>
        </div>
      </div>
      <Footer />
    </Layout>
  );
}

IndexPage.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
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

/* export const pageQuery = graphql`
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
