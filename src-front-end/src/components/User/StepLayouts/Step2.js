import React, { useState } from 'react';
import { getUserProfile } from '../../../utils/auth';
import AdvanceProfile from '../AdvanceProfile';

const Step2 = () => {
  const [userProfile] = useState(getUserProfile());

  return (
    <>
      <AdvanceProfile uid={userProfile?.uid} role={userProfile?.role} />
    </>
  );
};

export default Step2;
