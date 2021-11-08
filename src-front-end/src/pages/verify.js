import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { Modal, Button, Form, Input } from 'antd';
import { navigate } from 'gatsby';
import { useLocalStorage } from '../utils/storage';
import { AUTH_TOKEN_KEY } from '../utils/auth';
import * as API from '../apis';
import Layout from '../components/CustomLayout';
import SEO from '../components/SEO';
import GridContainer from '../components/Grid/GridContainer.js';
import GridItem from '../components/Grid/GridItem.js';
import Card from '../components/Card/Card.js';
import CardBody from '../components/Card/CardBody.js';
import CardHeader from '../components/Card/CardHeader.js';
import Footer from '../components/Footer/Footer.js';
import styles from '../assets/jss/material-kit-react/views/loginPage.js';
import image from '../assets/img/bg7.jpg';
import qs from 'query-string';
import { MailOutlined, LockOutlined } from '@ant-design/icons';

const useStyles = makeStyles(styles);

const ErrorMessage = styled.div`
  padding-top: 15px;
  padding-bottom: 15px;
  color: red;
  font-weight: bold;
  text-align: center;
`;

const Text = styled.div`
  color: #5e5c60;
`;

function VerifyPage() {
  const [cardAnimaton, setCardAnimation] = useState('');
  const [authToken, setAuthToken] = useLocalStorage(AUTH_TOKEN_KEY);
  const classes = useStyles();  
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const queryStr = qs.parse(location.search);

  if (authToken) {    
    navigate('/');
  }

  const onFinish = async (value) => {
    if (loading) {
      return;
    }
    
    try {
      setLoading(true);
      const { message, status } = await API.verify(value.email, value.activeCode);

      if (status === true) {
        Modal.info({
          title: 'Notice',
          content: (
            <div>
              <p>Your account was verify successful</p>
            </div>
          ),
          closable: false,
          keyboard: false,
          centered: true,
          okText: 'Close',
          onOk() {
            navigate('/login');
          },
        });
        setLoading(false);  
      } else {
        setLoading(false);
        setErrorMessage(message);
      }
    } catch (err) {
      setLoading(false);
      setErrorMessage('An error has occurred.');
    }    
  };

  return (
    <Layout noLogin>
      <SEO title="Verify" />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
        }}
      >
        <div className={classes.container}>
          <GridContainer justifyContent="center">
            <GridItem xs={12} sm={12} md={5}>
              <Card className={classes[cardAnimaton]}>
                <CardHeader color="warning" className={classes.cardHeader}>
                  <h1>Account Verify</h1>
                </CardHeader>
                <CardBody>
                  <Text>Please input email and active code to verify your account</Text>
                  <ErrorMessage>{errorMessage}</ErrorMessage>
                  <Form
                    name="verify_login"
                    className="verify-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                  >
                    <Form.Item
                      name="email"
                      rules={[
                        { required: true, message: 'Please input your email!' },
                        { type: 'email', message: 'Email is not valid!' },
                      ]}
                      initialValue={queryStr.email}
                    >
                      <Input size="large" prefix={<MailOutlined />} placeholder="Your email" disabled/>
                    </Form.Item>

                    <Form.Item
                      name="activeCode"
                      rules={[
                        { required: true, message: 'Please input your active code!' },                        
                      ]}
                      initialValue={queryStr.activeCode}
                    >
                      <Input size="large" prefix={<LockOutlined  />} placeholder="Your active code" disabled/>
                    </Form.Item>
                    <Form.Item>
                      <Button
                        size="large"
                        type="primary"
                        htmlType="submit"
                        style={{ width: '100%' }}
                        loading={loading}
                        disabled={loading}
                      >
                        Verify your account
                      </Button>
                      <br />
                      <br />
                      Or <a href="/signup">register now!</a>
                    </Form.Item>
                  </Form>                  
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </Layout>
  );
}

export default VerifyPage;
