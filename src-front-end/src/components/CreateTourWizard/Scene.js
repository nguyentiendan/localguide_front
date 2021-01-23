import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { smallScreenCss } from '../../assets/styles/responsive-css';

const Wrapper = styled.div`
  display: flex;
  min-height: 400px;
`;

const LayoutWrapper = styled.div`
  flex: 1;
`;

const ImgWrapper = styled.div`
  flex: 0.5;

  @media (max-width: 780px) {
    flex: 0.4;
  }

  ${smallScreenCss(`
    display: none;
  `)}
`;

const Img = styled.img`
  object-fit: cover;
  height: 100%;
  width: 100%;
  border-radius: 6px;
  max-height: 400px;
`;

const Scene = ({ user, layout: Layout, tourCreationInfo, onUpdate, imgSrc }) => {
  return (
    <Wrapper>
      <LayoutWrapper>
        <Layout user={user} tourCreationInfo={tourCreationInfo} onUpdate={onUpdate} />
      </LayoutWrapper>
      {imgSrc && (
        <ImgWrapper>
          <Img src={imgSrc} alt="image" />
        </ImgWrapper>
      )}
    </Wrapper>
  );
};

Scene.propTypes = {
  user: PropTypes.shape({}).isRequired,
  layout: PropTypes.func.isRequired,
  tourCreationInfo: PropTypes.shape({}),
  onUpdate: PropTypes.func,
  imgSrc: PropTypes.string,
};

Scene.defaultProps = {
  tourCreationInfo: {},
  onUpdate: () => {},
  imgSrc: '',
};

export default Scene;
