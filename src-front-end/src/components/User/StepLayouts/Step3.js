import React, { useState } from 'react';
import { getUserProfile } from '../../../utils/auth';
import Finish from "../../../components/User/Finish";

const Step3 = () => {
  const [userProfile] = useState(getUserProfile());

  return (
    <>
      <Finish uid={userProfile?.uid}/>
    </>
  )
}

export default Step3;
