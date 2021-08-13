import { slugify } from './src/utils/slug';
import * as API from './src/apis';

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/app/)) {
    page.matchPath = `/app/*`;

    // Update the page.
    createPage(page);
  }
};

/* async function createTourGuideNodes({ createNode, createNodeId, createContentDigest }) {
  try {
    const { data: allTourGuides } = await API.getAllTourGuides();
    allTourGuides.forEach(tourGuide => {
      const nodeContent = JSON.stringify(tourGuide);
      const nodeMeta = {
        id: createNodeId(`tour_guide-${tourGuide.id}`),
        rawID: tourGuide.id,
        parent: null,
        children: [],
        slug: slugify(tourGuide.id),
        internal: {
          type: 'TourGuide',
          mediaType: 'application/json',
          content: nodeContent,
          contentDigest: createContentDigest(tourGuide),
        },
      };
      const node = Object.assign({}, tourGuide, nodeMeta);

      createNode(node);
    });
  } catch (error) {
    console.error(error);
  }
}
*/

/* async function createDestinationNodes({ createNode, createNodeId, createContentDigest }) {
  try {
    const allDestinations = await API.getAllDestinations();
    allDestinations.forEach(destination => {
      const nodeContent = JSON.stringify(destination);
      const nodeMeta = {
        id: createNodeId(`destination-${destination.id}`),
        rawID: destination.id,
        parent: null,
        children: [],
        slug: slugify(destination.id),
        internal: {
          type: 'Destination',
          mediaType: 'application/json',
          content: nodeContent,
          contentDigest: createContentDigest(destination),
        },
      };
      const node = Object.assign({}, destination, nodeMeta);

      createNode(node);
    });
  } catch (error) {
    console.error(error);
  }
}
*/
/*
async function createBlogNodes({ createNode, createNodeId, createContentDigest }) {
  try {
    const allBlogs = await API.getAllBlogs();
    allBlogs.forEach(blog => {
      const nodeContent = JSON.stringify(blog);
      const nodeMeta = {
        id: createNodeId(`blog-${blog.id}`),
        rawID: blog.id,
        parent: null,
        children: [],
        slug: slugify(blog.id),
        internal: {
          type: 'Blog',
          mediaType: 'application/json',
          content: nodeContent,
          contentDigest: createContentDigest(blog),
        },
      };
      const node = Object.assign({}, blog, nodeMeta);

      createNode(node);
    });
  } catch (error) {
    console.error(error);
  }
}
*/
/* async function createTourNodes({ createNode, createNodeId, createContentDigest }) {
  try {
    const { data: allTours } = await API.getAllTours();
    console.log(allTours);
    allTours.forEach(tour => {
      const nodeContent = JSON.stringify(tour);
      const nodeMeta = {
        id: createNodeId(`tour-${tour.id}`),
        rawID: tour.id,
        parent: null,
        children: [],
        slug: slugify(tour.id),
        internal: {
          type: 'Tour',
          mediaType: 'application/json',
          content: nodeContent,
          contentDigest: createContentDigest(tour),
        },
      };
      const node = Object.assign({}, tour, nodeMeta);

      createNode(node);
    });
  } catch (error) {
    console.error(error);
  }
} */

/*
async function createReviewNodes({ createNode, createNodeId, createContentDigest }) {
  try {
    const reviews = await API.getAllReviews();
    const nodeContent = JSON.stringify(reviews);
    const nodeMeta = {
      id: createNodeId(`reviews`),
      rawID: 'reviews',
      parent: null,
      children: [],
      internal: {
        type: 'Reviews',
        mediaType: 'application/json',
        content: nodeContent,
        contentDigest: createContentDigest(reviews),
      },
    };
    const node = Object.assign({}, reviews, nodeMeta);

    createNode(node);
  } catch (error) {
    console.error(error);
  }
}
*/
/*
exports.sourceNodes = async function sourceNodes({ actions, createNodeId, createContentDigest }) {
  const { createNode } = actions;

  await Promise.all([
    createTourGuideNodes({ createNode, createNodeId, createContentDigest }),
    createDestinationNodes({ createNode, createNodeId, createContentDigest }),
    createTourNodes({ createNode, createNodeId, createContentDigest }),
    createBlogNodes({ createNode, createNodeId, createContentDigest }),
    createReviewNodes({ createNode, createNodeId, createContentDigest }),
  ]);
};
*/
/*
exports.createPages = async function createPages({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allTour {
        edges {
          node {
            rawID
            slug
            uid
          }
        }
      }
    }
  `);

  data.allTour.edges.forEach(edge => {
    const { slug, rawID, uid } = edge.node;

    actions.createPage({
      path: `tour/${uid}/${rawID}`,
      component: require.resolve('./src/templates/TourPage.js'),
      context: { slug, id: rawID },
    });
  });

  actions.createPage({
    path: `tour`,
    matchPath: `tour/:uid/:id`,
    component: require.resolve('./src/templates/TourPage.js'),
    context: { id: -999 },
  });

  actions.createPage({
    path: `adminReview`,
    matchPath: `adminReview/:uid/:id`,
    component: require.resolve('./src/templates/AdminTourPage.js'),
    context: { id: -999 },
  });
};
*/
