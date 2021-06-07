import React, { useState } from 'react';
import { getUserProfile } from '../../../utils/auth';
import AdvanceProfile from "../../../components/User/AdvanceProfile";

const Step2 = () => {
  const [userProfile] = useState(getUserProfile());

  return (
    <>
      <AdvanceProfile uid={userProfile?.uid}/>
    </>
  )
}

export default Step2;
