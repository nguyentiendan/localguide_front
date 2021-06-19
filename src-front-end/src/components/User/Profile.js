import React, { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../../components/CustomLayout';
import Parallax from '../../components/Parallax/Parallax.js';
import SEO from '../../components/SEO';
import Footer from '../../components/Footer/Footer.js';
import { Form, Input, Button, Select,InputNumber, Spin, notification,Modal, Row,Col} from 'antd';
import { navigate } from 'gatsby';
import UploadAvatar from "../Input/UploadAvatar"
import * as API from '../../apis';
import styles from '../../assets/styles/profilePage.js';
import { getUserProfile, ISUSER } from '../../utils/auth';
import NoticeModal from "./NoticeModal"; 

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
  const uid = userProfile.uid
  if ( userProfile.role != ISUSER ) {
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
    if(res.data.reqActive === 1) {
      navigate('/app/start');
      return null;
    }
    //show modal notice user become a guide
    if(res.data.role != userProfile.role) {
      setVisible(true)
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
    await API.editProfile({
      ...values,
      uid,
    });
    notification.success({ message: 'Successfully updated your profile.' });
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
    {profile.reqActive === 0 && (
      <>
      <SEO title="User Profile" />
      <Parallax small filter image={require('../../assets/img/home-banner.jpg')} />
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container} style={{backgroundColor: "#fafafa",border: "1px dashed #e9e9e9",borderRadius: "2px"}}>
            <Spin spinning={loading}>
              <FormWrapper form={form} {...formItemLayout} onFinish={onFinish} scrollToFirstError>
                
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
                  ]}
                  key={profile.mobile === '' ? 'mobile' : profile.mobile}
                  initialValue={profile.mobile}
                >
                  <Input size="large"  />
                </Form.Item>

                <Form.Item
                  name="job"
                  label="Your job"
                  initialValue={profile.job}
                  key={profile.job === '' ? 'job' : profile.job}
                >
                  <Input size="large" />
                </Form.Item>

                <Form.Item 
                  name="sex" 
                  label="Gender" 
                  key={profile.sex === '' ? 'sex' : profile.sex}
                  initialValue={profile.sex === '0' ? '0' : '1'}
                >
                  
                  <Select
                    size="large" 
                    placeholder="Gender"
                    style={{ width: '200px' }}
                    //defaultValue={profile.sex === '0' ? '0' : '1'}
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
                  <Button style={{ margin: '0 8px' }}  type="primary" htmlType="submit">
                    Update Profile
                  </Button>
                  ||
                  <a href="#" onClick={() => setShowModal(true) } >  Become a tour guide?</a>
                </Form.Item>
                
              </FormWrapper>      
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
            <Button 
              key="back" 
              onClick={handleCancel}
            >
              Cancel
            </Button>,
            <Button 
              key="submit" 
              type="primary"
              loading={loading}
              onClick={handleOk}
            >
              Agree this terms
            </Button>,          
          ]}
        > 
          <p>Become a guide, please confirm ....Become a guide, please confirmBecome a guide, please confirmBecome a guide, please confirm</p>
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
        <NoticeModal visible={visible}  />
      </div>
      </>
   )} 
    </Layout>             
  );
}

Profile.propTypes = {};

export default Profile;
