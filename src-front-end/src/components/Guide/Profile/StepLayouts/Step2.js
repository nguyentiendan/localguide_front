import React, { useState } from 'react';
import { getUserProfile } from '../../../../utils/auth';
import GuideAdvanceProfile from "../GuideAdvanceProfile";

const Step2 = () => {
  const [userProfile] = useState(getUserProfile());

  return (
    <>
      <GuideAdvanceProfile uid={userProfile?.uid} />
    </>
  )
}

export default Step2;
