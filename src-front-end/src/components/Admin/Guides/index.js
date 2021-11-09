import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Tooltip, Popconfirm, Avatar, Table, Tag, Space, Spin, message } from 'antd';
import { DeleteOutlined, UserOutlined } from '@ant-design/icons';
import moment from 'moment';
import _ from 'lodash';

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

function Guides() {
  const [data, setData] = useState([]);
  const [loadingAllGuide, setLoadingAllGuide] = useState(false);
  const [loading, setLoading] = useState(false);

  const user = getUserProfile();

  useEffect(() => {
    const getAllGuides = async () => {
      try {
        setLoadingAllGuide(true);
        const res = await API.adminGetAllGuide({ uid: user.uid, token: user.token });
        setData(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingAllGuide(false);
      }
    };
    getAllGuides();
  }, []);

  const handleDeleteUser = async (id, uid) => {
    try {
      setLoading(true);
      const { status } = await API.handleDeleteAcc(uid, id);

      if (status === true) {
        const newData = _.remove(data, item => {
          return item.id !== id;
        });
        setData(newData);

        message.success('Delete success');
        setLoading(false);
      } else {
        message.error('Have error, please check');
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Guide name',
      dataIndex: 'fullname',
      key: 'fullname',
      render: (name, guide) => (
        <div>
          <GuideTitle>
            <AvatarWrapper src={guide.avatar} icon={<UserOutlined />} size="small" />
            {(guide.role === 1 || guide.role === 3) && name}
            {(guide.role === 4) && (
              <a
                href={`/app/adminUserReview?uid=${guide.uid}&id=${guide.id}`}
                target="_blank"
                rel="noreferrer"
              >
                {name}
              </a>
            )}
            {(guide.role === 2 ) && (
              <a
                href={`/app/adminGuideReview?uid=${guide.uid}&id=${guide.id}`}
                target="_blank"
                rel="noreferrer"
              >
                {name}
              </a>
            )}
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
      render: (updatedDate, guide) => (
        <Tooltip title={moment(guide.updatedAt).fromNow()}>
          {moment(guide.updatedAt).format('YYYY-MM-DD')}
        </Tooltip>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role, guide) => (
        <Space size="middle">
          {guide.role === 1 && 'User'}
          {guide.role === 2 && 'Guide'}
          {guide.role === 4 && 'User->Guide'}
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
          {guide.status === 1 && (guide.role === 4) && (
            <Tag color="processing">Waiting approve</Tag>
          )}
          {guide.status === 0 && <Tag color="error">Not active</Tag>}
        </Space>
      ),
    },
    {
      title: '',
      key: 'control',
      render: (status, guide) => {
        return (
          <Space size="middle">
            {guide.status === 0 && (
              <Popconfirm
                title="Are you sure to delete this User?"
                onConfirm={() => handleDeleteUser(guide.id, guide.uid)}
                okText="Yes"
                cancelText="No"
              >
                <DeleteOutlined />
              </Popconfirm>
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <Wrapper spinning={loading}>
      <ListWrapper>        
        <Table
          columns={columns}
          dataSource={data}
          loading={loadingAllGuide}
          rowKey="id"
          size="middle"
          bordered
          // title={() => 'Header'}
          // footer={() => 'Footer'}
          pagination={{ pageSize: 40 }}
        />
      </ListWrapper>
    </Wrapper>
  );
}

export default Guides;
