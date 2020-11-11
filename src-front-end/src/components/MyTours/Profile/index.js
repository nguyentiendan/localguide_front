import React, { useState, useEffect, useCallback } from 'react';
import { Form, Input, Select, Button, InputNumber, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import _ from 'lodash';

import * as API from '../../../apis';
import TagInterests from '../../HandleTag/Interests';
import UploadAvatar from '../../Input/UploadAvatar';

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

const GuideProfile = ({ uid }) => {
  const [form] = Form.useForm();
  const { country, fullname, mobile, job, age, education, experience } = form.getFieldsValue();
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
  const fetchAdminProfile = useCallback(async () => {
    setIsloading(true);
    const res = await API.getGuideProfile(uid);
    const resCountry = await API.getAllCountry();
    setInterests({ ...interests, tags: res.guide?.interest.split(';') });
    setExtras({ ...extras, tags: res.guide?.extras.split(';') });
    setLanguage({ ...language, tags: res.guide?.language.split(';') });

    setRootCountry(resCountry.data);
    setProfile(res.guide);
    setIsloading(false);
  }, [API.getAdminProfile, API.getAllCountry, setIsloading, setProfile, setRootCountry]);

  useEffect(() => {
    fetchAdminProfile();
  }, [fetchAdminProfile]);

  useEffect(() => {
    const fetchCity = async () => {
      if (profile.country || country) {
        const resCity = await API.getCityOfCountry(profile.country || country);
        setRootCity(resCity.data);
      }
    };
    fetchCity();
  }, [profile.country, API.getCityOfCountry, setRootCity, country]);

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
      interest: interests.tags?.join(';'),
      extras: extras.tags?.join(';'),
      language: language.tags?.join(';'),
    });
    setIsloading(false);
  };

  return (
    <Form {...formItemLayout} form={form} name="Profile" onFinish={onFinish} scrollToFirstError>
      <Form.Item name="avatar">
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

      <Form.Item name="gender" label="Gender" style={{ marginBottom: 0 }}>
        <Row gutter={8}>
          <Col span={12}>
            <Select
              placeholder="Gender"
              key={profile.sex}
              defaultValue={!!profile.sex}
              onChange={value => {
                form.setFieldsValue({ sex: value });
              }}
            >
              <Option value>Male</Option>
              <Option value={false}>Female</Option>
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

      <Form.Item name="country" label="Country" style={{ marginBottom: 0 }}>
        <Row gutter={8}>
          <Col span={12}>
            <Select
              placeholder="Country"
              key={profile.country}
              defaultValue={profile.country}
              onChange={value => form.setFieldsValue({ country: value })}
            >
              {rootCountry?.map(item => (
                <Option value={item.code} key={item.code}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={12}>
            <Form.Item name="city" label="City">
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
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item
        name="education"
        label="Education"
        initialValue={
          profile.education && form.setFieldsValue({ education: education || profile.education })
        }
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="language"
        label="Language"
        initialValue={profile.language && form.setFieldsValue({ language: profile.language })}
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
        initialValue={profile.interests && form.setFieldsValue({ interests: profile.interests })}
      >
        <TagInterests
          createInfo={interests}
          setCreateInfo={setInterests}
          defaultTags={defaultTags.interests}
        />
      </Form.Item>

      <Form.Item
        name="extras"
        label="Extras"
        initialValue={profile.extras && form.setFieldsValue({ extras: profile.extras })}
      >
        <TagInterests
          createInfo={extras}
          setCreateInfo={setExtras}
          defaultTags={defaultTags.extras}
        />
      </Form.Item>

      <Form.Item
        name="experience"
        label="Experience"
        initialValue={
          profile.experience &&
          form.setFieldsValue({ experience: experience || profile.experience })
        }
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" loading={isloading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

GuideProfile.propTypes = {
  uid: PropTypes.string.isRequired,
};

export default GuideProfile;
