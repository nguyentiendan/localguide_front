import React, { useState } from 'react';
import { LockOutlined } from '@ant-design/icons';
import { Card, Form, Input, Button, Modal } from 'antd';
import useAuth from '../../../utils/useAuth';
import * as API from '../../../apis';

const ChangePass = uid => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const { logout } = useAuth();

  const onFinish = async values => {
    if (loading) {
      return;
    }

    try {
      setLoading(true);
      const { status } = await API.changePass(uid.uid, values.password);
      if (status === true) {
        setVisible(true);
      } else {
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div style={{ justifyContent: 'center' }}>
      <Card title="Change Password" bordered style={{ textAlign: 'center', width: 400 }}>
        <Form form={form} name="changepass" onFinish={onFinish} scrollToFirstError>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please input your Password!' },
              { min: 8 },
              { max: 20 },
            ]}
          >
            <Input.Password
              size="large"
              placeholder="New password"
              prefix={<LockOutlined />}
              allowClear
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('The two passwords that you entered do not match!')
                  );
                },
              }),
            ]}
          >
            <Input.Password
              size="large"
              placeholder="Confirm password"
              autoComplete="off"
              prefix={<LockOutlined />}
              allowClear
            />
          </Form.Item>

          <Form.Item shouldUpdate>
            {() => (
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                style={{ width: '100%' }}
                disabled={
                  !form.isFieldsTouched(true) ||
                  !!form.getFieldsError().filter(({ errors }) => errors.length).length
                }
              >
                Change Password
              </Button>
            )}
          </Form.Item>
        </Form>
      </Card>
      <>
        <Modal
          visible={visible}
          title="Change password success"
          closable="false"
          keyboard="false"
          centered="true"
          footer={[
            <Button key="submit" type="primary" onClick={logout}>
              Logout
            </Button>,
          ]}
        >
          <p>You should be logout and login again to take effect</p>
        </Modal>
      </>
    </div>
  );
};

export default ChangePass;
