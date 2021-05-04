import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  Divider,
  Row,
  Col,
  Form,
  Button,
  Table,
  Tag,
  Space,
  Badge,
  Select,
  Spin,
  InputNumber,
} from 'antd';
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
    title: 'Guide name',
    dataIndex: 'fullname',
    key: 'fullname',
    render: (name, tour) => (
      <div>
        <TourTitle>
          <a href={`/app/admin_tour_review?uid=${tour.uid}&id=${tour.id}`}>{name}</a>
        </TourTitle>
      </div>
    ),
  },

  {
    title: 'Mail',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Country',
    dataIndex: 'country',
    key: 'country',
  },
  {
    title: 'Updated Date',
    key: 'updatedAt',
    render: (updatedAt, guide) => moment(guide.updatedAt).format('YYYY-MM-DD'),
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    render: (role, guide) => (
      <Space size="middle">
        {guide.role === 1 && 'User'}
        {guide.role === 2 && 'Guide'}
        {guide.role === 3 && 'Admin'}
      </Space>
    ),
  },
  {
    title: 'Status',
    key: 'status',
    render: (status, guide) => (
      <Space size="middle">
        {guide.status === 1 && <Tag color="success">Active</Tag>}
        {guide.status === 0 && <Tag color="error">Not Active</Tag>}
      </Space>
    ),
  },
];

function Guides() {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [dataFilter, setDataFilter] = useState(null);
  const [loadingAllGuide, setLoadingAllGuide] = useState(false);
  const [rootCountry, setRootCountry] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [rootCity, setRootCity] = useState([]);

  const user = getUserProfile();

  useEffect(() => {
    const getAllGuides = async () => {
      try {
        setLoadingAllGuide(true);
        const res = await API.adminGetAllGuide({ token: user.token });
        console.log(res.data);
        setData(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingAllGuide(false);
      }
    };
    getAllGuides();
  }, []);

  return (
    <Wrapper spinning={isloading}>
      <ListWrapper>
        <Divider orientation="left">Guide List</Divider>
        <Table
          columns={columns}
          dataSource={dataFilter || data}
          loading={loadingAllGuide}
          rowKey="id"
          pagination={{ pageSize: 40 }}
        />
      </ListWrapper>
    </Wrapper>
  );
}

export default Guides;
