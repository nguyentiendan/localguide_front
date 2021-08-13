import React from 'react';
import { Modal, Button } from 'antd';
import useAuth from '../../../utils/useAuth';

const ChangePassModal = (show) => {
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
        <p>You have just change password successful.</p>
      	<p>You should be logout and login again to take effect.</p>
      </Modal>
		</>
  );
}

export default ChangePassModal;