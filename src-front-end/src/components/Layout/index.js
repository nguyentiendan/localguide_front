import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';

import { AuthProvider } from '../../utils/useAuth';
import GlobalStyle from '../../styles/GlobalStyle';
import breakpoints from '../../styles/breakpoints';
import Header from './Header';
import NavigationMenu from './NavigationMenu';
import { smallScreenCss } from '../../styles/responsive-css';

const DefaultMainContent = styled.main`
  margin: 0 auto;
  max-width: ${breakpoints.lg};
  padding: 0 1rem 2rem;

  ${smallScreenCss(`
    padding-bottom: 72px;
  `)}
`;

const Layout = ({ mainContent: MainContent, title, subTitle, children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <AuthProvider>
      <GlobalStyle />
      <Header
        siteTitle={data.site.siteMetadata.title}
        title={title}
        subTitle={subTitle}
        wrapper={MainContent}
      />
      <MainContent>{children}</MainContent>
      <NavigationMenu />
    </AuthProvider>
  );
};

Layout.propTypes = {
  mainContent: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({})]),
  title: PropTypes.string,
  subTitle: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Layout.defaultProps = {
  mainContent: DefaultMainContent,
  title: null,
  subTitle: null,
};

export default Layout;
