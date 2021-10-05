import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Form, Input, Button, Tooltip, Table, Tag, Space,  Spin, Popconfirm, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import _ from 'lodash';

import * as API from '../../../apis';
import { getUserProfile } from '../../../utils/auth';

const Wrapper = styled(Spin)``;
const ListWrapper = styled.div``;



function AdminInterestList() {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);    
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();    
  const [, forceUpdate] = useState({});

  useEffect(() => {
    // To disable submit button at the beginning.
    forceUpdate({});

    const getAllInterest = async () => {
      try {
        setLoading(true);
        const res = await API.getAllInterest();
        setData(res.data);
      } catch (error) {
        
      } finally {
        setLoading(false);
      }
    };
    getAllInterest(); 
    
  }, []);
  
  const onFinish = async value => {    
    setLoading(true);
    setError('')
    const key = 'updatable';        
    if (loading) {
      return;
    }
    
    try {
      const { status, message:mess, interest } = await API.createInterest(value);
      if (status === true) {                
        const newInterest = { ...interest[0] };
        setData([...data, newInterest]);
        form.resetFields();               
        message.success({
          content: 'Create interest successfully!',
          key,
          duration: 2,
          className: 'custom-class',
          style: {
            marginTop: '20vh',
          },
        });
      } else if (status === false) {        
        setError(value.interest + mess)
        form.resetFields();
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const handleDeleteInterest = async (id, uid) => {    
    try {
      setLoading(true); 
      const { status } = await API.deleteInterest(uid, id);
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
      title: 'Interest',
      dataIndex: 'interest',
      key: 'interest',
      render: (interest) => (
        <Tag color="#f12f60" style={{color:'#fff'}}>
          {interest}
        </Tag>
      ),
    },
    {
      title: 'Create Date',
      key: 'createdAt',
      render: (interest) => (
        <Tooltip title={moment(interest.createdAt).fromNow()}>
          {moment(interest.createdAt).format('YYYY-MM-DD')}
        </Tooltip>
      ),
    },
    {
      title: '',
      key: 'control',
      render: (status, interest) => {
        return (
          <Space size="middle">
            <Popconfirm
              title="Are you sure to delete ?"
              onConfirm={() => handleDeleteInterest(interest.id, interest.uid)}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined style={{color:'#f12f60'}}/>
            </Popconfirm>          
          </Space>
        );
      },
    },
  ];
  
  return (
    <Wrapper spinning={loading}>           
      <ListWrapper>
        <Form form={form} name="add" layout="inline" onFinish={onFinish}> 
          <Form.Item
            name="interest"            
            rules={[
              {
                required: true,
                message: 'Please input your Interest!',
              },
              {
                max: 15,
                message: 'Value should be less than 15 character',
              },
              {
                min: 4,
                message: 'Value should be longer than 4 character',
              },
            ]}
            key="interest"            
          >
            <Input maxLength="15" placeholder="Input Interest"/>
          </Form.Item>
          <Form.Item shouldUpdate>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                disabled={
                  !form.isFieldsTouched(true) ||
                  !!form.getFieldsError().filter(({ errors }) => errors.length).length
                }
              >
                Add new
              </Button>
            )}            
          </Form.Item>
        </Form> 
        <div style={{color:'#f12f60'}}>
          {error}
        </div>
        <br/>      
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          rowKey="interest"
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

export default AdminInterestList;
