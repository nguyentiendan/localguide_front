/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { navigate, Link } from 'gatsby';
import { Card, Tag, Badge, Popconfirm } from 'antd';
import { DeleteOutlined, EditOutlined, MessageOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

import ModalFeedback from "../../Feedback/ModalFeedback";
import { getUserProfile } from '../../../utils/auth';
import * as API from '../../../apis';

const Image = styled.img`
  height: 300px;
  width: auto;
  object-fit: cover;
`;

const TourCard = ({ title, coverImg, day, id, status, city, country, uid, handleDeleteTour }) => {
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
        return <Tag color="warning">WAITING FOR APPROVAL</Tag>;
      case 1:
        return <Tag color="success">APPROVED</Tag>;
      case 2:
        return <Tag color="error">DELETED</Tag>;
      default:
        return null;
    }
  };
  return (
    <Badge style={{ width: '100%' }}>
      <Card
        hoverable
        style={{ width: '100%', cursor: 'pointer', minWidth: 300, minHeight: 496 }}
        cover={<Image src={coverImg} onClick={() => navigate(`/edit-tour?q=${id}`)} />}
        actions={
          status
            ? [
              <MessageOutlined key="feedback" onClick={() => setShowModal(true)} />,
              <EditOutlined key="edit" onClick={() => navigate(`/edit-tour?q=${id}`)} />,
            ]
            : [
              <MessageOutlined key="feedback" onClick={() => setShowModal(true)} />,
              <EditOutlined key="edit" onClick={() => navigate(`/edit-tour?q=${id}`)} />,
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
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{country}/{city}</span>
                  <span>{day} days</span>
                </div>
                <div>
                  <HandleDescription />
                </div>
              </div>
            }
          />
        </Link>
      </Card>
      <ModalFeedback
        showModal={showModal}
        setShowModal={setShowModal}
        user={user}
        id={id}
      />
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
};

TourCard.defaultProps = {
  // avatarImg: '',
  coverImg: '',
  city: '',
  country: '',
  handleDeleteTour: () => { },
};

export default TourCard;
