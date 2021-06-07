import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {Divider, Row, Col, Form, Button, Table, Tag, Space, Badge, Select, Spin, InputNumber,} from 'antd';
import moment from 'moment';
import _ from 'lodash';

import colors from '../../../assets/styles/colors';
import * as API from '../../../apis';
import { getUserProfile } from '../../../utils/auth';

const { Option } = Select;

const Wrapper = styled(Spin)``;
const FilterWrapper = styled(Form)`
  label {
    width: 75px;
  }
`;
const ListWrapper = styled.div``;
const TourTitle = styled.span`
  color: ${colors.blue[80]};
  font-weight: bold;
`;

const STATUS = {
  APPROVED: 1,
  WAITING_FOR_APPROVAL: 0,
  DELETED: 2,
};
const statusFilter = [
  {
    name: 'Waiting for Approval',
    code: 0,
  },
  {
    name: 'Approved',
    code: 1,
  },
  {
    name: 'Deleted',
    code: 2,
  },
];

const columns = [
  {
    title: 'Tour name',
    dataIndex: 'name',
    key: 'name',
    render: (name, tour) => (
      <div>
        <TourTitle>
          <a href={`/app/adminTourReview?uid=${tour.uid}&id=${tour.id}`} target="_blank">{name}</a>          
        </TourTitle>
      </div>
    ),
  },
  {
    title: 'Post by',
    dataIndex: 'fullName',
    key: 'fullName',
  },
  {
    title: 'Price',
    dataIndex: 'total',
    key: 'total',
  },
  {
    title: 'Duration',
    dataIndex: 'day',
    key: 'day',
  },
  {
    title: 'Pax',
    key: 'maxPax',
    dataIndex: 'maxPax',
  },
  {
    title: 'Updated Date',
    key: 'updatedAt',
    render: (updatedDate, tour) => moment(tour.updatedAt).format('YYYY-MM-DD'),
  },
  {
    title: 'Status',
    key: 'status',
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

function AdminTourList() {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [dataFilter, setDataFilter] = useState(null);
  const [loadingAllTour, setLoadingAllTour] = useState(false);
  const [rootCountry, setRootCountry] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [rootCity, setRootCity] = useState([]);

  const user = getUserProfile();
  
  useEffect(() => {
    const getAllTours = async () => {
      try {
        setLoadingAllTour(true);
        const res = await API.adminGetAllTour({ uid: user.uid, token: user.token });
        console.log(res.data);
        setData(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingAllTour(false);
      }
    };
    getAllTours();
  }, []);

  useEffect(() => {
    const fetchCountry = async () => {
      setIsloading(true);
      const resCountry = await API.getAllCountry();
      setRootCountry(resCountry.data);
      setIsloading(false);
    };
    fetchCountry();
  }, [setRootCountry, API.getAllCountry, setIsloading]);

  const handleSelectCountryAndCity = value => {
    form.setFieldsValue({ country: value });
    const fetchCity = async () => {
      const resCity = await API.getCityOfCountry(value);
      setRootCity(resCity.data);
      form.setFieldsValue({ city: null });
    };
    fetchCity();
  };

  const handleFinish = async value => {
    setIsloading(true);
    const res = await API.handleFillterTourAdmin({
      data: { ...value, country: _.find(rootCountry, c => c.code === value.country)?.name },
    });
    setDataFilter(res.data);
    setIsloading(false);
  };

  const handleClearFilter = async () => {
    setIsloading(true);
    await API.handleFillterTourAdmin({ uid: user.uid, data: '' });
    setDataFilter(null);
    form.setFieldsValue({ status: null, total: 0, day: 1, country: '', city: '' });
    setIsloading(false);
  };

  return (
    <Wrapper spinning={isloading}>
      <FilterWrapper onFinish={handleFinish} form={form}>
        <Divider orientation="left">Filter</Divider>
        <Row gutter={32}>
          <Col span={8}>
            <Form.Item label="Country" name="country">
              <Select placeholder="Country" onChange={handleSelectCountryAndCity}>
                {rootCountry?.map(item => (
                  <Option value={item.code} key={item.code}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="City" name="city">
              <Select
                placeholder="City"
                onChange={value => {
                  form.setFieldsValue({ city: value });
                }}
              >
                {rootCity?.map(item => (
                  <Option value={item.city_name} key={item.city_name}>
                    {item.city_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={8}>
            <Form.Item label="Price" name="total">
              <InputNumber />
            </Form.Item>

            <Form.Item label="Day" name="day">
              <Select
                placeholder="Day"
                onChange={value => {
                  form.setFieldsValue({ pax: value });
                }}
              >
                {Array.from({ length: 10 }, (item, index) => {
                  return (
                    <Option value={index + 1} key={index}>
                      {index + 1}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={8}>
            <Form.Item label="Status" name="status">
              <Select
                placeholder="Status"
                onChange={value => {
                  form.setFieldsValue({ status: value });
                }}
              >
                {statusFilter.map(item => (
                  <Option value={item.code} key={item.code}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item style={{ textAlign: 'right' }}>
              <Button type="primary" style={{ width: 230 }} htmlType="submit">
                Apply
              </Button>
              <Button
                type="primary"
                style={{ width: 230, marginTop: 20 }}
                onClick={handleClearFilter}
                disabled={dataFilter === null}
              >
                Clear filter
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </FilterWrapper>
      <br />
      <ListWrapper>
        <Divider orientation="left">Tour List</Divider>
        <Table
          columns={columns}
          dataSource={dataFilter || data}
          loading={loadingAllTour}
          rowKey="id"
          pagination={{ pageSize: 40 }}
        />
      </ListWrapper>
    </Wrapper>
  );
}

export default AdminTourList;
