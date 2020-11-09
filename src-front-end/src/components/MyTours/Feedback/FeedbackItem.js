import React from 'react';
import { Avatar, Comment } from 'antd';
import PropTypes from 'prop-types';

const Feedback = ({ avatarImg, username, content, children }) => {
  return (
    <Comment
      author={<a>Han Solo</a>}
      avatar={<Avatar src={avatarImg} alt={username} />}
      content={content}
    >
      {children}
    </Comment>
  );
};

export default Feedback;

Feedback.propTypes = {
  avatarImg: PropTypes.string,
  username: PropTypes.string.isRequired,
  content: PropTypes.node,
  children: PropTypes.node,
};

Feedback.defaultProps = {
  avatarImg: '',
  children: React.createElement('div'),
  content: React.createElement('div'),
};
