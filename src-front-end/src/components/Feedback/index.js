/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Comment, Input } from 'antd';

import moment from 'moment';
import PropTypes from 'prop-types';
import ActionFeedback from './ActionFeedback';

const Feedback = ({ feedback, replyFeedback, handleReplyFeedback }) => {
  const [value, setValue] = useState('')
  const feedbackId = new Set();
  return (
    <div>
      {feedback?.map(comment => {
        return (
          <Comment
            actions={comment.actions}
            author={comment.user}
            avatar={comment.avatar}
            content={comment.content}
            datetime={comment.date}
            key={comment.uuid}
          >
            {replyFeedback?.map(item => {
              feedbackId.add(item.FeedbackID);
              return (
                Number(comment.id) === item.FeedbackID && (
                  <div key={item.uuid}>
                    <Comment
                      // actions={item.actions}
                      author={item.Fullname}
                      avatar={item.Avatar}
                      content={item.Content}
                      datetime={(
                        <span>
                          {moment(item.Created_At).fromNow()}
                          <ActionFeedback />
                        </span>
                      )}
                    />
                  </div>
                )
              );
            })}
            {
              [...feedbackId].map(item => (
                Number(comment.id) === item && (
                  <Input
                    key={comment.uuid}
                    value={value}
                    placeholder="Reply feedback"
                    style={{ display: !replyFeedback && 'none' }}
                    onPressEnter={e => {
                      handleReplyFeedback(e, Number(comment.id))
                      setValue('')
                      e.target.value = ''
                    }}
                    onChange={e => setValue(e.target.value)}
                  />
                )
              ))
            }
          </Comment>
        );
      })}
    </div>
  );
};

Feedback.propTypes = {
  feedback: PropTypes.arrayOf({
    actions: PropTypes.arrayOf({}),
    avatar: PropTypes.string,
    comment: PropTypes.string,
    data: PropTypes.shape({}),
    id: PropTypes.string,
    user: PropTypes.string,
  }),
  replyFeedback: PropTypes.arrayOf({
    Avatar: PropTypes.string,
    Content: PropTypes.string,
    Created_At: PropTypes.string,
    FeedbackID: PropTypes.number,
    Fullname: PropTypes.string,
    UID: PropTypes.string,
  }),
  handleReplyFeedback: PropTypes.func,
};

Feedback.defaultProps = {
  feedback: [],
  replyFeedback: [],
  handleReplyFeedback: () => { },
};

export default Feedback;
