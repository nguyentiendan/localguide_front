import React,{useState, useEffect, useCallback} from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../../components/CustomLayout';
import Parallax from '../../components/Parallax/Parallax.js';
import Footer from '../../components/Footer/Footer.js';
import { Result, Button, Spin } from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons';
import * as API from '../../apis';
import { getUserProfile, ISUSER } from '../../utils/auth';
import { navigate } from 'gatsby';
import styles from '../../assets/styles/profilePage.js';
import NoticeModal from "./NoticeModal"; 

const useStyles = makeStyles(styles);

const StartProfile = () => {
  const classes = useStyles();
  const [visible, setVisible] = useState(false);
  const [userProfile] = useState(getUserProfile());
  const uid = userProfile.uid
  
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({});

  const fetchUserProfile = useCallback(async () => {
    setLoading(true);
    const res = await API.getUserProfile(uid);    
    //show modal notice user become a guide
    if(res.data.role != userProfile.role) {
      setVisible(true)
    }
    if (res.data.role != ISUSER ) {
      navigate('/');
      return null;
    }
    
    setProfile(res.data);    
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchUserProfile();    
  }, []);
  
  

  return (    
    <Layout>      
       {profile.reqActive == 1 && (
         <>
         <Parallax small filter image={require('../../assets/img/home-banner.jpg')} />
         <Spin spinning={loading}>
           <div className={classNames(classes.main, classes.mainRaised)} >
             <div className={classes.container} style={{backgroundColor: "#fafafa",border: "1px dashed #e9e9e9",borderRadius: "2px"}}>
               <Result style={{paddingBottom:"100px", paddingTop:"70px"}}
                 icon={<CheckCircleTwoTone />}
                 title="Great, your account is waiting approve to become a guide!"
                 subTitle="While waiting for approval you can review your profile or modify information."
                 extra={
                   [
                     <Button type="primary" key="1">
                       <a href={`/app/profileReview?uid=${userProfile.uid}&id=${userProfile.id}`} target="_blank">Review profile</a>
                     </Button>,
                     <Button type="primary" key="2">
                       <a href="/app/becomeGuide" target="_blank">Modify</a>
                     </Button>
                   ]
                 }
               />
             </div>
             <Footer />
           </div>
         </Spin>
         <NoticeModal visible={visible}  />
         </>
        )    
      }      
    </Layout>
  );
}

export default StartProfile;
