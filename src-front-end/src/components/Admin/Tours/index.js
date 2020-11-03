import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Divider, Row, Col, Form, Input, Button, Table, Tag, Space, Badge } from 'antd';
import moment from 'moment';
import colors from '../../../styles/colors';
import * as API from '../../../apis';
import { getUserProfile } from '../../../utils/auth';

const Wrapper = styled.div``;
const FilterWrapper = styled(Form)`
  label {
    width: 75px;
  }
`;
const ListWrapper = styled.div``;
const TourTitle = styled.span`
  color: ${colors.blue[50]};
`;

const STATUS = {
  APPROVED: 'APPROVED',
  WAITING_FOR_APPROVAL: 'WAITING_FOR_APPROVAL',
  DELETED: 'DELETED',
};

const columns = [
  {
    title: 'Tour name',
    dataIndex: 'Name',
    key: 'Name',
    render: (name, tour) => (
      <Badge count={tour.feedback} offset={[15, 0]}>
        <TourTitle>{name}</TourTitle>
      </Badge>
    ),
  },
  {
    title: 'Price',
    dataIndex: 'Price',
    key: 'Price',
  },
  {
    title: 'Duration',
    dataIndex: 'Duration',
    key: 'Duration',
  },
  {
    title: 'Pax',
    key: 'MinPax',
    dataIndex: 'MinPax',
  },
  {
    title: 'Updated Date',
    key: 'UpdatedAt',
    render: (updatedDate, tour) => moment(tour.UpdatedAt).format('YYYY-MM-DD'),
  },
  {
    title: 'Status',
    key: 'Status',
    render: (status, tour) => (
      <Space size="middle">
        {tour.status === STATUS.APPROVED && <Tag color="success">APPROVED</Tag>}
        {tour.status === STATUS.WAITING_FOR_APPROVAL && (
          <Tag color="warning">WAITING FOR APPROVAL</Tag>
        )}
        {tour.status === STATUS.DELETED && <Tag color="error">DELETED</Tag>}
      </Space>
    ),
  },
];

function Tours() {
  const [data, setData] = useState([]);
  const [loadingAllTour, setLoadingAllTour] = useState(false);
  const user = getUserProfile();
  useEffect(() => {
    const getAllTours = async () => {
      try {
        setLoadingAllTour(true);
        const res = await API.adminGetAllTour({ uid: user.uid, token: user.token });
        setData(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingAllTour(false);
      }
    };
    getAllTours();
  }, []);
  return (
    <Wrapper>
      <FilterWrapper>
        <Divider orientation="left">Filter</Divider>
        <Row gutter={32}>
          <Col span={8}>
            <Form.Item label="Country" name="country">
              <Input />
            </Form.Item>

            <Form.Item label="City" name="city">
              <Input />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={8}>
            <Form.Item label="Price" name="price">
              <Input />
            </Form.Item>

            <Form.Item label="Pax" name="pax">
              <Input />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={8}>
            <Form.Item label="Status" name="status">
              <Input />
            </Form.Item>
            <Form.Item style={{ textAlign: 'right' }}>
              <Button type="primary" style={{ width: 230 }}>
                Apply
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </FilterWrapper>
      <br />
      <ListWrapper>
        <Divider orientation="left">Tour List</Divider>
        <Table columns={columns} dataSource={data} loading={loadingAllTour} rowKey="Name" />
      </ListWrapper>
    </Wrapper>
  );
}

export default Tours;
