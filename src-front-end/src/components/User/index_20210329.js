import React, { useState, useEffect, useCallback } from 'react';
import { Form, Input, Select, Button, InputNumber, Row, Col, Spin, notification } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import * as API from '../../apis';
import UploadAvatar from '../Input/UploadAvatar';

const FormWrapper = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  && {
    .ant-form-item {
      width: 100%;
    }
  }
`;

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
      span: 12, // input box size
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

const UserProfile = ({ uid }) => {
  const [form] = Form.useForm();
  const { country } = form.getFieldsValue();
  const [profile, setProfile] = useState({});
  const [rootCity, setRootCity] = useState([]);
  const [rootCountry, setRootCountry] = useState([]);
  const [isloading, setIsloading] = useState(false);

  const fetchAdminProfile = useCallback(async () => {
    setIsloading(true);
    const res = await API.getUserProfile(uid);
    const resCountry = await API.getAllCountry();
    setRootCountry(resCountry.data);
    setProfile(res.data);
    setIsloading(false);
  }, [API.getAdminProfile, API.getAllCountry, setIsloading, setProfile, setRootCountry]);

  useEffect(() => {
    fetchAdminProfile();
  }, [fetchAdminProfile]);

  const onFinish = async values => {
    setIsloading(true);
    await API.editProfile({
      ...values,
      uid,
    });
    notification.success({ message: 'You have successfully updated your profile.' });
    setIsloading(false);
  };

  useEffect(() => {
    const fetchCity = async () => {
      if (profile?.country) {
        const resCity = await API.getCityOfCountry(profile?.country);
        setRootCity(resCity.data);
      }
    };
    fetchCity();
  }, [API.getCityOfCountry, profile?.country, setRootCity]);

  const handleSelectCountryAndCity = value => {
    form.setFieldsValue({ country: value });
    const fetchCity = async () => {
      if (profile.country || country || value) {
        setIsloading(true);
        const resCity = await API.getCityOfCountry(value || profile.country);
        setRootCity(resCity.data);
        setProfile({
          ...profile,
          city: null,
        });
        form.setFieldsValue({ city: null });
        setIsloading(false);
      }
    };
    fetchCity();
  };

  return (
    <Spin spinning={isloading}>
      <FormWrapper
        {...formItemLayout}
        form={form}
        name="Profile"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item name="avatar">
          <UploadAvatar uid={uid} src={profile.avatar} title="User" />
        </Form.Item>

        <Form.Item
          name="fullname"
          label="Full Name"
          rules={[
            {
              required: true,
              message: 'Please input your Full Name!',
            },
            {
              max: 100,
              message: 'Value should be less than 100 character',
            },
          ]}
          key={profile.fullname}
          initialValue={profile.fullname}
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
          key={profile.email}
          initialValue={profile.email}
        >
          <Input disabled={profile.email} />
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
          key={profile.mobile}
          initialValue={profile.mobile}
        >
          <Input />
        </Form.Item>

        <Form.Item name="job" label="Your job" initialValue={profile.job} key={profile.job}>
          <Input />
        </Form.Item>

        <Form.Item name="sex" label="Gender" style={{ marginBottom: 0 }}>
          <Row gutter={8}>
            <Col span={12}>
              <Select
                placeholder="Gender"
                key={profile.sex}
                defaultValue={profile.sex === '0' ? '0' : '1'}
                onChange={value => {
                  form.setFieldsValue({ sex: value });
                }}
              >
                <Option value="1">Male</Option>
                <Option value="0">Female</Option>
              </Select>
            </Col>
            <Col span={12}>
              <Form.Item
                name="age"
                label="Age"
                key={profile.age}
                initialValue={profile.age}
                style={{ flexGrow: 0.15 }}
              >
                <InputNumber />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>

        <div style={{ width: '100%' }}>
          <Form.Item name="country" label="Country">
            <Row>
              <Select
                placeholder="Country"
                key={profile.country}
                defaultValue={profile.country}
                onChange={handleSelectCountryAndCity}
              >
                {rootCountry?.map(item => (
                  <Option value={item.code} key={item.code}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Row>
          </Form.Item>
          <Form.Item name="city" label="City">
            <Row>
              <Select
                placeholder="City"
                key={profile.city}
                defaultValue={profile.city}
                onChange={value => {
                  form.setFieldsValue({ city: value });
                }}
              >
                {rootCity?.map(item => (
                  <Option value={item.city_name} key={item.city_name}>
                    {item.city_name}
                  </Option>
                ))}
              </Select>
            </Row>
          </Form.Item>
        </div>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </FormWrapper>
    </Spin>
  );
};

UserProfile.propTypes = {
  uid: PropTypes.string.isRequired,
};

export default UserProfile;
