import React, { useState} from 'react';
import { getUserProfile } from '../../../utils/auth';
import BasicProfile from "../../../components/User/BasicProfile";

const Step1 = () => {
  const [userProfile] = useState(getUserProfile());
  return (
    <>
      <BasicProfile uid={userProfile?.uid}/>
    </>
  )
}

export default Step1;
