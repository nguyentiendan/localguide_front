import React, { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { Form, Input, Button, Select, InputNumber, Spin, message, Modal } from 'antd';
import { navigate } from 'gatsby';
import Layout from '../CustomLayout';
import Parallax from '../Parallax/Parallax.js';
import SEO from '../SEO';
import Footer from '../Footer/Footer.js';
import UploadAvatar from '../Input/UploadAvatar';
import * as API from '../../apis';
import styles from '../../assets/styles/profilePage.js';
import { getUserProfile, ISUSER } from '../../utils/auth';
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

function Profile() {
  const [userProfile] = useState(getUserProfile());
  const { uid } = userProfile;
  if (userProfile.role != ISUSER || userProfile.reqActive == 2) {
    navigate('/');
    return null;
  }

  const classes = useStyles();
  const [form] = Form.useForm();
  const { country } = form.getFieldsValue();
  const [profile, setProfile] = useState({});
  const [rootCity, setRootCity] = useState([]);
  const [rootCountry, setRootCountry] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleOk = () => {
    navigate('/app/becomeGuide');
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const fetchUserProfile = useCallback(async () => {
    setLoading(true);
    const res = await API.getUserProfile(uid);
    if (res.data.reqActive === 1) {
      navigate('/app/start');
      return null;
    }
    // show modal notice user become a guide
    if (res.data.role != userProfile.role) {
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

  const onFinish = async values => {
    setLoading(true);
    const key = 'updatable';

    if (loading) {
      return;
    }
    try {
      const { status } = await API.updateBasic({
        ...values,
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
        setLoading(true);
        const resCity = await API.getCityOfCountry(value || profile.country);
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

  return (
    <Layout>
      {profile.reqActive === 0 && (
        <>
          <SEO title="User Profile" />
          <Parallax small filter image={require('../../assets/img/home-banner.jpg')} />
          <div className={classNames(classes.main, classes.mainRaised)}>
            <div
              className={classes.container}
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

                  <Form.Item
                    name="country"
                    label="Country"
                    initialValue={profile.country}
                    key={profile.country === '' ? 'country' : profile.country}
                  >
                    <Select
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
                  </Form.Item>

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
                    <a href="#" onClick={() => setShowModal(true)}>
                      {' '}
                      Become a tour guide?
                    </a>
                  </Form.Item>
                </Form>
              </Spin>
            </div>
            <Footer />

            <Modal
              visible={showModal}
              title="Guide Terms"
              closable="true"
              onOk={handleOk}
              onCancel={handleCancel}
              width={800}
              footer={[
                <Button key="back" onClick={handleCancel}>
                  Cancel
                </Button>,
                <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                  Agree this terms
                </Button>,
              ]}
            >
              <p>
                Become a guide, please confirm ....Become a guide, please confirmBecome a guide,
                please confirmBecome a guide, please confirm
              </p>
              <ul>
                <li>Some contents...</li>
                <li>Some contents...</li>
                <li>Some contents...</li>
                <li>Some contents...</li>
                <li>Some contents...</li>
                <li>Some contents...</li>
                <li>Some contents...</li>
                <li>Some contents...</li>
              </ul>
            </Modal>
            <NoticeModal visible={visible} />
          </div>
        </>
      )}
    </Layout>
  );
}

Profile.propTypes = {};

export default Profile;
