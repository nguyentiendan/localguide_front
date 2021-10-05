import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Form, Input, Button, Tooltip, Table, Tag, Space,  Spin, Popconfirm, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import _ from 'lodash';
import * as API from '../../../apis';

const Wrapper = styled(Spin)``;
const ListWrapper = styled.div``;

function AdminTagList() {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);    
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();    
  const [, forceUpdate] = useState({});

  useEffect(() => {
    // To disable submit button at the beginning.
    forceUpdate({});

    const getAllTag = async () => {
      try {
        setLoading(true);
        const res = await API.getAllTags();
        setData(res.data);
      } catch (error) {
        
      } finally {
        setLoading(false);
      }
    };
    getAllTag(); 
    
  }, []);
  
  const onFinish = async value => {    
    setLoading(true);
    setError('')
    const key = 'updatable';        
    if (loading) {
      return;
    }
    
    try {
      const { status, message:mess, tag } = await API.createTag(value);
      if (status === true) {                
        const newTag = { ...tag[0] };
        setData([...data, newTag]);
        form.resetFields();               
        message.success({
          content: 'Create tag successfully!',
          key,
          duration: 2,
          className: 'custom-class',
          style: {
            marginTop: '20vh',
          },
        });
      } else if (status === false) {        
        setError(value.tag + mess)
        form.resetFields();
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const handleDeleteTag = async (id, uid) => {    
    try {
      setLoading(true); 
      const { status } = await API.deleteTag(uid, id);
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
      title: 'Tag',
      dataIndex: 'tag',
      key: 'tag',
      render: (tag) => (
        <Tag color="#f12f60" style={{color:'#fff'}}>
          {tag}
        </Tag>
      ),
    },
    {
      title: 'Create Date',
      key: 'createdAt',
      render: (tag) => (
        <Tooltip title={moment(tag.createdAt).fromNow()}>
          {moment(tag.createdAt).format('YYYY-MM-DD')}
        </Tooltip>
      ),
    },
    {
      title: '',
      key: 'control',
      render: (tag) => {
        return (
          <Space size="middle">
            <Popconfirm
              title="Are you sure to delete ?"
              onConfirm={() => handleDeleteTag(tag.id, tag.uid)}
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
            name="tag"            
            rules={[
              {
                required: true,
                message: 'Please input your Tag!',
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
            key="tag"
          >
            <Input maxLength="15" placeholder="Input Tag"/>
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
          rowKey="tag"
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

export default AdminTagList;
