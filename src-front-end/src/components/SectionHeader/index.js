import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from '../../styles/colors';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  position: relative;
  margin: 1rem 0 0;
`;

const Title = styled.h2`
  display: flex;
`;

const SubTitle = styled.h5`
  color: ${colors.grey[40]};
  display: flex;
  font-weight: normal;
`;

const SectionHeader = ({ className, title, subTitle, subTitleHref }) => (
  <Wrapper className={className}>
    <Title>{title}</Title>
    {subTitleHref && (
      // TODO should use gatsby link
      <a href={subTitleHref}>
        <SubTitle>{subTitle}</SubTitle>
      </a>
    )}
    {!subTitleHref && <SubTitle>{subTitle}</SubTitle>}
  </Wrapper>
);

SectionHeader.propTypes = {
  className: PropTypes.string,
  title: PropTypes.oneOf([PropTypes.string, PropTypes.node]).isRequired,
  subTitle: PropTypes.string,
  subTitleHref: PropTypes.func,
};

SectionHeader.defaultProps = {
  className: '',
  subTitle: '',
  subTitleHref: null,
};

export default SectionHeader;
