import React from 'react';
import styled from 'styled-components';
import { Divider, Row, Col, Form, Input, Button, Table, Tag, Space, Badge } from 'antd';
import moment from 'moment';
import colors from '../../../styles/colors'

const Wrapper = styled.div``;
const FilterWrapper = styled.div`
  label {
    width: 75px;
  }
`;
const ListWrapper = styled.div`
`;
const TourTitle = styled.span`
  color: ${colors.blue[50]};
`;

const STATUS = {
  APPROVED: 'APPROVED',
  WAITING_FOR_APPROVAL: 'WAITING_FOR_APPROVAL',
  DELETED: 'DELETED'
}

const data = [
  {
    key: '1',
    name: 'Tokyo city tour',
    feedback: 0,
    price: 1200,
    duration: 2,
    pax: 1,
    updatedDate: new Date(2020, 8, 8),
    status: STATUS.APPROVED,
  },
  {
    key: '2',
    name: 'Osaka city tour',
    feedback: 5,
    price: 200,
    duration: 1,
    pax: 1,
    updatedDate: new Date(2020, 8, 20),
    status: STATUS.WAITING_FOR_APPROVAL,
  },
  {
    key: '3',
    name: 'Nagoya city tour',
    feedback: 0,
    price: 100,
    duration: 1,
    pax: 1,
    updatedDate: new Date(2020, 8, 10),
    status: STATUS.DELETED,
  },
];

const columns = [
  {
    title: 'Tour name',
    dataIndex: 'name',
    key: 'name',
    render: (name, tour) => (
      <Badge count={tour.feedback} offset={[15, 0]}>
        <TourTitle>{name}</TourTitle>
      </Badge>
    ),
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Duration',
    dataIndex: 'duration',
    key: 'duration',
  },
  {
    title: 'Pax',
    key: 'pax',
    dataIndex: 'pax'
  },
  {
    title: 'Updated Date',
    key: 'updatedDate',
    render: (updatedDate, tour) => (
      moment(tour.updatedDate).format('YYYY-MM-DD')
    ),
  },
  {
    title: 'Status',
    key: 'status',
    render: (status, tour) => (
      <Space size="middle">
        {tour.status === STATUS.APPROVED && (<Tag color="success">APPROVED</Tag>)}
        {tour.status === STATUS.WAITING_FOR_APPROVAL && (<Tag color="warning">WAITING FOR APPROVAL</Tag>)}
        {tour.status === STATUS.DELETED && (<Tag color="error">DELETED</Tag>)}
      </Space>
    ),
  },
];

function Tours() {
  return (
    <Wrapper>
      <FilterWrapper>
        <Divider orientation="left">Filter</Divider>
        <Row gutter={32}>
          <Col span={8}>
            <Form.Item
              label="Country"
              name="country"
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="City"
              name="city"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={8}>
            <Form.Item
              label="Price"
              name="price"
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Pax"
              name="pax"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={8}>
            <Form.Item
              label="Status"
              name="status"
            >
              <Input />
            </Form.Item>
            <Form.Item
              style={{ textAlign: 'right' }}
            >
              <Button type="primary" style={{width: 150}}>Apply</Button>
            </Form.Item>
          </Col>
        </Row>
      </FilterWrapper>
      <br/>
      <ListWrapper>
        <Divider orientation="left">Tour List</Divider>
        <Table columns={columns} dataSource={data} />
      </ListWrapper>
    </Wrapper>
  )
}

export default Tours;