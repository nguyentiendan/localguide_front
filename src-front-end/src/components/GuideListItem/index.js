import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'gatsby';
import Card from '../Card/Card.js';
import CardBody from '../Card/CardBody.js';
import RatingStars from '../RatingStars';
import defaultAvatar from '../../assets/img/avatar-default.jpg';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  //align-items: center;
  position: relative;
  width: 300px;
  text-align: center;
`;

const Title = styled.h3`
  margin-bottom: 0.5rem;
  font-weight: 600;
  font-size: 14px;
`;

const SubTitle = styled.h5`
  font-weight: normal;
`;

const Avatar = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  margin-bottom: 0.25rem;
  //align-items: center;
`;

const Description = styled.div`
  width: 300px;
  height: 70px;
  color: #635e69;
  font-weight: normal;
  font-size: 14px;
  text-align: left;
`;
const GuideListItem = ({ className, name, level, intro, avatar, uid, id }) => (
  <Wrapper className={className}>
    <Link to={`/guide?uid=${uid}&id=${id}`}>
      <Card plain>
        <div>
          <Avatar src={avatar || defaultAvatar} />
        </div>

        <Title>{name}</Title>
        <RatingStars rate={4.5} style={{ verticalAlign: 'text-bottom' }} />

        <CardBody style={{ paddingLeft: '5px', paddingRight: '5px' }}>
          <Description>
            {intro || 'You can write here details about one of your team members.'}
          </Description>
        </CardBody>
      </Card>
    </Link>
  </Wrapper>
);

GuideListItem.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  level: PropTypes.number,
  avatar: PropTypes.string,
};

GuideListItem.defaultProps = {
  className: '',
  name: '',
  level: 0,
  avatar: '',
};

export default GuideListItem;
