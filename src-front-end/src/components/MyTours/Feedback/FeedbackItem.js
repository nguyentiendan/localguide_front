import React from 'react';
import { Avatar, Comment } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CommentWrapper = styled(Comment)`
  && {
    .ant-comment-inner {
      padding: 0;
    }
    .ant-comment-actions {
      margin: 0;
    }
  }
`;

const Feedback = ({ avatarImg, username, content, children }) => {
  return (
    <CommentWrapper
      author={<a>Han Solo</a>}
      avatar={<Avatar src={avatarImg} alt={username} />}
      content={content}
      actions={[<span key="comment-nested-reply-to">Reply to</span>]}
    >
      {children}
    </CommentWrapper>
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
