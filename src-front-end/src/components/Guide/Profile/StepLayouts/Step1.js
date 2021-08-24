import React, { useState } from 'react';
import { getUserProfile } from '../../../../utils/auth';
import GuideBasicProfile from '../GuideBasicProfile';

const Step1 = () => {
  const [userProfile] = useState(getUserProfile());
  return (
    <>
      <GuideBasicProfile uid={userProfile?.uid} />
    </>
  );
};

export default Step1;
