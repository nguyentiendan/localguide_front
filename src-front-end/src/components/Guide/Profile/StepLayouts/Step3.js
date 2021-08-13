import React, { useState } from 'react';
import { getUserProfile } from '../../../../utils/auth';
import GuidePhoto from "../GuidePhoto";

const Step3 = () => {
  const [userProfile] = useState(getUserProfile());

  return (
    <>
      <GuidePhoto uid={userProfile?.uid}/>
    </>
  )
}

export default Step3;
