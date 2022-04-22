import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Slide } from '@material-ui/core';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import { container } from '../../assets/jss/material-kit-react';
// import * as API from '../../apis';

const styleWrapper = {
  popup: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    zIndex: 1000,
    borderRadius: 3,
    padding: '5px 20px',
    backgroundColor: 'white',
    boxShadow: '0px 0px 8px 2px lightgray',
  },
  popupButton: {
    marginLeft: 'auto',
    display: 'block',
    position: 'absolute',
    top: '-20px',
    right: '20px',
    color: 'gray',
    borderRadius: '100px',
    backgroundColor: 'white',
    cursor: 'pointer',
  },
  feedbackIcon: {
    textAlign: 'center',
    '@media (min-width: 576px)': {
      textAlign: 'right',
    },
  },
  feedbackButton: {
    width: '100%',
    '@media (min-width: 576px)': {
      width: 'auto',
    },
  },
  form: {
    textAlign: 'right',
  },
  formButton: {
    marginRight: '8px',
  },
  formIcon: {
    height: '16px',
    position: 'relative',
    top: '3px',
  },
  errorMessage: {
    paddingBottom: '15px',
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container,
};

const useStyles = makeStyles(styleWrapper);

const Feedback = () => {
  const [form] = Form.useForm();
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const classes = useStyles();

  const handleCancel = () => {
    setShowPopup(false);
  };

  const onFinish = async values => {
    if (loading) {
      return;
    }
    // console.log(values);
    try {
      setLoading(true);
      setErrorMessage('');
      // const { message, status } = await API.forgotPassword(values.title);
      setLoading(false);
      setShowPopup(false);
    } catch (error) {
      setLoading(false);
      setErrorMessage('An error has occurred.');
    }
  };

  return (
    <>
      <div className={`${classes.container} ${classes.feedbackIcon}`}>
        <Button className={classes.feedbackButton} onClick={() => setShowPopup(true)}>
          Feedback
        </Button>
      </div>

      <Slide direction="up" in={showPopup} mountOnEnter unmountOnExit>
        <Box className={classes.popup}>
          <CancelOutlinedIcon
            fontSize="large"
            className={classes.popupButton}
            onClick={() => setShowPopup(false)}
          />
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            scrollToFirstError
            requiredMark={false}
          >
            <div className={classes.errorMessage}>{errorMessage}</div>
            <Form.Item
              name="title"
              label={<h3>Was this doc helpful to you?</h3>}
              rules={[
                {
                  required: true,
                  message: 'Please input comment!',
                },
                { max: 100 },
              ]}
            >
              <Input.TextArea size="large" allowClear autoSize={{ maxRows: 1 }} />
            </Form.Item>
            <Form.Item name="comment" label={<p>your comment (optional)</p>} rules={[{ max: 200 }]}>
              <Input.TextArea size="large" allowClear autoSize={{ maxRows: 5, minRows: 5 }} />
            </Form.Item>
            <Form.Item className={classes.form}>
              <Button key="back" onClick={handleCancel} className={classes.formButton}>
                Cancel
              </Button>
              <Button key="submit" type="primary" htmlType="submit">
                <span>
                  Send feedback <SendIcon className={classes.formIcon} />
                </span>
              </Button>
            </Form.Item>
          </Form>
        </Box>
      </Slide>
    </>
  );
};

export default Feedback;
