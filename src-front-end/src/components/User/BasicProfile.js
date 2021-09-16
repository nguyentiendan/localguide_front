import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { Form, Input, Button, Select, InputNumber, Spin, message } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import _ from 'lodash';
import UploadAvatar from '../Input/UploadAvatar';
import * as API from '../../apis';
import styles from '../../assets/styles/profilePage.js';
import NoticeModal from './Modal/NoticeModal';

const useStyles = makeStyles(styles);

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

const formItemLayout = {
  labelCol: {
    xs: {
      // mobile
      span: 24,
    },
    sm: {
      // pc
      span: 6, // label size
    },
  },
  wrapperCol: {
    xs: {
      // mobile
      span: 24,
    },
    sm: {
      // pc
      span: 12, // input box size
    },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      // mobile
      span: 24,
      offset: 5,
    },
    sm: {
      // pc
      span: 24,
      offset: 10,
    },
  },
};

const { Option } = Select;

function BasicProfile({ uid, role }) {
  const classes = useStyles();
  const [form] = Form.useForm();
  // const { country } = form.getFieldsValue();
  const [profile, setProfile] = useState({});
  const [rootCity, setRootCity] = useState([]);
  const [rootCountry, setRootCountry] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState('');

  const country = useMemo(() => profile.country, [profile]);
  const countryCode = useMemo(() => {
    if (!rootCountry || !country) {
      return undefined;
    }
    const selectedCountry = _.find(rootCountry, c => c.name === country);
    return selectedCountry && selectedCountry.code;
  }, [country, rootCountry]);

  const fetchUserProfile = useCallback(async () => {
    setLoading(true);
    const res = await API.getUserProfile(uid);
    // show modal notice user become a guide
    if (res.data.role != role) {
      setVisible(true);
    }

    const resCountry = await API.getAllCountry();
    setRootCountry(resCountry.data);
    setProfile(res.data);
    setLoading(false);
  }, [API.getAllCountry, setLoading, setProfile, setRootCountry]);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  useEffect(() => {
    const fetchCity = async () => {
      if (profile?.country) {
        // const resCity = await API.getCityOfCountry(profile?.country);
        const countryDefault = _.find(rootCountry, { name: profile.country });
        const resCity = await API.getCityOfCountry(selectedCountryCode || countryDefault.code);
        setRootCity(resCity.data);
      }
    };
    fetchCity();
  }, [API.getCityOfCountry, profile?.country, setRootCity]);

  const handleSelectCountryAndCity = selectedCountry => {
    // form.setFieldsValue({ country: value });
    const fetchCity = async () => {
      if (profile.country || selectedCountry.value) {
        setLoading(true);
        const resCity = await API.getCityOfCountry(selectedCountry.value);
        setRootCity(resCity.data);
        setProfile({
          ...profile,
          city: null,
        });
        form.setFieldsValue({ city: null });
        setLoading(false);
      }
    };
    fetchCity();
  };

  const onFinishBasic = async values => {
    setLoading(true);
    const key = 'updatable';

    if (loading) {
      return;
    }
    try {
      const { status } = await API.updateBasic({
        ...values,
        country: values.country.label || country,
        uid,
      });
      if (status === true) {
        message.success({
          content: 'You have successfully updated your basic profile!',
          key,
          duration: 2,
          className: 'custom-class',
          style: {
            marginTop: '20vh',
          },
        });
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  return (
    <div>
      <Spin spinning={loading}>
        <FormWrapper
          form={form}
          {...formItemLayout}
          name="basic"
          onFinish={onFinishBasic}
          scrollToFirstError
        >
          <Form.Item style={{ justifyContent: 'center', paddingTop: '20px', paddingBottom: '0px' }}>
            <h2>{profile.fullname}'s Profile</h2>
          </Form.Item>

          <Form.Item name="avatar" style={{ justifyContent: 'center' }}>
            <UploadAvatar uid={uid} src={profile.avatar} title="" />
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
            key={profile.fullname === '' ? 'fullname' : profile.fullname}
            initialValue={profile.fullname}
          >
            <Input size="large" allowClear />
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
            key={profile.email === '' ? 'email' : profile.email}
            initialValue={profile.email}
          >
            <Input size="large" disabled={profile.email} />
          </Form.Item>

          <Form.Item
            name="mobile"
            label="Mobile"
            rules={[
              {
                required: true,
                message: 'Please input your Mobile phone!',
              },
              {
                max: 100,
                message: 'Value should be less than 12 number',
              },
            ]}
            key={profile.mobile === '' ? 'mobile' : profile.mobile}
            initialValue={profile.mobile}
          >
            <Input size="large" allowClear />
          </Form.Item>

          <Form.Item
            name="job"
            label="Your job"
            rules={[
              {
                required: true,
                message: 'Please input your job!',
              },
            ]}
            initialValue={profile.job}
            key={profile.job === '' ? 'job' : profile.job}
          >
            <Input size="large" allowClear />
          </Form.Item>

          <Form.Item
            name="sex"
            label="Gender"
            key={profile.sex === '' ? 'sex' : profile.sex}
            initialValue={profile.sex}
            rules={[
              {
                required: true,
                message: 'Please select your gender!',
              },
            ]}
          >
            <Select
              size="large"
              placeholder="Gender"
              style={{ width: '200px' }}
              onChange={value => {
                form.setFieldsValue({ sex: value });
              }}
            >
              <Select.Option value="Male">Male</Select.Option>
              <Select.Option value="Female">Female</Select.Option>
              <Select.Option value="Other">Other</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="age"
            label="Age"
            key={profile.age === '' ? 'age' : profile.age}
            initialValue={profile.age}
          >
            <InputNumber size="large" />
          </Form.Item>

          <Form.Item
            name="country"
            label="Country"
            rules={[
              {
                required: true,
                message: 'Please select your country!',
              },
            ]}
            initialValue={countryCode && { value: countryCode }}
            key={profile.country === '' ? 'country' : profile.country}
          >
            <Select
              labelInValue
              size="large"
              placeholder="Country"
              style={{ width: '200px' }}
              onChange={handleSelectCountryAndCity}
            >
              {rootCountry?.map(item => (
                <Select.Option value={item.code} key={item.code}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="city"
            label="City"
            rules={[
              {
                required: true,
                message: 'Please select your city!',
              },
            ]}
            initialValue={profile.city}
            key={profile.city === '' ? 'city' : profile.city}
          >
            <Select
              size="large"
              placeholder="City"
              style={{ width: '200px' }}
              onChange={value => {
                form.setFieldsValue({ city: value });
              }}
            >
              {rootCity?.map(item => (
                <Select.Option value={item.city_name} key={item.city_name}>
                  {item.city_name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button
              size="middle"
              type="primary"
              htmlType="submit"
              style={{ alignContent: 'center' }}
            >
              Update Basic Profile
              <RightOutlined />
            </Button>
          </Form.Item>
        </FormWrapper>
      </Spin>
      <NoticeModal visible={visible} />
    </div>
  );
}

BasicProfile.propTypes = {};

export default BasicProfile;
