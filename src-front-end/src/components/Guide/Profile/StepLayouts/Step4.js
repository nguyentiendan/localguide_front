import React, { useState } from 'react';
import { getUserProfile } from '../../../../utils/auth';
import GuideOtherInfo from '../GuideOtherInfo';

const Step4 = () => {
  const [userProfile] = useState(getUserProfile());

  return (
    <>
      <GuideOtherInfo uid={userProfile?.uid} />
    </>
  );
};

export default Step4;
