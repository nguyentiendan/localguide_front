import React from 'react';
import { Form, Input, Button } from 'antd';
import PropTypes from 'prop-types';

const Editor = ({ createFeedback, loadingCreateFeedback }) => {
  const onFinish = values => {
    createFeedback({ content: values.content });
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item name="content">
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={loadingCreateFeedback} type="primary">
          Add Comment
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Editor;

Editor.propTypes = {
  createFeedback: PropTypes.func,
  loadingCreateFeedback: PropTypes.bool.isRequired,
};

Editor.defaultProps = {
  createFeedback: () => {},
};
