import React, { useState } from 'react';
import { navigate } from 'gatsby';
import AdminLayout from '../AdminLayout';
import { getUserProfile, ISADMIN, ISUSER, ISGUIDE, ISBECOMEGUIDE } from '../../utils/auth';

const GuideAdmin = () => {
  const [userProfile] = useState(getUserProfile());
  if (userProfile.role == ISADMIN || userProfile.role == ISUSER) {
    navigate('/');
    return null;
  }

  return (
    <AdminLayout>
      <div>
        {userProfile.role === ISBECOMEGUIDE && (
          <div>
            <h3>Welcome {userProfile.fullname}</h3>
            <p>You are waiting approve to become a guide</p>
            <p>Please update your profile</p>
          </div>
        )}
        {userProfile.role === ISGUIDE && (
          <div>
            <h3>Welcome {userProfile.fullname}</h3>            
          </div>  
        )}
        
      </div>
    </AdminLayout>
  );
};

export default GuideAdmin;
