import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, InputNumber, Row, Col, Spin, notification } from 'antd';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styled from 'styled-components';

import * as API from '../../../apis';
import TagInterests from '../../HandleTag/Interests';
import UploadAvatar from '../../Input/UploadAvatar';

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

const AdminProfile = ({ uid }) => {
  const [form] = Form.useForm();
  const { country } = form.getFieldsValue();
  const [profile, setProfile] = useState({});
  const [rootCountry, setRootCountry] = useState([]);
  const [rootCity, setRootCity] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [defaultTags, setDefaultTags] = useState({
    interests: [],
    language: [],
    extras: [],
  });
  const [interests, setInterests] = useState({
    tags: [],
  });
  const [extras, setExtras] = useState({
    tags: [],
  });
  const [language, setLanguage] = useState({
    tags: [],
  });

  useEffect(() => {
    const fetchAdminProfile = async () => {
      setIsloading(true);
      const res = await API.getAdminProfile({ uid });
      const resCountry = await API.getAllCountry();
      setInterests({
        ...interests,
        tags: res.data?.interest ? res.data?.interest?.split(';') : [],
      });
      setExtras({ ...extras, tags: res.data?.extras ? res.data?.extras?.split(';') : [] });
      setLanguage({ ...language, tags: res.data?.language ? res.data?.language?.split(';') : [] });

      setProfile(res.data);
      setRootCountry(resCountry.data);
      setIsloading(false);
    };
    fetchAdminProfile();
  }, [API.getAdminProfile, API.getAllCountry, setIsloading, setProfile, setRootCountry]);

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
        form.setFieldsValue({ city: null });
        setIsloading(false);
      }
    };
    fetchCity();
  };

  const onFinish = async values => {
    setIsloading(true);
    await API.editProfile({
      ...values,
      uid,
      interest: interests.tags?.join(';'),
      extras: extras.tags?.join(';'),
      language: language.tags?.join(';'),
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

        <Form.Item
          name="education"
          label="Education"
          initialValue={profile.education}
          key={profile.education}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="specialities"
          label="Certification"
          initialValue={profile.specialities}
          key={profile.specialities}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="language"
          label="Language"
          initialValue={profile.language}
          key={profile.language}
        >
          <TagInterests
            createInfo={language}
            setCreateInfo={setLanguage}
            defaultTags={defaultTags.language}
          />
        </Form.Item>

        <Form.Item
          name="interests"
          label="Interests"
          initialValue={profile.interests}
          key={profile.interests}
        >
          <TagInterests
            createInfo={interests}
            setCreateInfo={setInterests}
            defaultTags={defaultTags.interests}
          />
        </Form.Item>

        <Form.Item name="extras" label="Extras" initialValue={profile.extras} key={profile.extras}>
          <TagInterests
            createInfo={extras}
            setCreateInfo={setExtras}
            defaultTags={defaultTags.extras}
          />
        </Form.Item>

        <Form.Item
          name="experience"
          label="Experience"
          initialValue={profile.experience}
          key={profile.experience}
        >
          <Input.TextArea rows={4} />
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

AdminProfile.propTypes = {
  uid: PropTypes.string.isRequired,
};

export default AdminProfile;
