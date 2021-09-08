import React, { useState } from 'react';
import styled from 'styled-components';
import { Steps, Button } from 'antd';
import { navigate } from 'gatsby';
import AdminLayout from '../AdminLayout';
import { getUserProfile, ISGUIDE } from '../../utils/auth';
import StepLayout from './Profile/StepLayouts';

const StepContent = styled.div`
  //min-height: 200px;
  width: 100%;
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

const GUIDE_STEP = [
  {
    title: 'Basic Profile',
    content: <StepLayout.Step1 />,
  },
  {
    title: 'Advance Profile',
    content: <StepLayout.Step2 />,
  },
  {
    title: 'Upload Photo',
    content: <StepLayout.Step3 />,
  },
  {
    title: 'Other Info',
    content: <StepLayout.Step4 />,
  },
];

const GuideProfile = () => {
  const [userProfile] = useState(getUserProfile());
  const [current, setCurrent] = useState(0);
  if (userProfile.role != ISGUIDE) {
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
    navigate('/app/guideAdmin');
  };

  return (
    <AdminLayout>
      <h2>Guide Profile</h2>
      <div>
        <Steps current={current} style={{ paddingTop: '50px' }}>
          {GUIDE_STEP.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <StepContent>{GUIDE_STEP[current].content}</StepContent>
        <StepAction>
          {current < GUIDE_STEP.length - 1 && (
            <>
              <Button style={{ margin: '0 8px' }} onClick={() => handleCancel()}>
                Cancel
              </Button>

              <Button type="primary" onClick={() => handleNext()}>
                Next
              </Button>
            </>
          )}
          {current == 3 && (
            <Button style={{ margin: '0 8px' }} onClick={() => handleCancel()}>
              Cancel
            </Button>
          )}
          {current > 0 && (
            <Button type="primary" style={{ margin: '0 8px' }} onClick={() => handlePrev()}>
              Previous
            </Button>
          )}
        </StepAction>
      </div>
      {/* <Profile /> */}
    </AdminLayout>
  );
};

export default GuideProfile;
