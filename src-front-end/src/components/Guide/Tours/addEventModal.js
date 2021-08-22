import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { navigate } from 'gatsby';
import {
  Modal,
  Form,
  Select,
  Tooltip,
  Divider,
  Table,
  Space,
  Tag,
  Button,
  message,
  Popconfirm,
} from 'antd';
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

const AddEventModal = ({ show, handleClose, uid, data }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [tours, setTours] = useState([{ data }]);
  const names = [
    {
      id: '1',
      name: 'ABBC',
    },
    {
      id: '2',
      name: 'CDE',
    },
  ];

  console.log(data);
  /* useEffect(() => {
    async function fetchAllTour() {
      setLoading(true);      
      const res = await API.getGuideAllTours({uid});
      setTours(res.data)
      setLoading(false);
    }
    fetchAllTour();
  }, []); */

  return (
    <div>
      <Modal
        title="Add Event"
        visible={show}
        okText="Add"
        onCancel={handleClose}
        // onOk={onAddEvent}
        onOk={() => {
          form
            .validateFields()
            .then(values => {
              // onAddEvent(values);
            })
            .catch(info => {
              // console.log('Validate Failed:', info);
            });
        }}
        style={{ width: 300 }}
      >
        {uid}
        <br />

        <Form form={form} scrollToFirstError>
          <Form.Item>
            <Select
              placeholder="Select tour"
              // onChange={onSelectTour}
              allowClear
            >
              {data &&
                data.map((d, index) => {
                  return (
                    <Select.Option value={d.id} key={index}>
                      {d.name} - {d.status === 1 ? 'Actived' : 'Not active'}
                    </Select.Option>
                  );
                })}
              {/* <Select.Option value="Tour 1">Tour 1</Select.Option>
                <Select.Option value="Tour 2">Tour 2</Select.Option>
                <Select.Option value="Tour 3">Tour 3</Select.Option>
              <Select.Option value="Tour 4">Tour 4</Select.Option> */}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddEventModal;
