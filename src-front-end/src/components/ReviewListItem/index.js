import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import { Avatar } from 'antd';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ForumIcon from '@material-ui/icons/Forum';
import colors from '../../assets/styles/colors';


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  //width: 400px;
  width: 310px;
  overflow: hidden;
`;

const ContentWrapper = styled.div``;

const Title = styled.h4`
  margin-bottom: 0.25rem;
  font-weight: 600;
  line-height: 1.5em;
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

const Content = styled.div`
  padding-top: 1.5em;
  min-height: 110px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ReviewIcons = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 15px;
`;

const Num = styled.div`
  width: 2em;
`;

// fix moment constructor error. moment construction falls back to js Date()
moment.createFromInputFallback = function(config) {
  // unreliable string magic, or
  config._d = new Date(config._i);
};

const ReviewListItem = ({ className, title, avatar, date, content, favorite, forum }) => (
  <Wrapper className={className}>
    <ContentWrapper>
      <Title>{title}</Title>
      <Content>{content}</Content>
      <Delimiter className="delimiter" />
      <Bottom>
        {date}
        <ReviewIcons>
          <FavoriteBorderIcon />
          <Num>{favorite}</Num>
          <ForumIcon />
          <Num>{forum}</Num>
        </ReviewIcons>
      </Bottom>
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
