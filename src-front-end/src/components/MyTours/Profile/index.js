import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Form, Input, Select, Button, InputNumber, Row, Col, Spin, notification } from 'antd';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styled from 'styled-components';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import * as API from '../../../apis';
import TagInterests from '../../HandleTag/Interests';
import UploadAvatar from '../../Input/UploadAvatar';
import UploadPhotos from './UploadPhotos';

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

const GuideProfile = ({ uid }) => {
  const [form] = Form.useForm();
  const { country } = form.getFieldsValue();
  const [profile, setProfile] = useState({});
  const [rootCountry, setRootCountry] = useState([]);
  const [rootCity, setRootCity] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [photos, setPhotos] = useState([]);
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
  const fetchGuideProfile = useCallback(async () => {
    setIsloading(true);
    const res = await API.getGuideProfile(uid);
    const resCountry = await API.getAllCountry();
    setInterests({
      ...interests,
      tags: res.guide?.interest ? res.guide?.interest?.split(';') : [],
    });
    setExtras({ ...extras, tags: res.guide?.extras ? res.guide?.extras?.split(';') : [] });
    setLanguage({ ...language, tags: res.guide?.language ? res.guide?.language?.split(';') : [] });

    setRootCountry(resCountry.data);
    setProfile(res.guide);
    setIsloading(false);
  }, [API.getAdminProfile, API.getAllCountry, setIsloading, setProfile, setRootCountry]);

  useEffect(() => {
    fetchGuideProfile();
  }, [fetchGuideProfile]);

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
    const fetchPhotos = async () => {
      setIsloading(true);
      const res = await API.getPhotosGuide({ uid });
      setPhotos(res.data);
      setIsloading(false);
    };
    fetchPhotos();
  }, [setPhotos, API.getPhotosGuide, setIsloading]);

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

  const onFinish = async values => {
    console.log(values);
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

  const editorRef = useRef();

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
          <UploadAvatar uid={uid} src={profile.avatar} title="Guide" />
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

        <Form.Item name="job" label="Your job" key={profile.job} initialValue={profile.job}>
          <Input />
        </Form.Item>

        <Form.Item
          name="sex"
          label="Gender"
          style={{ marginBottom: 0 }}
          initialValue={profile.sex === '0' ? '0' : '1'}
        >
          <Row gutter={8}>
            <Col span={12}>
              <Select
                placeholder="Gender"
                key={profile.sex}
                // defaultValue={profile.sex === '0' ? '0' : '1'}
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

        <Form.Item
          name="country"
          label="Country"
          style={{ marginBottom: 0 }}
          initialValue={profile.country}
        >
          <Row gutter={8}>
            <Col span={12}>
              <Select
                placeholder="Country"
                key={profile.country}
                // defaultValue={profile.country}
                onChange={handleSelectCountryAndCity}
              >
                {rootCountry?.map(item => (
                  <Option value={item.code} key={item.code}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col span={12}>
              <Form.Item name="city" label="City" initialValue={profile.city}>
                <Select
                  placeholder="City"
                  key={profile.city}
                  // defaultValue={profile.city}
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
          key={profile.education}
          initialValue={profile.education}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="specialities"
          label="Certification"
          key={profile.specialities}
          initialValue={profile.specialities}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="language"
          label="Language"
          key={profile.language}
          initialValue={profile.language}
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
          key={profile.interests}
          initialValue={profile.interests}
        >
          <TagInterests
            createInfo={interests}
            setCreateInfo={setInterests}
            defaultTags={defaultTags.interests}
          />
        </Form.Item>

        <Form.Item name="extras" label="Extras" key={profile.extras} initialValue={profile.extras}>
          <TagInterests
            createInfo={extras}
            setCreateInfo={setExtras}
            defaultTags={defaultTags.extras}
          />
        </Form.Item>

        <Form.Item
          name="intro"
          label="Introduction"
          rules={[
            {
              max: 255,
              message: 'Value should be less than 255 character',
            },
          ]}
          key={profile.intro}
          initialValue={profile.intro}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          name="experience"
          label="Experience"
          key={profile.experience}
          initialValue={profile.experience}
        >
          <div>
            <SunEditor
              ref={editorRef}
              setContents={profile.experience}
              lang="en"
              // width="670"
              height="300"
              placeholder="Please type content here..."
              showToolbar
              enableToolbar
              onChange={value => {
                form.setFieldsValue({ experience: value });
              }}
              setOptions={{
                buttonList: [
                  [
                    'undo',
                    'redo',
                    'font',
                    'fontSize',
                    'formatBlock',
                    'blockquote',
                    'bold',
                    'underline',
                    'italic',
                    'strike',
                    'subscript',
                    'superscript',
                    'fontColor',
                    'hiliteColor',
                    'textStyle',
                    'removeFormat',
                    'outdent',
                    'indent',
                    'align',
                    'horizontalRule',
                    'list',
                    'lineHeight',
                    'link',
                    'image',
                    'video',
                    'showBlocks',
                    'codeView',
                    'preview',
                    'fullScreen',
                  ],
                ],
              }}
            />
          </div>
        </Form.Item>

        <Form.Item label="Photos">
          <UploadPhotos
            photos={photos}
            uid={uid}
            setPhotos={setPhotos}
            setIsloading={setIsloading}
          />
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

GuideProfile.propTypes = {
  uid: PropTypes.string.isRequired,
};

export default GuideProfile;
