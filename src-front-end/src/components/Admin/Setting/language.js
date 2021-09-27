import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Form, Input, Button, Tooltip, Table, Tag, Space,  Spin, Popconfirm, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import _ from 'lodash';
import * as API from '../../../apis';

const Wrapper = styled(Spin)``;
const ListWrapper = styled.div``;

function AdminLanguageList() {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);    
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();    
  const [, forceUpdate] = useState({});

  useEffect(() => {
    // To disable submit button at the beginning.
    forceUpdate({});

    const getAllLanguage = async () => {
      try {
        setLoading(true);
        const res = await API.getAllLang();
        setData(res.data);
      } catch (error) {
        
      } finally {
        setLoading(false);
      }
    };
    getAllLanguage(); 
    
  }, []);
  
  const onFinish = async value => {    
    setLoading(true);
    setError('')
    const key = 'updatable';        
    if (loading) {
      return;
    }
    
    try {
      const { status, message:mess, language } = await API.createLang(value);
      if (status === true) {                
        const newLang = { ...language[0] };
        setData([...data, newLang]);
        form.resetFields();               
        message.success({
          content: 'Create language successfully!',
          key,
          duration: 2,
          className: 'custom-class',
          style: {
            marginTop: '20vh',
          },
        });
      } else if (status === false) {        
        setError(value.language + mess)
        form.resetFields();
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const handleDeleteLang = async (id, uid) => {    
    try {
      setLoading(true); 
      const { status } = await API.deleteLanguage(uid, id);
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
      title: 'Language',
      dataIndex: 'language',
      key: 'language',
      render: (language) => (
        <Tag color="#f12f60" style={{color:'#fff'}}>
          {language}
        </Tag>
      ),
    },
    {
      title: 'Create Date',
      key: 'createdAt',
      render: (language) => (
        <Tooltip title={moment(language.createdAt).fromNow()}>
          {moment(language.createdAt).format('YYYY-MM-DD')}
        </Tooltip>
      ),
    },
    {
      title: '',
      key: 'control',
      render: (language) => {
        return (
          <Space size="middle">
            <Popconfirm
              title="Are you sure to delete ?"
              onConfirm={() => handleDeleteLang(language.id, language.uid)}
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
            name="language"            
            rules={[
              {
                required: true,
                message: 'Please input your Language!',
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
            key="language"            
          >
            <Input maxLength="15" placeholder="Input Language"/>
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
          rowKey="language"
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

export default AdminLanguageList;
