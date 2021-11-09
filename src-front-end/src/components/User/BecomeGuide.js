import React, { useState, useEffect, useCallback, useMemo } from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Spin, message, Modal } from 'antd';
import { navigate } from 'gatsby';
import _ from 'lodash';
import Layout from '../CustomLayout';
import Parallax from '../Parallax/Parallax';
import SEO from '../SEO';
import Footer from '../Footer/Footer';
import * as API from '../../apis';
import styles from '../../assets/styles/profilePage';
import { getUserProfile, ISUSER } from '../../utils/auth';
import NoticeModal from './Modal/NoticeModal';


const useStyles = makeStyles(styles);
const { Title, Paragraph, Text, Link } = Typography;

const BecomeGuide = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [userProfile] = useState(getUserProfile());
  const { uid } = userProfile;
  if (userProfile.role != ISUSER) {    
    navigate('/');
    return null;
  }

  const handleAgree = async () => {
    setLoading(true);
    try {
      const result = await API.sendRequestApprove({ uid });
      if (result.status == true) {
        setVisible(true);       
      } else {
        message.error(result.message);
      }
    }
    catch (e) {
      message.error(e);
    }
    setLoading(false);
  };

  const handleCancel = () => {
    navigate('/app/profile');
  };

  return (
    <Layout>
      <SEO title="User Profile" />
      <Parallax small filter image={require('../../assets/img/home-banner.jpg')} />
        <div className={classNames(classes.main)}>          
          <div
            className={classes.description}
            style={{
              backgroundColor: '#fafafa',
              border: '1px dashed #e9e9e9',
              borderRadius: '2px',
              paddingLeft: '15px',
              paddingRight: '15px'
            }}
          >
            <Spin spinning={loading}>
            <Typography>
              <Title>Guide Terms and Service</Title>
              <Title level={3}>
                Please read carefully and agree to the following terms  
              </Title>
              <Paragraph>
                <ul>
                  <li>
                    <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly
                    used to demonstrate the visual form of a document or a typeface without
                    relying on meaningful content.{' '}</p>
                  </li>
                  <li>
                    <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly
                    used to demonstrate the visual form of a document or a typeface without
                    relying on meaningful content.{' '}</p>
                  </li>
                  <li>
                    <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly
                    used to demonstrate the visual form of a document or a typeface without
                    relying on meaningful content.{' '}</p>
                  </li>
                  <li>
                    <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly
                    used to demonstrate the visual form of a document or a typeface without
                    relying on meaningful content.{' '}</p>
                  </li>
                  <li>
                    <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly
                    used to demonstrate the visual form of a document or a typeface without
                    relying on meaningful content.{' '}</p>
                  </li>
                  <li>
                    <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly
                    used to demonstrate the visual form of a document or a typeface without
                    relying on meaningful content.{' '}</p>
                  </li>
                </ul>
              </Paragraph>
              <div style={{  
                  display: 'flex',                
                  justifyContent: 'center',
                  paddingTop: '30px', 
                  paddingBottom: '30px' 
                }}>
                <Button key="back" onClick={handleCancel}>
                  Cancel
                </Button>
                &nbsp;&nbsp;&nbsp;
                <Button key="submit" type="primary" loading={loading} onClick={handleAgree}>
                  Agree this terms
                </Button>
              </div>  
            </Typography>  
            </Spin>
          </div>
          <Footer />
          <NoticeModal visible={visible} />
        </div>
    </Layout>
  );
}

BecomeGuide.propTypes = {};

export default BecomeGuide;
