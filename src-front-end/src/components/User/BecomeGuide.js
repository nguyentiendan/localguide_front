import React, { useState, } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { Steps, Form, Button, Spin, message } from 'antd';
import Layout from '../CustomLayout';
import Parallax from '../Parallax/Parallax.js';
import Footer from '../Footer/Footer.js';
import { getUserProfile, ISUSER } from '../../utils/auth';
import { navigate } from 'gatsby';
import * as API from '../../apis';
import styles from '../../assets/styles/profilePage.js';
import StepLayout from './StepLayouts';

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

const StepContent = styled.div`
  //min-height: 200px;
  width:100%;
  margin-top: 16px;
  //padding-top: 80px;
  //text-align: center;
  background-color: #fafafa;
  border: 1px dashed #e9e9e9;
  border-radius: 2px;
`;

const StepAction = styled.div`
  margin-top: 15px;
  margin-bottom: 20px;
  text-align: center;
`;

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

const { Step } = Steps;

const BECOME_GUIDE_STEP = [
  {
    title: 'Basic Profile',
    content: <StepLayout.Step1/>    
  },
  {
    title: 'Advance Profile',
    content: <StepLayout.Step2/>
  },
  {
    title: 'Finish',
    content: <StepLayout.Step3/>
  },
]; 

function BecomeGuide() {
  const [profile] = useState(getUserProfile());
  const uid = profile.uid;
  const [form] = Form.useForm();
  const classes = useStyles();
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);
  
  if (profile.role != ISUSER) {
    navigate('/');
    return null;
  }

  const handlePrev = () => {
    setCurrent(current - 1);
  };

  const handleCancel = () => {
    navigate("/app/profile");
  };
  
  const key = 'updatable';
  const onFinish = async values => {
    setLoading(true);
    if (loading) {
      return;
    }
    try {
      await API.editProfile({
        ...values,
        uid,        
      });       
      message.success({ 
        content: 'You have successfully updated your profile!',
        key, duration: 1,
        className: 'custom-class',
        style: {
          marginTop: '20vh',
        },
      });
      setTimeout(() => {
        setCurrent(current + 1);
      }, 1000);
    } catch (e) {
      // ignore
    }
    setLoading(false);
  };
 
  return (
    <Layout>      
      <Parallax small filter image={require('../../assets/img/home-banner.jpg')} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container} >    
          <Spin spinning={loading}>
            <Steps current={current} style={{paddingTop:"50px"}} >
              {BECOME_GUIDE_STEP.map(item => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
            <FormWrapper form={form} {...formItemLayout} onFinish={onFinish} scrollToFirstError>
              <StepContent>
                {BECOME_GUIDE_STEP[current].content}  
                <StepAction>                
                  {current < BECOME_GUIDE_STEP.length - 1 && (
                    <>
                      <Button style={{ margin: '0 8px' }} type="primary" onClick={() => handleCancel()}>
                        Cancel
                      </Button>

                      <Button type="primary" htmlType="submit">
                        Next
                      </Button>
                    </>
                  )}
                  {current === BECOME_GUIDE_STEP.length - 1 && (
                    /*<Button type="primary" onClick={() => message.success('Processing complete!')}>*/
                    <Button type="primary" onClick={() => handleCancel()}>
                      Cancel
                    </Button>
                  )}
                  {current > 0 && (
                    <Button style={{ margin: '0 8px' }} onClick={() => handlePrev()}>
                      Previous
                    </Button>
                  )}
                </StepAction>           
              </StepContent>            
            </FormWrapper>
          </Spin>
        </div>
        <Footer />        
      </div>
    </Layout>
  );
}

BecomeGuide.propTypes = {};

export default BecomeGuide;

