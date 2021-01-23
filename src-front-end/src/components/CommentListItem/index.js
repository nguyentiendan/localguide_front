import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import colors from '../../assets/styles/colors';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  position: relative;
  width: 100%;
`;

const ContentWrapper = styled.div``;

const Title = styled.h3`
  margin-bottom: 0.25rem;
  font-weight: 600;
`;

const SubTitle = styled.h5`
  color: ${colors.grey[60]};
  font-weight: normal;
  margin-bottom: 0.5rem;
`;

const AvatarWrapper = styled(Avatar)`
  && {
    margin-right: 1.5rem;
  }
`;

const Delimiter = styled.div`
  margin: 1.25rem 0;
  border-bottom: 1px solid ${colors.grey[30]};
  
`;

const Content = styled.div``;

const CommentListItem = ({ className, user, avatar, date, content }) => (
  <Wrapper className={className}>
    <AvatarWrapper src={avatar} icon={<UserOutlined />} size="large" />
    <ContentWrapper>
      <Title>{user}</Title>
      <SubTitle>{moment(date).fromNow()}</SubTitle>
      <Content>{content}</Content>
      <Delimiter className="delimiter" />
    </ContentWrapper>
  </Wrapper>
);

CommentListItem.propTypes = {
  className: PropTypes.string,
  user: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  date: PropTypes.string,
  content: PropTypes.string.isRequired,
};

CommentListItem.defaultProps = {
  className: '',
  date: '',
};

export default CommentListItem;
