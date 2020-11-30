/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { navigate, Link } from 'gatsby';
import { Card, Tag, Badge, Popconfirm, Tooltip } from 'antd';
import { DeleteOutlined, StarFilled, MessageOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

import ModalFeedback from '../../Feedback/ModalFeedback';
import { getUserProfile } from '../../../utils/auth';
import * as API from '../../../apis';
import backpackers from '../../../../static/mocks/blogs/backpackers.png';

const CardWrapper = styled(Card)`
  .totalReview{
    display: flex;
    justify-content: space-between;
  };
  && {
    .ant-card-actions {
      border-radius: 0px 0px 10px 10px;
    }
  }
`;

const Image = styled.img`
  height: 200px;
  width: auto;
  object-fit: cover;
  border-radius: 10px 10px 0px 0px;
  margin-bottom: 0px;
`;

const CardDesc = styled.div`
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 1;
-webkit-box-orient: vertical;
`

const TourCard = ({
  title,
  coverImg,
  day,
  id,
  status,
  city,
  country,
  uid,
  handleDeleteTour,
  shortDesc,
  totalReview,
}) => {
  const [showModal, setShowModal] = useState(false);
  const user = getUserProfile();

  useEffect(() => {
    const fetchAllFeedback = async () => {
      if (showModal) {
        const res = await API.getAllFeedbackOfGuide({ uid, id });
        console.log(res);
      }
    };
    fetchAllFeedback();
  }, [showModal]);

  const HandleDescription = () => {
    switch (status) {
      case 0:
        return <Tag color="warning" style={{ margin: 0 }}>WAITING FOR APPROVAL</Tag>;
      case 1:
        return <Tag color="success" style={{ margin: 0 }}>APPROVED</Tag>;
      case 2:
        return <Tag color="error" style={{ margin: 0 }}>DELETED</Tag>;
      default:
        return null;
    }
  };
  return (
    <Badge style={{ width: '100%' }}>
      <CardWrapper
        hoverable
        style={{ width: '100%', cursor: 'pointer', minWidth: 300, minHeight: 400, borderRadius: 10 }}
        cover={<Image src={coverImg || backpackers} onClick={() => navigate(`/edit-tour?q=${id}`)} />}
        actions={
          status
            ? [
              <MessageOutlined key="feedback" onClick={() => totalReview && setShowModal(true)} style={{ color: !totalReview && '#DDD' }} />,
            ]
            : [
              <MessageOutlined key="feedback" onClick={() => totalReview && setShowModal(true)} style={{ color: !totalReview && '#DDD' }} />,
              <Popconfirm
                title="Are you sure to delete this tour?"
                onConfirm={() => handleDeleteTour({ uid, id })}
                okText="Yes"
                cancelText="No"
              >
                <DeleteOutlined key="delete" />
              </Popconfirm>,
            ]
        }
      >
        <Link to={`/edit-tour?q=${id}`}>
          <Card.Meta
            title={<b>{title}</b>}
            description={
              <div style={{ lineHeight: '30px' }}>
                <Tooltip placement="left" title={shortDesc}>
                  <CardDesc>{shortDesc}</CardDesc>
                </Tooltip>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>
                    {country}/{city}
                  </span>
                  <span>{day} days</span>
                </div>
                <div className='totalReview'>
                  <span><StarFilled /> 5/5</span>
                  {/* <MessageOutlined key="feedback" onClick={() => setShowModal(true)} /> */}
                  <HandleDescription />
                </div>
              </div>
            }
          />
        </Link>
      </CardWrapper>
      <ModalFeedback showModal={showModal} setShowModal={setShowModal} user={user} id={id} />
    </Badge>
  );
};

TourCard.propTypes = {
  title: PropTypes.string.isRequired,
  // avatarImg: PropTypes.string,
  coverImg: PropTypes.string,
  day: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  status: PropTypes.number.isRequired,
  uid: PropTypes.string.isRequired,
  handleDeleteTour: PropTypes.func,
  city: PropTypes.string,
  country: PropTypes.string,
  shortDesc: PropTypes.string,
  totalReview: PropTypes.number,
};

TourCard.defaultProps = {
  // avatarImg: '',
  coverImg: '',
  city: '',
  country: '',
  shortDesc: '',
  totalReview: 0,
  handleDeleteTour: () => { },
};

export default TourCard;
