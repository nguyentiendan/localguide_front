import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { navigate, Link } from 'gatsby';
import { Modal, Avatar, Card, Row, Col, Button, Tag, Badge, Spin } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined, MessageOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

import FeedbackPanel from '../FeedbackPanel';
import * as API from '../../../apis';
import { getUserProfile } from '../../../utils/auth';

const Wrapper = styled.div``;
const FilterWrapper = styled.div`
  label {
    width: 75px;
  }
`;

const Image = styled.img`
  height: 300px;
  width: auto;
  object-fit: cover;
`;

const TourCard = ({ title, avatarImg, coverImg, day, id, status }) => {
  const [isShowModal, showModal] = useState(false);
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
        style={{ width: '100%', cursor: 'pointer', minWidth: 300 }}
        cover={<Image src={coverImg} onClick={() => navigate(`/edit-tour?q=${id}`)} />}
        actions={[
          <MessageOutlined key="feedback" onClick={() => showModal(true)} />,
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
      <Modal title="Feedback" visible={isShowModal} onCancel={() => showModal(false)} footer={null}>
        <FeedbackPanel />
      </Modal>
    </Badge>
  );
};

TourCard.propTypes = {
  title: PropTypes.string.isRequired,
  avatarImg: PropTypes.string,
  coverImg: PropTypes.string,
  day: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  status: PropTypes.number.isRequired,
};

TourCard.defaultProps = {
  avatarImg: '',
  coverImg: '',
};

function Tours() {
  const [allTours, setAllTours] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = getUserProfile();
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { data: guideAllTours } = await API.getGuideAllTours({ uid: user.uid });
      setAllTours(guideAllTours);
      setLoading(false);
    }
    fetchData();
  }, [setAllTours]);

  return (
    <Wrapper>
      <FilterWrapper>
        <br />
        <Button
          icon={<PlusOutlined />}
          type="primary"
          size="large"
          onClick={() => navigate('/create-tour')}
        >
          Create Tour
        </Button>
        <br />
        <br />
        <br />
        <Spin spinning={loading}>
          <Row gutter={32}>
            {allTours.map(tour => {
              return (
                <Col span={8} key={tour.ID} style={{ marginBottom: 20 }}>
                  <TourCard
                    id={tour.ID}
                    title={tour.Name}
                    day={tour.Day}
                    avatarImg={tour.AvatarImg}
                    coverImg={tour.CoverImg}
                    status={tour.Status}
                  />
                </Col>
              );
            })}
          </Row>
        </Spin>
      </FilterWrapper>
      <br />
    </Wrapper>
  );
}

export default Tours;
