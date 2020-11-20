import React, { useState, useEffect, useCallback } from 'react';
import { Form, Input, Select, Button, InputNumber, Row, Col, Spin, notification } from 'antd';
import PropTypes from 'prop-types';
import _ from 'lodash';
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
  const { fullname, mobile, job, age } = form.getFieldsValue();
  const [profile, setProfile] = useState({});
  const [isloading, setIsloading] = useState(false);
  const [defaultTags, setDefaultTags] = useState({
    interests: [],
    language: [],
    extras: [],
  });

  const fetchAdminProfile = useCallback(async () => {
    setIsloading(true);
    const res = await API.getUserProfile(uid);
    setProfile(res.data);
    setIsloading(false);
  }, [API.getAdminProfile, API.getAllCountry, setIsloading, setProfile]);

  useEffect(() => {
    fetchAdminProfile();
  }, [fetchAdminProfile]);

  useEffect(() => {
    (async () => {
      try {
        const { data: extraDefault } = await API.getAllExtra();
        const { data: languageDefault } = await API.getAllLang();
        const { data: interestsDefaults } = await API.getAllInterest();
        const defaultInterests = _.map(interestsDefaults, d => d.interest);
        const defaultLanguage = _.map(languageDefault, d => d.language);
        const defaultExtras = _.map(extraDefault, d => d.extra);

        setDefaultTags({
          ...defaultTags,
          interests: defaultInterests,
          language: defaultLanguage,
          extras: defaultExtras,
        });
      } catch (e) {
        // ignore
      }
    })();
  }, [API.getAllInterest, API.getAllExtra, API.getAllLang, setDefaultTags]);

  const onFinish = async values => {
    setIsloading(true);
    await API.editProfile({
      ...values,
      uid,
    });
    notification.success({ message: 'You have successfully updated your profile.' });
    setIsloading(false);
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
        <Form.Item name="avatar" style={{ justifyContent: 'flex-end' }}>
          <UploadAvatar uid={uid} src={profile.avatar} />
        </Form.Item>

        <Form.Item
          name="fullname"
          label="Full Name"
          rules={[
            {
              required: true,
              message: 'Please input your Full Name!',
            },
          ]}
          initialValue={
            profile.fullname && form.setFieldsValue({ fullname: fullname || profile.fullname })
          }
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
          initialValue={profile.email && form.setFieldsValue({ email: profile.email })}
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
          initialValue={profile.mobile && form.setFieldsValue({ mobile: mobile || profile.mobile })}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="job"
          label="Your job"
          initialValue={profile.job && form.setFieldsValue({ job: job || profile.job })}
        >
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
                initialValue={profile.age && form.setFieldsValue({ age: age || profile.age })}
                style={{ flexGrow: 0.15 }}
              >
                <InputNumber />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>

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
