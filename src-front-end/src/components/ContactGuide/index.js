import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, Button, message } from 'antd';
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/core/styles';
import { getUserProfile, AUTH_TOKEN_KEY } from '../../utils/auth';
import { useLocalStorage } from '../../utils/storage';
import * as API from '../../apis';

const styleWrapper = {
  form: {
    // marginTop:'10px',
    textAlign: 'right',
    paddingBottom: '0px',
  },
  formButton: {
    marginRight: '8px',
  },
  formIcon: {
    height: '16px',
    position: 'relative',
    top: '3px',
  },
};

const useStyles = makeStyles(styleWrapper);

const ConactGuide = ({ show, handleCancel, guideName, tourName, uid, tourId }) => {
  const [form] = Form.useForm();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [authToken, setAuthToken] = useLocalStorage(AUTH_TOKEN_KEY);
  const [userProfile] = useState(getUserProfile());
  if (authToken) {    
    const userId = userProfile.id;
  }
  
  const onFinish = async values => {
    const key = 'updatable';
    if (loading) {
      return;
    }
    const content = values.question;
    try {
      setLoading(true);
      const { status } = await API.createContact({ userId, uid, tourId, content });
      if (status === true) {
        message.success({
          content: 'Your question have send to guide!',
          key,
          duration: 2,
          className: 'custom-class',
          style: {
            marginTop: '20vh',
          },
        });
        handleCancel();
      } else {
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      // console.log(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <Modal
        title="Send your question"
        visible={show}
        centered="true"
        style={{ width: '100%' }}
        footer={null}
        onCancel={handleCancel}
        bodyStyle={{ padding: 18 }}
      >
        <Form form={form} name="contact" onFinish={onFinish} scrollToFirstError>
          <p>
            Do you want send question to <b>{guideName}</b>
          </p>
          <p>
            Tour name : <b>{tourName}</b>
          </p>
          <p>You can ask about tour schedule, price and another fees...</p>
          <b>Please input your question</b>
          <Form.Item
            name="question"
            rules={[{ required: true, message: 'Please input your question' }, { max: 300 }]}
          >
            <Input.TextArea
              rows={4}
              showCount
              maxLength={300}
              placeholder="Your question"
              // value={content || ''}
              // onChange={e => setContent(e.target.value.slice(0, 300))}
              size="large"
              allowClear
              autoSize={{ maxRows: 5, minRows: 5 }}
            />
          </Form.Item>
          <Form.Item className={classes.form}>
            <Button key="back" onClick={handleCancel} className={classes.formButton}>
              Cancel
            </Button>
            <Button key="submit" type="primary" htmlType="submit">
              <span>
                Send <SendIcon className={classes.formIcon} />
              </span>
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

ConactGuide.propTypes = {
  show: PropTypes.bool,
  handleCancel: PropTypes.func,
  uid: PropTypes.string,
  tourId: PropTypes.number,
  guideName: PropTypes.string,
  tourName: PropTypes.string,
};

ConactGuide.defaultProps = {
  handleCancel: () => {},
};

export default ConactGuide;
