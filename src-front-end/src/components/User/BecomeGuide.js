import React, { useState, } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { Steps, Form, Button, Spin } from 'antd';
import Layout from '../CustomLayout';
import Parallax from '../Parallax/Parallax.js';
import Footer from '../Footer/Footer.js';
import { getUserProfile, ISUSER } from '../../utils/auth';
import { navigate } from 'gatsby';
import styles from '../../assets/styles/profilePage.js';
import StepLayout from './StepLayouts';

const useStyles = makeStyles(styles);

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
  const classes = useStyles();
  const [current, setCurrent] = useState(0);
  
  if (profile.role != ISUSER) {
    navigate('/');
    return null;
  }

  const handleNext = () => {
    setCurrent(current + 1);
  };

  const handlePrev = () => {
    setCurrent(current - 1);
  };

  const handleCancel = () => {
    navigate("/app/profile");
  };
  
  return (
    <Layout>      
      <Parallax small filter image={require('../../assets/img/home-banner.jpg')} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container} >              
          <Steps current={current} style={{paddingTop:"50px"}} >
            {BECOME_GUIDE_STEP.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>            
          <StepContent>
            {BECOME_GUIDE_STEP[current].content}  
          </StepContent>  
          <StepAction>                
            {current < BECOME_GUIDE_STEP.length - 1 && (
              <>
                <Button style={{ margin: '0 8px' }} onClick={() => handleCancel()}>
                  Cancel
                </Button>

                <Button type="primary" onClick={() => handleNext()}>
                  Next
                </Button>
              </>
            )}
            {(current === BECOME_GUIDE_STEP.length - 1 && profile.reqActive != 2 ) && (                                                            
              <Button  onClick={() => handleCancel()}>
                Cancel
              </Button>                      
            )}
            
            { (current > 0 ) && (                    
              <Button type="primary" style={{ margin: '0 8px' }} onClick={() => handlePrev()}>
                Previous
              </Button>
            )}
          </StepAction>           
        </div>
        <Footer />        
      </div>
    </Layout>
  );
}

BecomeGuide.propTypes = {};

export default BecomeGuide;

