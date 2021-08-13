import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import { Form, Input, Select,  InputNumber, Row, Col, Spin, notification } from 'antd';
import Layout from '../components/CustomLayout';
import Button from "../components/Button";
import Parallax from '../components/Parallax/Parallax.js';
import SEO from '../components/SEO';
import { navigate } from 'gatsby';
// import Input from '../components/Input';
import Footer from '../components/Footer/Footer.js';
import { getUserProfile } from '../utils/auth';
import UploadAvatar from '../components/Input/UploadAvatar';
import * as API from '../apis';
import styles from '../assets/styles/profilePage.js';

const useStyles = makeStyles(styles);

const Wrapper = styled.div``;

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

const Field = styled.div`
  margin-bottom: 1.5rem;
`;

function UserProfile() {
  const uid = getUserProfile();
  //const [userProfile] = useState(getUserProfile());
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
    console.log(values);
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
  
  const handleNavigate = () => {
    navigate('/become-guide');
  }

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 6, // label size
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
        span: 8,
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
        <div className={classes.container} style={{backgroundColor: "#fafafa",border: "1px dashed #e9e9e9",borderRadius: "2px"}}>
          <FormWrapper form={form} {...formItemLayout} onFinish={onFinish} scrollToFirstError>
            
            <Form.Item name="profile" style={{ justifyContent: 'center',  paddingTop: '20px',paddingBottom: '0px'  }}>
              <h2>{profile.fullname} Profile</h2>
            </Form.Item>
            
            <Form.Item name="avatar" style={{ justifyContent: 'center',}}>
              <UploadAvatar uid={uid.uid} src={profile.avatar} title="" />
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
              key={profile.email === '' ? 'fullname' : profile.email}
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
              key={profile.mobile === '' ? 'mobile' : profile.mobile}
              initialValue={profile.mobile}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="job"
              label="Your job"
              initialValue={profile.job}
              key={profile.job === '' ? 'job' : profile.job}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="sex"
              label="Gender"
              initialValue={profile.sex === '0' ? '0' : '1'}
              key={profile.sex === '' ? 'sex' : profile.sex}
            >
              <Select
                placeholder="Gender"
                style={{ width: '150px' }}
                onChange={value => {
                  form.setFieldsValue({ sex: value });
                }}
              >
                <Select.Option value="1">Male</Select.Option>
                <Select.Option value="0">Female</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="age"
              label="Age"
              key={profile.age === '' ? 'age' : profile.age}
              initialValue={profile.age}
              style={{ flexGrow: 0.15 }}
            >
              <InputNumber style={{ width: '100px' }} />
            </Form.Item>

            <Form.Item
              name="country"
              label="Country"
              initialValue={profile.country}
              key={profile.country === '' ? 'country' : profile.country}
            >
              <Select
                placeholder="Country"
                style={{ width: '150px' }}
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
                placeholder="City"
                style={{ width: '150px' }}
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
              <Button type="primary" htmlType="submit">
                Update your Profile
              </Button> &nbsp;&nbsp;
              <Button color="rose" onClick={handleNavigate}>
                Become a guide
              </Button>
            </Form.Item>
            
          </FormWrapper>
        </div>        
        <Footer />
      </div>
    </Layout>
  );
}

UserProfile.propTypes = {};

export default UserProfile;
