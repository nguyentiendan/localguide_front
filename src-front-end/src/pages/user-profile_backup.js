import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import { Form, Input, Select, Button, InputNumber, Row, Col, Spin, notification } from 'antd';
import Layout from '../components/CustomLayout';
import Parallax from '../components/Parallax/Parallax.js';
import SEO from '../components/SEO';
import GridContainer from '../components/Grid/GridContainer.js';
import GridItem from '../components/Grid/GridItem.js';
// import Input from '../components/Input';
import Footer from '../components/Footer/Footer.js';
import { getUserProfile } from '../utils/auth';
import UserProfileComponent from '../components/User';
import UploadAvatar from '../components/Input/UploadAvatar';
import * as API from '../apis';
import styles from '../assets/styles/profilePage.js';

const useStyles = makeStyles(styles);

const Wrapper = styled.div``;
const Field = styled.div`
  margin-bottom: 1.5rem;
`;

function UserProfile() {
  const uid = getUserProfile();

  const [userProfile] = useState(getUserProfile());
  const classes = useStyles();

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
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
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

  return (
    <Layout>
      <SEO title="User Profile" />
      <Parallax small filter image={require('../assets/img/home-banner.jpg')} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <div className={classes.description}>
                <Form {...layout}>
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

                  <Form.Item
                    name="job"
                    label="Your job"
                    initialValue={profile.job}
                    key={profile.job}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item name="sex" label="Gender">
                    <Select
                      placeholder="Gender"
                      key={profile.sex}
                      style={{ width: '150px' }}
                      defaultValue={profile.sex === '0' ? '0' : '1'}
                      onChange={value => {
                        form.setFieldsValue({ sex: value });
                      }}
                    >
                      <Option value="1">Male</Option>
                      <Option value="0">Female</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="age"
                    label="Age"
                    key={profile.age}
                    initialValue={profile.age}
                    style={{ flexGrow: 0.15 }}
                  >
                    <InputNumber style={{ width: '100px' }} />
                  </Form.Item>

                  <Form.Item name="country" label="Country">
                    <Select
                      placeholder="Country"
                      key={profile.country}
                      style={{ width: '150px' }}
                      defaultValue={profile.country}
                      onChange={handleSelectCountryAndCity}
                    >
                      {rootCountry?.map(item => (
                        <Option value={item.code} key={item.code}>
                          {item.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item name="city" label="City">
                    <Select
                      placeholder="City"
                      key={profile.city}
                      style={{ width: '150px' }}
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

                  <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                      Update your Profile
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </GridItem>
          </GridContainer>
        </div>
        {/* <Wrapper>
          <UserProfileComponent uid={userProfile?.uid} />
        </Wrapper> */}
        <Footer />
      </div>
    </Layout>
  );
}

UserProfile.propTypes = {};

export default UserProfile;
