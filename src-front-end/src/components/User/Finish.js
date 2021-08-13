import React, { useState, useEffect,} from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { Result, Button,Popconfirm, Spin, message,} from 'antd';
import { navigate } from 'gatsby';
import * as API from '../../apis';
import styles from '../../assets/styles/profilePage.js';

const useStyles = makeStyles(styles);

const Wrapper = styled.div`
  //display: flex;
  //flex-direction: row;
  //justify-content: center;
  text-align: center;
  align-items:center;
  margin-top: 50px;
  margin-bottom: 50px;
  @media (min-width: 575px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const Error = styled.div`
  //display: flex;
  flex-direction: row;
  //justify-content: center;
  text-align: center;
  align-items:center;
  margin-top: 50px;
  margin-bottom: 50px;
  @media (min-width: 575px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

function Finish({uid}) { 
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({});
  const [isOK, setIsOK] = useState(true);
  const [visible, setVisible] = useState(false);
  const [disable, setDisable] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {    
    setLoading(true);
    const fetchUserProfile = async () => {
      const res = await API.getUserProfile(uid);        
      if(res.data?.reqActive === 1) { 
        setDisable(true);
      }
      if(res.data?.avatar == '' || res.data?.experience == '') {
        setIsOK(false);
      }  
      setProfile(res.data);

    };
    fetchUserProfile();     
    setLoading(false);
  }, []);
  
  const showPopconfirm = () => {
    setVisible(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    const result = await API.sendRequestApprove({uid});
    if (result.status == true) {      
      setDisable(true)
      message.success('Send request completed!')
    }
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {    
    setVisible(false);
  };

  return (
    <Spin spinning={loading}>    
      <Wrapper>
        {isOK == true ? (
        <Result
          key="success"
          status="success"
          title="Successfully update your profile!"
          subTitle={
            ( (profile.reqActive === 1 || profile.reqActive === 2) || disable == true) ? ("Your profile is waiting admin approve."):("Please send request approve to administrator")
          }          
          extra={[
            <Button type="primary" key="review">              
              <a href={`/app/profileReview?uid=${uid}&id=${profile.id}`} target="_blank">Review profile</a>          
            </Button>,
            
            <Popconfirm
              key="confirm"
              title="By click 'OK', your profile will be sent to localguipal.com for reviewing"
              visible={visible}
              onConfirm={handleOk}
              okButtonProps={{ loading: confirmLoading }}
              onCancel={handleCancel}
            >
              {disable == true ? (
                  <Button type="primary" key="approve" disabled>
                    Waiting admin approve
                  </Button>
                ) : ( profile.reqActive === 1 &&
                  <Button type="primary" key="approve" onClick={showPopconfirm}>
                    Request approve
                  </Button>
                )
              }
              
            </Popconfirm>  
          ]}
        />
        ) :
        (<Result
          key="warning"
          status="warning"
          title="Thank for your update profile."
          subTitle="But you not completed all item. Please check to update avatar or experience again"
        >
        </Result>
        )}        
      </Wrapper>
    </Spin>
  );
}

Finish.propTypes = {};

export default Finish;
