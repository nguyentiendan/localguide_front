import React, { useState } from 'react';
import { Link, navigate } from 'gatsby';
import styled from 'styled-components';
import jwt from 'jsonwebtoken';
import { Form, Input, Button, Checkbox } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { makeStyles } from '@material-ui/core/styles';
import * as API from '../apis';
import { useLocalStorage } from '../utils/storage';
import { AUTH_TOKEN_KEY } from '../utils/auth';
import Layout from '../components/CustomLayout';
import GridContainer from '../components/Grid/GridContainer';
import GridItem from '../components/Grid/GridItem';
import Card from '../components/Card/Card';
import CardBody from '../components/Card/CardBody';
import CardHeader from '../components/Card/CardHeader';
import CardFooter from '../components/Card/CardFooter';
import Footer from '../components/Footer/Footer';
import styles from '../assets/jss/material-kit-react/views/loginPage';

const useStyles = makeStyles(styles);

const ForgotPasswordLink = styled(Link)`
  color: #7e7e7e;
`;

const ErrorMessage = styled.div`
  padding-top: 15px;
  padding-bottom: 15px;
  color: red;
  font-weight: bold;
  text-align: center;
`;

function LoginPage() {
  const classes = useStyles();
  const [authToken, setAuthToken] = useLocalStorage(AUTH_TOKEN_KEY);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (authToken) {
    navigate('/');
  }

  const onFinish = async values => {
    if (loading) {
      return;
    }

    try {
      setLoading(true);
      const {
        data: { Token, UID, Role },
        message,
        status,
      } = await API.login(values.email, values.password);

      if (status === true) {
        const { data: profile } = await API.getUserProfile({ token: Token, uid: UID });
        setLoading(false);
        setErrorMessage('');
        setAuthToken(jwt.sign({ ...profile, role: Role, token: Token }, 'tour-guide-pal'));
      } else {
        setLoading(false);
        setErrorMessage(message);
      }
    } catch (err) {
      setError('System error has occurred.');
      setLoading(false);
    }
  };

  return (
    <Layout noLogin>
      <div className={classes.pageHeader}>
        <div className={classes.container}>
          {/* <MainContent> */}
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card>
                <CardHeader className={classes.cardHeader}>
                  <h2 style={{ fontWeight: 'bold', color: '#f12f60' }}>
                    <a href="/">LOCALGUIDEPAL</a>
                  </h2>
                </CardHeader>
                <CardBody>
                  <ErrorMessage>{errorMessage}</ErrorMessage>
                  <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                  >
                    <Form.Item
                      name="email"
                      rules={[
                        { required: true, message: 'Please input your email!' },
                        { type: 'email', message: 'Email is not valid!' },
                      ]}
                    >
                      <Input size="large" prefix={<MailOutlined />} placeholder="Your email" />
                    </Form.Item>
                    <Form.Item
                      name="password"
                      rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                      <Input.Password
                        size="large"
                        placeholder="Your password"
                        prefix={<LockOutlined />}
                      />
                    </Form.Item>

                    <Form.Item>
                      <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                      </Form.Item>
                    </Form.Item>

                    <Form.Item>
                      <Button
                        size="large"
                        type="primary"
                        htmlType="submit"
                        style={{ width: '100%' }}
                      >
                        Log in
                      </Button>
                      <br />
                      <br />
                      Or <a href="/signup">register now!</a>
                    </Form.Item>
                  </Form>
                </CardBody>
                <CardFooter className={classes.cardFooter}>
                  <ForgotPasswordLink to="/forgot-password/">
                    Forgot your password?
                  </ForgotPasswordLink>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
          {/* </MainContent> */}
        </div>
        <Footer whiteFont />
      </div>
    </Layout>
  );
}

export default LoginPage;
