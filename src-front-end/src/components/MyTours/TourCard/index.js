import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { navigate, Link } from 'gatsby';
import { Modal, Avatar, Card, Tag, Badge } from 'antd';
import { DeleteOutlined, EditOutlined, MessageOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

import * as API from '../../../apis';
import FeedbackPanel from '../Feedback';

const Image = styled.img`
  height: 300px;
  width: auto;
  object-fit: cover;
`;

const TourCard = ({ title, avatarImg, coverImg, day, id, status, uid }) => {
  const [showModal, setShowModal] = useState(false);
  const [loadingCreateFeedback, setLoadingCreateFeedback] = useState(false);

  useEffect(() => {
    const fetchAllFeedback = async () => {
      if (showModal) {
        const res = await API.getAllFeedback({ uid, id });
        console.log(res);
      }
    };
    fetchAllFeedback();
  }, [showModal]);
  const createFeedback = async data => {
    setLoadingCreateFeedback(true);
    await API.createReplyFeedback({ uid, content: data.content, feedbackId: 1 });
    setLoadingCreateFeedback(false);
  };

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
        actions={[
          <MessageOutlined key="feedback" onClick={() => setShowModal(true)} />,
          <EditOutlined key="edit" onClick={() => navigate(`/edit-tour?q=${id}`)} />,
          <DeleteOutlined key="delete" />,
        ]}
      >
        <Link to={`/edit-tour?q=${id}`}>
          <Card.Meta
            avatar={<Avatar src={avatarImg} />}
            title={title}
            description={
              <>
                <HandleDescription />
                {day} days
              </>
            }
          />
        </Link>
      </Card>
      <Modal
        title="Feedback"
        visible={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
      >
        <FeedbackPanel
          createFeedback={createFeedback}
          loadingCreateFeedback={loadingCreateFeedback}
        />
      </Modal>
    </Badge>
  );
};

TourCard.propTypes = {
  title: PropTypes.string.isRequired,
  avatarImg: PropTypes.string,
  coverImg: PropTypes.string,
  day: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  status: PropTypes.number.isRequired,
  uid: PropTypes.string.isRequired,
};

TourCard.defaultProps = {
  avatarImg: '',
  coverImg: '',
};

export default TourCard;
