import React from 'react';
import { Modal, Button } from 'antd';
import useAuth from '../../../utils/useAuth';

const NoticeModal = show => {
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
          <Button key="submit" type="primary" onClick={logout}>
            Logout
          </Button>,
        ]}
      >
        <div>
          <p>Your account is waiting approve become guide</p>
          <p>Admin will check your profile</p>
          <p>You should be logout and login again to take effect.</p>
        </div>
      </Modal>
    </>
  );
};

export default NoticeModal;
