import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from '../../styles/colors';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  width: 400px;
  overflow: hidden;
`;

const Title = styled.h3`
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const SubTitle = styled.h5`
  color: ${colors.grey[60]};
  font-weight: normal;
`;

const Picture = styled.img`
  width: 400px;
  height: 200px;
  border-radius: 6px;
  object-fit: cover;
  object-position: center;
  margin-bottom: 0.75rem;
`;

const BlogListItem = ({ className, name, description, picture }) => (
  <Wrapper className={className}>
    <Picture src={picture} />
    <Title>{name}</Title>
    <SubTitle>{description}</SubTitle>
  </Wrapper>
);

BlogListItem.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
};

BlogListItem.defaultProps = {
  className: '',
};

export default BlogListItem;
