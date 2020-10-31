import React from 'react';
import { Form, Input, Select, Row, Col, Checkbox, Button } from 'antd';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 4, // label size
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8, // input box size
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const AdminProfile = () => {
  const [form] = Form.useForm();

  const onFinish = values => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form {...formItemLayout} form={form} name="Profile" onFinish={onFinish} scrollToFirstError>
      <Form.Item
        name="fullname"
        label="Full Name"
        rules={[
          {
            required: true,
            message: 'Please input your Full Name!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="mobile"
        label="Mobile"
        rules={[
          {
            required: true,
            message: 'Please input your Mobile phone!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="job" label="Your job">
        <Input />
      </Form.Item>

      <Form.Item name="gender" label="Gender" style={{ marginBottom: 0 }}>
        <Row gutter={8}>
          <Col span={12}>
            <Select placeholder="Gender">
              <Option value="0">Male</Option>
              <Option value="1">Female</Option>
            </Select>
          </Col>
          <Col span={12}>
            <Form.Item name="age" label="Age">
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item name="country" label="Country" style={{ marginBottom: 0 }}>
        <Row gutter={8}>
          <Col span={12}>
            <Select placeholder="Country">
              <Option value="0">Japan</Option>
              <Option value="1">VietNam</Option>
            </Select>
          </Col>
          <Col span={12}>
            <Form.Item name="city" label="City">
              <Select placeholder="City">
                <Option value="0">Male</Option>
                <Option value="1">Female</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item name="education" label="Education">
        <Input />
      </Form.Item>

      <Form.Item name="language" label="Language">
        <Input />
      </Form.Item>

      <Form.Item name="hobby" label="Hobby">
        <Input />
      </Form.Item>

      <Form.Item name="experience" label="Experience">
        <Input.TextArea />
      </Form.Item>

      <Form.Item label="Captcha" extra="We must make sure that your are a human.">
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="captcha"
              noStyle
              rules={[
                {
                  required: true,
                  message: 'Please input the captcha you got!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Button>Get captcha</Button>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          I have read the &nbsp;
          <a href="">agreement</a>
        </Checkbox>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

AdminProfile.propTypes = {};

export default AdminProfile;
