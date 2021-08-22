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
  padding: 25px;
  background-color: #fff;
  box-shadow: 0px 8px 16px -2px rgba(10, 10, 10, 0.1), 0px 0px 0px 1px rgba(10, 10, 10, 0.02);
`;

const ContentWrapper = styled.div``;

const Title = styled.h4`
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

// fix moment constructor error. moment construction falls back to js Date()
moment.createFromInputFallback = function(config) {
  // unreliable string magic, or
  config._d = new Date(config._i);
};

const ReviewListItem = ({ className, title, avatar, date, content }) => (
  <Wrapper className={className}>
    {/* }<AvatarWrapper src={avatar} icon={<UserOutlined />} size="large" style={{width:90,height:35}} />{ */}
    <ContentWrapper>
      <Title>{title}</Title>
      {/* }<SubTitle>{moment(date).fromNow()}</SubTitle>{ */}
      <Content>{content}</Content>
      {<Delimiter className="delimiter" />}
      {date}
    </ContentWrapper>
  </Wrapper>
);

ReviewListItem.propTypes = {
  className: PropTypes.string,
  user: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  date: PropTypes.string,
  content: PropTypes.string.isRequired,
};

ReviewListItem.defaultProps = {
  className: '',
  date: '',
};

export default ReviewListItem;
