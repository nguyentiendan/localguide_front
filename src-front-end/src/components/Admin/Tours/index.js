import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Avatar, Tooltip, Table, Tag, Space,  Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import moment from 'moment';
import _ from 'lodash';

import colors from '../../../assets/styles/colors';
import * as API from '../../../apis';
import { getUserProfile } from '../../../utils/auth';

const Wrapper = styled(Spin)``;

const ListWrapper = styled.div``;
const TourTitle = styled.span`
  color: ${colors.blue[80]};
  font-weight: bold;
`;

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
  WAITING_FOR_APPROVAL: 2,
};

const columns = [
  {
    title: 'Tour name',
    dataIndex: 'name',
    key: 'name',
    render: (name, tour) => (
      <div>
        <TourTitle>
          <a
            href={`/app/adminTourReview?uid=${tour.uid}&id=${tour.id}`}
            target="_blank"
            rel="noreferrer"
          >
            {name}
          </a>
        </TourTitle>
      </div>
    ),
  },
  {
    title: 'Post by',
    dataIndex: 'fullName',
    key: 'fullName',
    render: (fullName, tour) => (
      <div>
        <GuideTitle>
          <AvatarWrapper src={tour.avatar} icon={<UserOutlined />} size="small" />
          <a
            href={`/app/adminGuideReview?uid=${tour.uid}&id=${tour.id}`}
            target="_blank"
            rel="noreferrer"
          >
            {fullName}
          </a>
        </GuideTitle>
      </div>
    ),
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
    render: (updatedDate, tour) => (
      <Tooltip title={moment(tour.updatedAt).fromNow()}>
        {moment(tour.updatedAt).format('YYYY-MM-DD')}
      </Tooltip>
    ),
  },
  {
    title: 'Status',
    key: 'status',
    render: (status, tour) => (
      <Space size="middle">
        {tour.status === STATUS.APPROVED && <Tag color="success">Approved</Tag>}
        {tour.status === STATUS.WAITING_FOR_APPROVAL && <Tag color="warning">Waiting approve</Tag>}
      </Space>
    ),
  },
];

function AdminTourList() {
  const [data, setData] = useState([]);  
  const [loadingAllTour, setLoadingAllTour] = useState(false);
  const [loading, setLoading] = useState(false);
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
    <Wrapper spinning={loading}>           
      <ListWrapper>        
        <Table
          columns={columns}
          dataSource={data}
          loading={loadingAllTour}
          rowKey="id"
          size="middle"
          bordered
          //title={() => 'Header'}
          // footer={() => 'Footer'}
          pagination={{ pageSize: 40 }}
        />
      </ListWrapper>
    </Wrapper>
  );
}

export default AdminTourList;
