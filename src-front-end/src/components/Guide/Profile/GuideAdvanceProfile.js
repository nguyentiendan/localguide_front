import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { Form, Input, Button, Select, Spin, message } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import SunEditor, { buttonList } from 'suneditor-react';
import * as API from '../../../apis';
import TagInterests from '../../HandleTag/Interests';
import 'suneditor/dist/css/suneditor.min.css';
import { getUserProfile } from '../../../utils/auth';

const FormWrapper = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  && {
    .ant-form-item {
      width: 100%;
    }
  }
`;

const formItemLayout = {
  labelCol: {
    xs: {
      // mobile
      span: 24,
    },
    sm: {
      // pc
      span: 6, // label size
    },
  },
  wrapperCol: {
    xs: {
      // mobile
      span: 24,
    },
    sm: {
      // pc
      span: 12, // input box size
    },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      // mobile
      span: 24,
      offset: 5,
    },
    sm: {
      // pc
      span: 24,
      offset: 10,
    },
  },
};

const { TextArea } = Input;

function GuideAdvanceProfile({ uid }) {
  const [form] = Form.useForm();
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const [experience, setExperience] = useState();

  const [defaultTags, setDefaultTags] = useState({
    interest: [],
    language: [],
    extras: [],
  });
  const [interest, setInterest] = useState({ tags: [] });
  const [extras, setExtras] = useState({ tags: [] });
  const [language, setLanguage] = useState({ tags: [] });

  const fetchGuideProfile = useCallback(async () => {
    setLoading(true);
    const res = await API.getUserProfile(uid);
    
    setInterest({ ...interest, tags: res.data?.interest ? res.data?.interest?.split(';') : [], });    
    setExtras({ ...extras, tags: res.data?.extras ? res.data?.extras?.split(';') : [] });
    setLanguage({ ...language, tags: res.data?.language ? res.data?.language?.split(';') : [] });

    setProfile(res.data);
    setLoading(false);
  }, [setLoading, setProfile]);
  // }, [API.getUserProfile,  setLoading, setProfile,]);

  useEffect(() => {
    fetchGuideProfile();
  }, []);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const { data: extraDefault } = await API.getAllExtra();
        const { data: languageDefault } = await API.getAllLang();
        const { data: interestsDefaults } = await API.getAllInterest();
        
        const defaultInterests = interestsDefaults.map(d => {
          return d.interest;
        });
        const defaultLanguage = languageDefault.map(d => {
          return d.language;
        });
        const defaultExtras = extraDefault.map(d => {
          return d.extra;
        });

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
    setLoading(false);
  }, [API.getAllInterest, API.getAllExtra, API.getAllLang, setDefaultTags]);

  const onFinishAdvance = async values => {
    setLoading(true);
    const key = 'updatable';

    if (loading) {
      return;
    }
    try {
      await API.updateAdvance({
        ...values,
        uid,
        experience,
        interest: interest.tags?.join(';'),
        extras: extras.tags?.join(';'),
        language: language.tags?.join(';'),
      });
      message.success({
        content: 'You have successfully updated your advance profile!',
        key,
        duration: 2,
        className: 'custom-class',
        style: {
          marginTop: '20vh',
        },
      });
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const editorRef = useRef();

  return (
    <div>
      <Spin spinning={loading}>
        <FormWrapper
          form={form}
          {...formItemLayout}
          name="advance"
          onFinish={onFinishAdvance}
          scrollToFirstError
        >
          <Form.Item style={{ justifyContent: 'center', paddingTop: '20px', paddingBottom: '0px' }}>
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
            <TextArea
              size="large"
              showCount
              maxLength={200}
              allowClear
              placeholder="Please provide a short self intro in 3 lines to express your unique background, offerings, fields or interest, etc."
            />
          </Form.Item>

          <Form.Item
            name="education"
            label="Education"
            rules={[
              {
                required: true,
                message: 'Please select your education!',
              },
            ]}
            key={profile.education === '' ? 'education' : profile.education}
            initialValue={profile.education}
          >
            <Select
              size="large"
              placeholder="Select education"
              style={{ width: '200px' }}
              onChange={value => {
                form.setFieldsValue({ education: value });
              }}
              allowClear
            >
              <Select.Option value="High School">High School</Select.Option>
              <Select.Option value="College">College</Select.Option>
              <Select.Option value="University">University</Select.Option>
              <Select.Option value="MBA">MBA</Select.Option>
              <Select.Option value="Other">Other</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="certification"
            label="Certification"
            key={profile.certification === '' ? 'certification' : profile.certification}
            initialValue={profile.certification}
          >
            <Input size="large" allowClear />
          </Form.Item>

          <Form.Item
            name="language"
            label="Language"
            key={profile.language === '' ? 'language' : profile.language}
            initialValue={profile.language}
          >
            <TagInterests
              createInfo={language}
              setCreateInfo={setLanguage}
              defaultTags={defaultTags.language}
            />
          </Form.Item>

          <Form.Item
            name="interest"
            label="Interests"
            key={profile.interest === '' ? 'interest' : profile.interest}
            initialValue={profile.interest}
          >
            <TagInterests
              createInfo={interest}
              setCreateInfo={setInterest}
              defaultTags={defaultTags.interest}
            />
          </Form.Item>

          <Form.Item
            name="extras"
            label="Extras"
            key={profile.extras === '' ? 'extras' : profile.extras}
            initialValue={profile.extras}
          >
            <TagInterests
              createInfo={extras}
              setCreateInfo={setExtras}
              defaultTags={defaultTags.extras}
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
                placeholder="Please enter your experience ..."
                showToolbar
                enableToolbar
                height="200"
                width="100%"
                setDefaultStyle="font-family: arial; font-size: 13px;"
                setOptions={{
                  height: 200,
                  // buttonList: buttonList.formatting,
                  buttonList: [
                    [
                      'undo',
                      'redo',
                      // 'font',
                      'fontSize',
                      // 'formatBlock',
                      // 'blockquote',
                      'bold',
                      'underline',
                      'italic',
                      // 'strike',
                      // 'subscript',
                      // 'superscript',
                      // 'fontColor',
                      // 'hiliteColor',
                      // 'textStyle',
                      'removeFormat',
                      'outdent',
                      'indent',
                      'align',
                      // 'horizontalRule',
                      // 'list',
                      // 'lineHeight',
                      'link',
                      // 'image',
                      // 'video',
                      // 'showBlocks',
                      // 'codeView',
                      // 'preview',
                      // 'fullScreen',
                    ],
                  ],
                }}
                onChange={value => {
                  setExperience(value);
                }}
              />
            </div>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button size="medium" type="primary" htmlType="submit">
              Update Advance Profile
              <RightOutlined />
            </Button>
          </Form.Item>
        </FormWrapper>
      </Spin>
    </div>
  );
}

GuideAdvanceProfile.propTypes = {};

export default GuideAdvanceProfile;
