import React from 'react';
import { Modal, Button } from 'antd';
import useAuth from '../../../utils/useAuth';

const NoticeModal = (show) => {
	const { user, logout } = useAuth();
  
  return (
		<>        
			<Modal
				visible={show.visible}
				title="Notice"
				closable="false"
				keyboard="false"      
				centered="true"          
				footer={[     
					<Button 
            key="submit" 
            type="primary"            
            onClick={logout}
          >
            Logout
          </Button>,                       
				]}
			> 
        <p>Your account was approve become a guide.</p>
      	<p>Please click logout and login again .</p>
      </Modal>
		</>
  );
}

export default NoticeModal;