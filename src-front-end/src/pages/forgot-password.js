import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Input, Modal, Button } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { makeStyles } from '@material-ui/core/styles';
import * as API from '../apis';
import Layout from '../components/CustomLayout';
import GridContainer from '../components/Grid/GridContainer.js';
import GridItem from '../components/Grid/GridItem.js';
import Card from '../components/Card/Card.js';
import CardBody from '../components/Card/CardBody.js';
import CardHeader from '../components/Card/CardHeader.js';
import CardFooter from '../components/Card/CardFooter.js';
import Footer from '../components/Footer/Footer.js';
import styles from '../assets/jss/material-kit-react/views/loginPage.js';


const useStyles = makeStyles(styles);
const Text = styled.div`
  color: #5e5c60;
  padding-bottom : 20px;
`;

const ErrorMessage = styled.div`
  //padding-top: 15px;
  padding-bottom: 15px;
  color: red;
  font-weight: bold;
  text-align: center;
`;

function ForgotPassPage() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  
  const onFinish = async values => {
    if (loading) {
      return;
    }
    console.log(values)
    try {
      setLoading(true);
      setErrorMessage('');
      const { message, status } = await API.forgotPassword(values.email);
      setLoading(false);
      if (status === true) {          
        setErrorMessage('');
        Modal.info({
          title: 'Notice',
          content: (
            <div>
              <p>We have send a new password.<br/>
                Please check your email</p>                
            </div>
          ), 
          closable:false,
          keyboard:false,      
          centered:true,
          okText: 'Close',      
          onOk() {},
        });
        
      } else {
        setLoading(false);
        setErrorMessage(message);
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage('An error has occurred.');
    }
  };

  return (
    <Layout noLogin>
      <div className={classes.pageHeader}>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card >
                <CardHeader className={classes.cardHeader}>
                  <h2 style={{fontWeight:'bold', color:'#f12f60'}}><a href="/">LOCALGUIDEPAL</a></h2>
                </CardHeader>
                <CardBody>
                  <Text>
                    You forgot your password? Here you can easily retrieve a new password.
                  </Text>
                  <ErrorMessage>{errorMessage}</ErrorMessage>
                  <Form
                    name="forgotpass"
                    className="forgotpass-form"
                    onFinish={onFinish}
                  >
                    <Form.Item
                      name="email"
                      rules={[
                        { required: true, message: 'Please input your email!' },
                        { type: 'email', message: 'Email is not valid!'},
                      ]}
                    >
                      <Input size="large" prefix={<MailOutlined />} placeholder="Your email" />
                    </Form.Item>
                    
                    <Form.Item>
                      <Button 
                        size="large" 
                        type="primary" 
                        htmlType="submit"
                        style={{width:"100%"}}
                      >
                        Reset password
                      </Button>
                      <br/><br/>
                      Or <a href="/login">Login</a>
                    </Form.Item>
                  </Form>
                </CardBody>
              </Card>
              <CardFooter className={classes.cardFooter} />
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </Layout>
  );
}

export default ForgotPassPage;
