import React, { useState, useEffect, useCallback, useMemo } from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { Form, Input, Button, Select, InputNumber, Spin, message, Modal } from 'antd';
import { navigate } from 'gatsby';
import _ from 'lodash';
import Layout from '../CustomLayout';
import Parallax from '../Parallax/Parallax';
import SEO from '../SEO';
import Footer from '../Footer/Footer';
import UploadAvatar from '../Input/UploadAvatar';
import * as API from '../../apis';
import styles from '../../assets/styles/profilePage';
import { getUserProfile, ISUSER } from '../../utils/auth';

const useStyles = makeStyles(styles);

const formItemLayout = {
  labelCol: {
    xs: {
      // mobile
      span: 12,
    },
    sm: {
      // pc
      span: 6, // label size
    },
  },
  wrapperCol: {
    xs: {
      // mobile
      span: 12,
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
      span: 12,
      offset: 5,
    },
    sm: {
      // pc
      span: 12,
      offset: 10,
    },
  },
};

function Profile() {
  const [userProfile] = useState(getUserProfile());
  const { uid } = userProfile;
  if (userProfile.role != ISUSER) {
    navigate('/');
    return null;
  }

  const classes = useStyles();
  const [form] = Form.useForm();
  const [profile, setProfile] = useState({});
  const [rootCity, setRootCity] = useState([]);
  const [rootCountry, setRootCountry] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState('');

  const country = useMemo(() => profile.country, [profile]);
  const countryCode = useMemo(() => {
    if (!rootCountry || !country) {
      return undefined;
    }
    const selectedCountry = _.find(rootCountry, c => c.name === country);
    return selectedCountry && selectedCountry.code;
  }, [country, rootCountry]);

  const handleBecomeGuide = () => {
    navigate('/app/becomeGuide');
  };

  const fetchUserProfile = useCallback(async () => {
    setLoading(true);
    const res = await API.getUserProfile(uid);
    const resCountry = await API.getAllCountry();
    setRootCountry(resCountry.data);
    setProfile(res.data);
    setLoading(false);
  }, [API.getAllCountry, setLoading, setProfile, setRootCountry]);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const onFinish = async values => {
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
      message.error(e)
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchCity = async () => {
      if (profile?.country) {
        const countryDefault = _.find(rootCountry, { name: profile.country });
        const resCity = await API.getCityOfCountry(selectedCountryCode || countryDefault.code);
        setRootCity(resCity.data);
      }
    };
    fetchCity();
  }, [API.getCityOfCountry, profile?.country, setRootCity]);

  const handleSelectCountryAndCity = selectedCountry => {
    setSelectedCountryCode(selectedCountry.label);
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

  return (
    <Layout>    
      <>
        <SEO title="User Profile" />
        <Parallax small filter image={require('../../assets/img/home-banner.jpg')} />
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div
            className={classes.description}
            style={{
              backgroundColor: '#fafafa',
              border: '1px dashed #e9e9e9',
              borderRadius: '2px',
            }}
          >
            <Spin spinning={loading}>
              <Form form={form} {...formItemLayout} onFinish={onFinish} scrollToFirstError>
                <Form.Item
                  style={{ justifyContent: 'center', paddingTop: '20px', paddingBottom: '0px' }}
                >
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
                      max: 50,
                      message: 'Value should be less than 50 character',
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
                  ]}
                  key={profile.mobile === '' ? 'mobile' : profile.mobile}
                  initialValue={profile.mobile}
                >
                  <Input size="large" allowClear />
                </Form.Item>

                <Form.Item
                  name="job"
                  label="Your job"
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
                    allowClear
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

                {/*<Form.Item
                  name="country"
                  label="Country"
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
                </Form.Item>*/}

                <Form.Item {...tailFormItemLayout}>
                  <Button
                    size="large"
                    type="primary"
                    htmlType="submit"
                    style={{ margin: '0 8px' }}
                  >
                    Update Profile
                  </Button>
                  ||{' '}
                  <a href="#" onClick={handleBecomeGuide}>
                    {' '}
                    Become a tour guide?
                  </a>
                </Form.Item>
              </Form>
            </Spin>
          </div>
          <Footer />                      
        </div>
      </>      
    </Layout>
  );
}

Profile.propTypes = {};

export default Profile;
