import ReactGA from 'react-ga';

/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

export const onClientEntry = () => {
  // ReactGA.initialize(process.env.GATSBY_GOOGLE_ANALYTICS_TRACKING_ID);
};

export const onRouteUpdate = ({ location }) => {
  ReactGA.pageview(location.pathname + location.search);
};
