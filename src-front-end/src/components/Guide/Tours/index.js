import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { navigate } from 'gatsby';
import { Tooltip, Divider, Table, Space, Tag, Button, message, Popconfirm } from 'antd';
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  CalendarOutlined,
  ScheduleOutlined,
} from '@ant-design/icons';
import _ from 'lodash';
import moment from 'moment';
import * as API from '../../../apis';
import { getUserProfile } from '../../../utils/auth';
import colors from '../../../assets/styles/colors';
import AddEvent from './addEventModal';

const Wrapper = styled.div``;
const FilterWrapper = styled.div`
  label {
    width: 75px;
  }
`;

const ListWrapper = styled.div``;

const TourTitle = styled.span`
  color: ${colors.blue[80]};
  font-weight: bold;
`;

function TourList() {
  const user = getUserProfile();
  const [loading, setLoading] = useState(false);
  const [dataFilter, setDataFilter] = useState(null);
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const res = await API.getGuideAllTours({ uid: user.uid });
      setData(res.data);
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleDeleteTour = async (uid, id) => {
    setLoading(true);
    const { status } = await API.deleteTour({ uid, id });
    if (status === true) {
      const newData = _.remove(data, item => {
        return item.id !== id;
      });
      setData(newData);
    }
    message.success('Delete success');
    setLoading(false);
  };

  const showModal = () => {
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
  };

  const STATUS = {
    APPROVED: 1,
    WAITING_FOR_APPROVAL: 2,
    DRAFT: 0,
  };
  const statusFilter = [
    {
      name: 'Waiting Approve',
      code: 2,
    },
    {
      name: 'Approved',
      code: 1,
    },
    {
      name: 'Draft',
      code: 0,
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
            <a
              href={`/app/guideTourReview?uid=${tour.uid}&id=${tour.id}`}
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
      title: 'Country',
      key: 'country',
      dataIndex: 'country',
    },
    {
      title: 'City',
      key: 'city',
      dataIndex: 'city',
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
          {tour.status === STATUS.WAITING_FOR_APPROVAL && (
            <Tag color="warning">Waiting approve</Tag>
          )}
          {tour.status === STATUS.DRAFT && <Tag color="error">Draft</Tag>}
        </Space>
      ),
    },
    {
      title: 'Action',
      key: 'control',
      render: (status, tour) => {
        return (
          <Space size="middle">
            <a href={`/app/editTour?q=${tour.id}`} target="_blank" rel="noreferrer">
              <EditOutlined title="Edit Tour" />
            </a>
            <a href="#">
              <CalendarOutlined title="Setting schedule" onClick={showModal} />
            </a>

            {(tour.status === 0 || tour.status === 2) && (
              <Popconfirm
                title="Are you sure to delete this Tour?"
                onConfirm={() => handleDeleteTour(tour.uid, tour.id)}
                okText="Yes"
                cancelText="No"
              >
                <DeleteOutlined title="Delete Tour" style={{ color: '#f12f60' }} />
              </Popconfirm>
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <Wrapper>
      {data.length == 0 && <div>You don’t have any tours.</div>}
      <Button
        icon={<PlusOutlined />}
        type="primary"
        size="large"
        onClick={() => navigate('/app/createTour')}
      >
        Create New Tour
      </Button>
      &nbsp;&nbsp;&nbsp;
      <Button
        icon={<ScheduleOutlined />}
        type="primary"
        size="large"
        onClick={() => navigate('/app/createTour')}
      >
        Confirm Schedule
      </Button>
      <br />
      <ListWrapper>
        <Divider orientation="left">Tour List</Divider>
        <Table
          columns={columns}
          dataSource={dataFilter || data}
          loading={loading}
          rowKey="id"
          bordered
          // title={() => 'Header'}
          // footer={() => 'Footer'}
          pagination={{ pageSize: 40 }}
        />
      </ListWrapper>
      <div>
        <AddEvent show={show} handleClose={hideModal} uid={user.uid} data={data}>
          Modal
        </AddEvent>
      </div>
    </Wrapper>
  );
}

export default TourList;
