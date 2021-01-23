import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';

import { AuthProvider } from '../../utils/useAuth';
import GlobalStyle from '../../assets/styles/GlobalStyle';
import breakpoints from '../../assets/styles/breakpoints';
import Header from './Header';
import NavigationMenu from './NavigationMenu';
import 'antd/dist/antd.less';

import { bigScreenCss, smallScreenCss } from '../../assets/styles/responsive-css';

const DefaultMainContent = styled.main`
  margin: 0 auto;
  max-width: ${breakpoints.lg};
  padding: 0 1rem 2rem;

  ${smallScreenCss(`
    padding-bottom: 72px;
  `)}

  ${bigScreenCss(`
    padding-top: 48px;
  `)}
`;

const Layout = ({ mainContent: MainContent, title, subTitle, children, noHeader }) => {
  {
    /* const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `); */
  }

  return (
    <AuthProvider>
      <GlobalStyle />
      {!noHeader && (
        <Header
          siteTitle={data.site.siteMetadata.title}
          title={title}
          subTitle={subTitle}
          noHeader={noHeader}
          wrapper={MainContent}
        />
      )}

      <MainContent>{children}</MainContent>
      <NavigationMenu />
    </AuthProvider>
  );
};

Layout.propTypes = {
  mainContent: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({})]),
  title: PropTypes.string,
  subTitle: PropTypes.string,
  noHeader: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Layout.defaultProps = {
  mainContent: DefaultMainContent,
  title: null,
  subTitle: null,
  noHeader: false,
};

export default Layout;
