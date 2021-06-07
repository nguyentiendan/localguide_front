import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { Form, Input, Textarea, Button, Select,  InputNumber, Spin, notification,Modal,} from 'antd';
import { navigate } from 'gatsby';
import UploadAvatar from "../Input/UploadAvatar"
import * as API from '../../apis';
import TagInterests from '../HandleTag/Interests';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import styles from '../../assets/styles/profilePage.js';

const useStyles = makeStyles(styles);

function AdvanceProfile({uid}) { 
  //const [userProfile] = useState(getUserProfile());
  const classes = useStyles();
  //const [form] = Form.useForm();
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const [defaultTags, setDefaultTags] = useState({
    interest: [],
    language: [],
    extras: [],
  });
  const [interest, setInterest] = useState({
    tags: [],
  });
  const [extras, setExtras] = useState({
    tags: [],
  });
  const [language, setLanguage] = useState({
    tags: [],
  });

  const fetchUserProfile = useCallback(async () => {
    setLoading(true);
    const res = await API.getUserProfile(uid);
    
    setInterest({ ...interest,tags: res.data?.interest ? res.data?.interest?.split(';') : [] });    
    setExtras({ ...extras, tags: res.data?.extras ? res.data?.extras?.split(';') : [] });
    setLanguage({ ...language, tags: res.data?.language ? res.data?.language?.split(';') : [] });
    
    setProfile(res.data);
    setLoading(false);
  }, [setLoading, setProfile,]);
  //}, [API.getUserProfile,  setLoading, setProfile,]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  useEffect(() => {
    (async () => {
      try {
        const { data: extraDefault } = await API.getAllExtra();
        const { data: languageDefault } = await API.getAllLang();
        const { data: interestsDefaults } = await API.getAllInterest();
        const defaultInterests = _.map(interestsDefaults, d => d.interest);
        const defaultLanguage = _.map(languageDefault, d => d.language);
        const defaultExtras = _.map(extraDefault, d => d.extra);

        setDefaultTags({
          ...defaultTags,
          interest: defaultInterests,
          language: defaultLanguage,
          extras: defaultExtras,
        });
      } catch (e) {
        // ignore
      }
    })();
  }, [API.getAllInterest, API.getAllExtra, API.getAllLang, setDefaultTags]);
  
  const handleLanguage = async language => {    
    if (loading) {
      return;
    }    
    try {
      await API.editProfile({
        language: language.tags?.join(';'),
        uid,        
      });            
    } catch (e) {
      // ignore
    }
    setLoading(false);
  }

  const handleInterest = async interest => {  
    if (loading) {
      return;
    }    
    try {
      await API.editProfile({
        interest: interest.tags?.join(';'),
        uid,        
      });            
    } catch (e) {
      // ignore
    }
    setLoading(false);
  }

  const handleExtra = async extras => {    
    if (loading) {
      return;
    }    
    try {
      await API.editProfile({
        extras: extras.tags?.join(';'),
        uid,        
      });            
    } catch (e) {
      // ignore
    }
    setLoading(false);
  }

  const handleExperience = async experience => {    
    if (loading) {
      return;
    }    
    try {
      await API.editProfile({
        experience,
        uid,        
      });            
    } catch (e) {
      // ignore
    }
    setLoading(false);
  }

  const editorRef = useRef();
  
  return (
    <Spin spinning={loading}>    
      {/*<FormWrapper form={form} {...formItemLayout} onFinish={onFinishAdvance} scrollToFirstError>*/}        
        <Form.Item style={{ justifyContent: 'center',  paddingTop: '20px',paddingBottom: '0px'  }}>
          <h2>{profile.fullname}'s Advance Profile</h2>
        </Form.Item>              

        <Form.Item
          name="intro"
          label="Short introdution"
          rules={[
            {
              required: true,
              message: 'Please input your introdution!',
            },
            {
              max: 200,
              message: 'Value should be less than 200 character',
            },
          ]}
          key={profile.intro === '' ? 'intro' : profile.intro}
          initialValue={profile.intro}
        >
          <Input.TextArea size="large" />
        </Form.Item>

        <Form.Item
          name="education"
          label="Education"
          rules={[            
            {
              required: true,
              message: 'Please input your education!',
            },
          ]}
          key={profile.education === '' ? 'education' : profile.education}
          initialValue={profile.education}
        >
          <Input size="large"  />
        </Form.Item>
        
        <Form.Item
          name="certification"
          label="Certification"
          rules={[            
            {
              required: true,
              message: 'Please input your certification!',
            },
          ]}
          key={profile.certification === '' ? 'certification' : profile.certification}
          initialValue={profile.certification}
        >
          <Input size="large"  />
        </Form.Item>

        <Form.Item
          //name="language"
          label="Language"          
          key={profile.language === '' ? 'language' : profile.language}
          initialValue={profile.language}
        >
          <TagInterests
            createInfo={language}
            setCreateInfo={setLanguage}
            defaultTags={defaultTags.language}
            onChange={handleLanguage(language)}
          />
        </Form.Item>

        <Form.Item
          //name="interest"
          label="Interests"
          key={profile.interest === '' ? 'interest' : profile.interest}
          initialValue={profile.interest}
        >
          <TagInterests
            createInfo={interest}
            setCreateInfo={setInterest}
            defaultTags={defaultTags.interest}
            onChange={handleInterest(interest)}
          />
        </Form.Item>

        <Form.Item
          //name="extras"
          label="Extras"
          key={profile.extras === '' ? 'extras' : profile.extras}
          initialValue={profile.extras}
        >
          <TagInterests
            createInfo={extras}
            setCreateInfo={setExtras}
            defaultTags={defaultTags.extras}
            onChange={handleExtra(extras)}
          />
        </Form.Item>  

        <Form.Item
          name="experience"
          label="Experience"
          key="experience"
          initialValue={profile.experience}
        >
          <div>
            <SunEditor
              ref={editorRef}
              setContents={profile.experience}
              lang="en"
              // width="670"
              height="300"
              placeholder="Please enter your experience ..."
              showToolbar
              enableToolbar
              //onChange={value => {
              //  form.setFieldsValue({ experience: value });
              //}}
              onChange={value => {
                handleExperience(value);
              }}              
              setOptions={{
                buttonList: [
                  [
                    'undo',
                    'redo',
                    'font',
                    'fontSize',
                    'formatBlock',
                    'blockquote',
                    'bold',
                    'underline',
                    'italic',
                    'strike',
                    'subscript',
                    'superscript',
                    'fontColor',
                    'hiliteColor',
                    'textStyle',
                    'removeFormat',
                    'outdent',
                    'indent',
                    'align',
                    'horizontalRule',
                    'list',
                    'lineHeight',
                    'link',
                    'image',
                    'video',
                    'showBlocks',
                    'codeView',
                    'preview',
                    'fullScreen',
                  ],
                ],
              }}
            />
          </div>
        </Form.Item>
      {/*</FormWrapper>*/}
    </Spin>                
  );
}

AdvanceProfile.propTypes = {};

export default AdvanceProfile;
