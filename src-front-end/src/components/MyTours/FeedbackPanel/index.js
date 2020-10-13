import React from 'react';
import {Avatar, Comment, Form, Input, Button, } from 'antd';

const Feedback = ({ avatarImg, username, content, children }) => (
  <Comment
    author={<a>Han Solo</a>}
    avatar={
      <Avatar
        src={avatarImg}
        alt={username}
      />
    }
    content={content}
  >
    {children}
  </Comment>
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <Input.TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </>
);

function FeedbackPanel() {
  return (
    <>
      <Feedback avatarImg={require('../../../../static/mocks/avatars/avatar-1.jpg')} username="Kevin" content="Swift transaction, excellent seller would deal again A-1">
        <Feedback avatarImg={require('../../../../static/mocks/avatars/avatar-2.jpg')} username="Nguyen" content="Thanks. Great service."/>
      </Feedback>
      <Feedback avatarImg={require('../../../../static/mocks/avatars/avatar-1.jpg')} username="Kevin" content={<Editor/>}/>
    </>
  );
}
export default FeedbackPanel;
