import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {Divider, Avatar, Form,  Button,  Table,  Tag,  Space,  Badge, Spin,} from 'antd';
import moment from 'moment';
import _ from 'lodash';
import { UserOutlined } from '@ant-design/icons';

import colors from '../../../assets/styles/colors';
import * as API from '../../../apis';
import { getUserProfile } from '../../../utils/auth';

const Wrapper = styled(Spin)``;
const ListWrapper = styled.div``;

const GuideTitle = styled.span`
  color: ${colors.blue[80]};
  font-weight: bold;
`;

const AvatarWrapper = styled(Avatar)`
  && {
    margin-right: 1.5rem;
  }
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
    render: (name, guide) => (
      <div>
        <GuideTitle>
          <AvatarWrapper src={guide.avatar} icon={<UserOutlined />} size="small"  />
          {((guide.role === 1 || guide.role === 3) && guide.reqActive === 0) && name}
          {(guide.role === 1 && guide.reqActive === 1 ) && <a href={`/app/adminUserReview?uid=${guide.uid}&id=${guide.id}`} target="_blank">{name}</a> } 
          {guide.role === 2 && <a href={`/app/adminGuideReview?uid=${guide.uid}&id=${guide.id}`} target="_blank">{name}</a> } 
        </GuideTitle>
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
    title: 'City',
    dataIndex: 'city',
    key: 'city',    
  },
  {
    title: 'Updated Date',
    key: 'updatedAt',
    render: (updatedDate, guide) => moment(guide.updatedAt).format('YYYY-MM-DD'),
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
        {(guide.status === 1 && guide.reqActive == 0) && <Tag color="success">Active</Tag>}
        {(guide.status === 1 && guide.reqActive == 1) && <Tag color="processing">Waiting</Tag>}
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
  
  const [isloading, setIsloading] = useState(false);
  

  const user = getUserProfile();
  
  useEffect(() => {
    const getAllGuides = async () => {
      try {
        setLoadingAllGuide(true);        
        const res = await API.adminGetAllGuide({uid: user.uid, token: user.token });
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
