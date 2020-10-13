import React, {useState} from 'react';
import styled from 'styled-components';
import {navigate} from 'gatsby';
import {Modal, Avatar, Card, Row, Col, Button, Tag, Badge} from 'antd';
import {PlusOutlined, DeleteOutlined, EditOutlined, MessageOutlined} from '@ant-design/icons';
import FeedbackPanel from '../FeedbackPanel';

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

function TourCard({title, badge, avatarImg, coverImg}) {
  const [isShowModal, showModal] = useState(false);
  return (
    <Badge count={badge}>
      <Card
        hoverable
        style={{width: '100%'}}
        cover={<Image src={coverImg}/>}
        actions={[
          <MessageOutlined key="feedback" onClick={() => showModal(true)}/>,
          <EditOutlined key="edit"/>,
          <DeleteOutlined key="delete"/>,
        ]}
      >
        <Card.Meta
          avatar={<Avatar src={avatarImg}/>}
          title={title}
          description={<><Tag color="warning">WAITING FOR APPROVAL</Tag><br/> 5 days</>}
        />
      </Card>
      <Modal
        title="Feedback"
        visible={isShowModal}
        onCancel={() => showModal(false)}
        footer={null}
      >
        <FeedbackPanel/>
      </Modal>
    </Badge>
  );
}

function Tours() {
  return (
    <Wrapper>
      <FilterWrapper>
        <br/>
        <Button icon={<PlusOutlined/>} type="primary" size="large" onClick={() => navigate('/create-tour')}>
          Create Tour
        </Button>
        <br/>
        <br/>
        <br/>
        <Row gutter={32}>
          <Col span={8}>
            <TourCard title="Great Food Tour in Ha Noi" badge={5}
                      avatarImg={require('../../../../static/mocks/avatars/avatar-1.jpg')}
                      coverImg={require('../../../../static/mocks/tours/tour-1.jpg')}/>
          </Col>
          <Col span={8}>
            <TourCard title="Great Tour in Ha Long"
                      avatarImg={require('../../../../static/mocks/avatars/avatar-1.jpg')}
                      coverImg={require('../../../../static/mocks/tours/tour-2.jpg')}/>
          </Col>
          <Col span={8}>
            <TourCard title="Great Food Tour in Ha Noi"
                      avatarImg={require('../../../../static/mocks/avatars/avatar-1.jpg')}
                      coverImg={require('../../../../static/mocks/tours/tour-3.jpg')}/>
          </Col>
        </Row>
      </FilterWrapper>
      <br/>
    </Wrapper>
  )
}

export default Tours;
