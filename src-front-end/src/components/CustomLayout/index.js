import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';
import { AuthProvider } from '../../utils/useAuth';
import GlobalStyle from '../../assets/styles/GlobalStyle';
import Header from '../Header/Header.js';
import HeaderLinks from '../Header/HeaderLinks.js';
import 'antd/dist/antd.less';

const CustomLayout = ({ children, noLogin, scrollHeight, textColor }) => {

  return (
    <AuthProvider>
      <GlobalStyle />
      <Header
        link="/"
        absolute
        color="transparent"
        textColor={textColor}
        brand="Localguide Pal"
        rightLinks={!noLogin && <HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: scrollHeight,
          color: 'white',
        }}
      />
      {children}
    </AuthProvider>
  );
};

CustomLayout.propTypes = {
  children: PropTypes.node.isRequired,
  noLogin: PropTypes.bool,
  scrollHeight: PropTypes.number,
  textColor: PropTypes.string,
};

CustomLayout.defaultProps = {
  noLogin: false,
  scrollHeight: 10,
  textColor: '',
};

export default CustomLayout;
