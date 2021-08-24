import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Modal, Form, Select, DatePicker } from 'antd';
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  CalendarOutlined,
  ScheduleOutlined,
} from '@ant-design/icons';
import { CompactPicker } from 'react-color';
import moment from 'moment';
// import _ from 'lodash';
import * as API from '../../../apis';

const AddEventModal = ({ show, handleClose, uid, data }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [tours, setTours] = useState([{ data }]);

  const { RangePicker } = DatePicker;

  const dateFormat = 'YYYY/MM/DD';
  const monthFormat = 'YYYY/MM';

  /* useEffect(() => {
    async function fetchAllTour() {
      setLoading(true);      
      const res = await API.getGuideAllTours({uid});
      setTours(res.data)
      setLoading(false);
    }
    fetchAllTour();
  }, []); */
  const onAddEvent = values => {
    console.log(values);
  };

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
              onAddEvent(values);
            })
            .catch(info => {
              // console.log('Validate Failed:', info);
            });
        }}
        style={{ width: 300 }}
      >
        <Form form={form} name="event" scrollToFirstError>
          <span>Select tour to add event</span>
          <br />
          <Form.Item name="tour">
            <Select
              placeholder="Select tour"
              // onChange={onSelectTour}
              allowClear
              rules={[{ required: true, message: 'Please select tour!' }]}
            >
              {data &&
                data.map((d, index) => {
                  return (
                    <Select.Option value={d.id} key={index}>
                      {d.name} - {d.status === 1 ? 'Actived' : 'Not active'}
                    </Select.Option>
                  );
                })}
            </Select>
          </Form.Item>
          <Form.Item>
            <span>Select color for event</span>
            <br />
            <CompactPicker />
          </Form.Item>
          <Form.Item rules={[{ required: true, message: 'Please select start date, end date!' }]}>
            <span>Select date of event</span>
            <br />
            <RangePicker format={dateFormat} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddEventModal;
