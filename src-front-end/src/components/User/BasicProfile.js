import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { Form, Button, Input, Select,  InputNumber, Spin, message, notification,Row, Col} from 'antd';
import { navigate } from 'gatsby';
import UploadAvatar from "../Input/UploadAvatar"
import * as API from '../../apis';
import styles from '../../assets/styles/profilePage.js';

const useStyles = makeStyles(styles);

function BasicProfile({uid}) { 
  //const [userProfile] = useState(getUserProfile());
  const classes = useStyles();
  const [form] = Form.useForm();
  const { country } = form.getFieldsValue();
  const [profile, setProfile] = useState({});
  const [rootCity, setRootCity] = useState([]);
  const [rootCountry, setRootCountry] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const fetchAdminProfile = useCallback(async () => {
    setLoading(true);
    const res = await API.getUserProfile(uid);
    const resCountry = await API.getAllCountry();
    setRootCountry(resCountry.data);
    setProfile(res.data);
    setLoading(false);
  }, [API.getAdminProfile, API.getAllCountry, setLoading, setProfile, setRootCountry]);

  useEffect(() => {
    fetchAdminProfile();
  }, [fetchAdminProfile]);

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
  
  return (
    <Spin spinning={loading}>    
      {/*<FormWrapper form={form} {...formItemLayout} onFinish={onFinishBasic} scrollToFirstError>*/}
        
        <Form.Item style={{ justifyContent: 'center',  paddingTop: '20px',paddingBottom: '0px'  }}>
          <h2>{profile.fullname}'s Profile</h2>
        </Form.Item>
        
        <Form.Item name="avatar" style={{ justifyContent: 'center',}}>
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
          <Input size="large" />          
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
          <Input size="large"  disabled={profile.email} />
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
          <Input size="large"  />
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
          <Input size="large" />
        </Form.Item>

        <Form.Item 
          name="sex" 
          label="Gender" style={{ marginBottom: 0 }}
          key={profile.sex === '' ? 'sex' : profile.sex}
          initialValue={profile.sex === '0' ? '0' : '1'}
        >
          <Row gutter={8}>
            <Col span={12}>
              <Select
                size="large" 
                placeholder="Gender"
                //style={{ width: '150px' }}
                defaultValue={profile.sex === '0' ? '0' : '1'}
                onChange={value => {
                  form.setFieldsValue({ sex: value });
                }}
              >
                <Select.Option value='1'>Male</Select.Option>
                <Select.Option value='0'>Female</Select.Option>
              </Select>
            </Col>
            <Col span={12}>
              <Form.Item
                name="age"
                label="Age"
                key={profile.age === '' ? 'age' : profile.age}
                initialValue={profile.age}
                style={{ flexGrow: 0.15 }}
              >
                <InputNumber size="large" />
              </Form.Item>
            </Col>
          </Row>
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
      {/*</FormWrapper>*/}
    </Spin>
  );
}

BasicProfile.propTypes = {};

export default BasicProfile;
