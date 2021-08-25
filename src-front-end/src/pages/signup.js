import React, { useState, useEffect } from 'react';
import { Link, navigate } from 'gatsby';
import classNames from 'classnames';
import styled from 'styled-components';
import { Modal, Form, Input, Button, Checkbox } from 'antd';
import { MailOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';

import { makeStyles } from '@material-ui/core/styles';
import * as API from '../apis';
import breakpoints from '../assets/styles/breakpoints';
import SEO from '../components/SEO';
import Layout from '../components/CustomLayout';
import GridContainer from '../components/Grid/GridContainer.js';
import GridItem from '../components/Grid/GridItem.js';
import Card from '../components/Card/Card.js';
import CardBody from '../components/Card/CardBody.js';
import CardHeader from '../components/Card/CardHeader.js';
import CardFooter from '../components/Card/CardFooter.js';
import Footer from '../components/Footer/Footer.js';
import styles from '../assets/jss/material-kit-react/views/loginPage.js';

import { set } from '../utils/storage';

const useStyles = makeStyles(styles);

const TermLink = styled(Link)`
  color: #7e7e7e;

  @media (max-width: ${breakpoints.sm}) {
    display: inline-block;
    transform: translateY(-100%);
  }
`;

const ErrorMessage = styled.div`
  padding-top: 15px;
  padding-bottom: 15px;
  color: red;
  font-weight: bold;
  text-align: center;
`;

const MainContent = styled.div`
  //min-height: 200px;
  width: 100%;
  margin-top: 16px;
  //padding-top: 80px;
  //text-align: center;
  //color: #cccccc;
  padding-left: 15px;
  padding-right: 15px;
  background-color: #f8f8f8;
  border: 1px dashed #e9e9e9;
  border-radius: 2px;
`;

const TermAndService = styled.div`
  width: 100%;
  margin-top: 25px;
  color: #191970;
`;

const Brand = styled.div`
  color: #f12f60;
  font-weight: bold;
  font-size: 25px;
`;

const Text = styled.div`
  color: #5e5c60;
  padding-bottom: 10px;
`;

function SignUpPage() {
  const classes = useStyles();
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState({});

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = async values => {
    if (loading) {
      return;
    }

    try {
      setLoading(true);
      const reqActive = 0;
      const { message, status } = await API.register(
        values.fullname,
        values.email,
        values.password,
        reqActive
      );

      if (status === true) {
        Modal.info({
          title: 'Thank you',
          content: (
            <div>
              <p>Your account was created successful</p>
              <p>Please check your email to active your account</p>
            </div>
          ),
          closable: false,
          keyboard: false,
          centered: true,
          okText: 'Close',
          onOk() {
            navigate('/');
          },
        });
      } else {
        setError(message);
        setLoading(false);
      }
    } catch (err) {
      setError('System error has occurred.');
      setLoading(false);
    }
  };

  const checkEmail = async email => {
    /* const data = await API.checkEmail(email);
    console.log(data.status)
    if (data.status === true) {
      return true
    } else {
      return false
    }
    */
    /* if(email === "tiendanvn@gmail.com") {
     console.log("true")
     return true
   } else {
    console.log("false")
    return false
   } */
  };

  return (
    <Layout noLogin>
      <SEO title="Create Account" />
      <div className={classes.pageHeader}>
        <div className={classes.container}>
          {/* <Brand>Localguidepal</Brand> */}
          <MainContent>
            <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
                <Card>
                  <CardHeader className={classes.cardHeader}>
                    <h2 style={{ fontWeight: 'bold', color: '#f12f60' }}>
                      <a href="/">LOCALGUIDEPAL</a>
                    </h2>
                  </CardHeader>

                  <CardBody>
                    <Text>Create tourist to to booking tour</Text>
                    <ErrorMessage>{error}</ErrorMessage>
                    <Form form={form} name="signup" onFinish={onFinish} scrollToFirstError>
                      <Form.Item
                        name="fullname"
                        rules={[
                          { required: true, message: 'Please input tourist name' },
                          { min: 5 },
                          { max: 20 },
                        ]}
                      >
                        <Input size="large" prefix={<UserOutlined />} placeholder="Tourist name" />
                      </Form.Item>

                      <Form.Item
                        name="email"
                        hasFeedback
                        rules={[
                          { required: true, message: 'Please input your Email!' },
                          { type: 'email', message: 'Email is not valid!' },
                          /* ({  }) => ({
                            validator(_, value) {
                              if (!value || checkEmail(value) ) {         
                                return Promise.reject(new Error('Your email already registed!'));  
                              }
                              return Promise.resolve(new Error('OKOK'));                              
                            },
                          }), */
                        ]}
                      >
                        <Input
                          size="large"
                          prefix={<MailOutlined />}
                          placeholder="Your email address"
                          onChange={event => checkEmail(event.target.value)}
                        />
                      </Form.Item>

                      <Form.Item
                        name="password"
                        rules={[
                          { required: true, message: 'Please input your Password!' },
                          { min: 3 },
                          { max: 15 },
                        ]}
                      >
                        <Input.Password
                          size="large"
                          placeholder="Password"
                          prefix={<LockOutlined />}
                        />
                      </Form.Item>

                      <Form.Item
                        name="confirm"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: 'Please confirm your password!',
                          },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                              }
                              return Promise.reject(
                                new Error('The two passwords that you entered do not match!')
                              );
                            },
                          }),
                        ]}
                      >
                        <Input.Password
                          size="large"
                          placeholder="Confirm password"
                          prefix={<LockOutlined />}
                        />
                      </Form.Item>

                      <Form.Item>
                        <Form.Item
                          name="agreement"
                          valuePropName="checked"
                          rules={[
                            {
                              validator: (_, value) =>
                                value
                                  ? Promise.resolve()
                                  : Promise.reject(new Error('Should accept agreement')),
                            },
                          ]}
                          noStyle
                        >
                          <Checkbox>
                            I have read the <a href="">agreement</a>
                          </Checkbox>
                        </Form.Item>
                      </Form.Item>

                      <Form.Item shouldUpdate>
                        {() => (
                          <Button
                            size="large"
                            type="primary"
                            htmlType="submit"
                            style={{ width: '100%' }}
                            disabled={
                              !form.isFieldsTouched(true) ||
                              !!form.getFieldsError().filter(({ errors }) => errors.length).length
                            }
                          >
                            Create Tourist
                          </Button>
                        )}
                      </Form.Item>
                      <Form.Item>
                        Or <a href="/login">Have a account ?</a>
                      </Form.Item>
                    </Form>
                  </CardBody>
                  {/* <CardFooter className={classes.cardFooter}>
                    <TermLink to="#">Localguidepal Term and Service</TermLink>
                  </CardFooter> */}
                </Card>
              </GridItem>

              <GridItem xs={12} sm={12} md={8}>
                <TermAndService>
                  <h2 style={{ fontWeight: 'bold', color: '#f12f60' }}>
                    Tourist Terms and Service
                  </h2>
                  <p>
                    Before creating a guide account, please read carefully and agree to the
                    following terms
                  </p>
                  <ul>
                    <li>
                      In publishing and graphic design, Lorem ipsum is a placeholder text commonly
                      used to demonstrate the visual form of a document or a typeface without
                      relying on meaningful content.{' '}
                    </li>
                    <li>
                      In publishing and graphic design, Lorem ipsum is a placeholder text commonly
                      used to demonstrate the visual form of a document or a typeface without
                      relying on meaningful content.{' '}
                    </li>
                    <li>
                      In publishing and graphic design, Lorem ipsum is a placeholder text commonly
                      used to demonstrate the visual form of a document or a typeface without
                      relying on meaningful content.{' '}
                    </li>
                    <li>
                      In publishing and graphic design, Lorem ipsum is a placeholder text commonly
                      used to demonstrate the visual form of a document or a typeface without
                      relying on meaningful content.{' '}
                    </li>
                    <li>
                      In publishing and graphic design, Lorem ipsum is a placeholder text commonly
                      used to demonstrate the visual form of a document or a typeface without
                      relying on meaningful content.{' '}
                    </li>
                    <li>
                      In publishing and graphic design, Lorem ipsum is a placeholder text commonly
                      used to demonstrate the visual form of a document or a typeface without
                      relying on meaningful content.{' '}
                    </li>
                  </ul>
                </TermAndService>
              </GridItem>
            </GridContainer>
          </MainContent>
        </div>
        <Footer whiteFont />
      </div>
    </Layout>
  );
}

export default SignUpPage;
