import React,{useState, useEffect, useCallback} from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import { LockOutlined,} from '@ant-design/icons';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../../components/CustomLayout';
import Parallax from '../../components/Parallax/Parallax.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import GridItem from '../../components/Grid/GridItem.js';
import Card from '../../components/Card/Card.js';
import CardBody from '../../components/Card/CardBody.js';
import CardHeader from '../../components/Card/CardHeader.js';
import CardFooter from '../../components/Card/CardFooter.js';
import Footer from '../../components/Footer/Footer.js';
import { Form, Input, Button, Spin } from 'antd';
import * as API from '../../apis';
import { getUserProfile, ISUSER } from '../../utils/auth';
import { navigate } from 'gatsby';
import styles from '../../assets/styles/profilePage.js';
import ChangePassModal from "./Modal/ChangePassModal";
const useStyles = makeStyles(styles);

const Text = styled.div`
  color: #5e5c60;
  padding-bottom : 20px;
`;

const ChangePass = () => {
  const [form] = Form.useForm();
  const classes = useStyles();
  const [visible, setVisible] = useState(false);
  const [userProfile] = useState(getUserProfile());
  const uid = userProfile.uid
  
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({});
  
  const fetchUserProfile = useCallback(async () => {
    setLoading(true);
    const res = await API.getUserProfile(uid);    
    //show modal notice user become a guide
    if(res.data.role != userProfile.role) {
      setVisible(true)
    }
    if (res.data.role != ISUSER ) {
      navigate('/');
      return null;
    }
    
    setProfile(res.data);    
    setLoading(false);
  }, []);

  useEffect(() => {    
    fetchUserProfile();    
  }, []);
  
  const onFinish = async values => {
    if (loading) {
      return;
    }
    
    try {
      setLoading(true);    
      const { status } = await API.changePass(uid, values.password);          
      if (status === true) {        
        setVisible(true)
      } else {                
        setLoading(false);
      }
    } catch (err) {  
      console.log(err)          
      setLoading(false);
    }      
  };

  return (    
    <Layout>      
      <Parallax small filter image={require('../../assets/img/home-banner.jpg')} />
      <Spin spinning={loading}>
        <div className={classNames(classes.main, classes.mainRaised)} >
          <div className={classes.container} style={{backgroundColor: "#fafafa",border: "1px dashed #e9e9e9",borderRadius: "2px"}}>
            <GridContainer  justify="center">              
              <GridItem xs={12} sm={12} md={5}>
                <Card>
                  <CardHeader className={classes.cardHeader}>
                    <h2 style={{fontWeight:'bold', color:'#f12f60'}}><a href="/">Change Password</a></h2>
                  </CardHeader>
                  
                  <CardBody>
                    <Text>Change new password for more security</Text>
                    {/*<ErrorMessage>{error}</ErrorMessage>*/}
                    <Form form={form}  name="changepass" onFinish={onFinish} scrollToFirstError>                      
                      <Form.Item
                        name="password"
                        rules={[
                          { required: true, message: 'Please input your Password!' },
                          { min:8 },
                          { max:20 }
                        ]}                        
                      >
                        <Input.Password 
                          size="large"
                          placeholder="New password"
                          prefix={<LockOutlined />}
                          allowClear
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
                              return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                          }),
                        ]}                        
                      >
                        <Input.Password 
                          size="large"
                          placeholder="Confirm password"
                          autoComplete="off"
                          prefix={<LockOutlined />}
                          allowClear
                        />
                      </Form.Item>

                      <Form.Item shouldUpdate>
                        {() => (
                          <Button 
                            size="large" 
                            type="primary"
                            htmlType="submit"
                            style={{width:"100%"}}
                            disabled={
                              !form.isFieldsTouched(true) ||
                              !!form.getFieldsError().filter(({ errors }) => errors.length).length                                                     
                            }
                          >
                            Change Password
                          </Button>                          
                        )} 
                      </Form.Item>
                    </Form>  
                  </CardBody>
                  {/*<CardFooter className={classes.cardFooter}>
                    <TermLink to="#">Localguidepal Term and Service</TermLink>
                  </CardFooter>*/}
                </Card>
              </GridItem>
            </GridContainer>    
          </div>
          <Footer />
        </div>
      </Spin>
      <ChangePassModal visible={visible}/>
    </Layout>
  );
}

export default ChangePass;
