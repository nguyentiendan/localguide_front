/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Comment, Input, Button } from 'antd';
import styled from 'styled-components';

import moment from 'moment';
import PropTypes from 'prop-types';
import ActionFeedback from './ActionFeedback';
import EditFeedback from './EditFeedback';

const FeedbackWrapper = styled.div`
  &&{
    .ant-comment-actions{
      margin: 0;
    }
  }
`;

const Feedback = ({
  feedback,
  replyFeedback,
  handleReplyFeedback,
  userUID,
  handleGetAllReply,
  handleDeleteFeedback,
  handleResolveFeedback,
  handleEditFeedback,
  editFeedback,
  setEditFeedback,
  handleDeleteReply,
  handleEditReply,
  editReply,
  setEditReply,
}) => {
  const [value, setValue] = useState({});
  const [feedbackId, setFeedbackId] = useState({});
  return (
    <FeedbackWrapper>
      {feedback?.map(comment => {
        return (
          <Comment
            actions={[
              <Button
                key="comment-list-reply-to-0"
                type="link"
                onClick={() => {
                  setFeedbackId({ ...feedbackId, [comment.ID]: { id: comment.ID } });
                  handleGetAllReply(comment.ID)
                }}
                style={{ color: '#555' }}
              >
                {comment.Num ? `${comment.Num} Replies` : 'Reply to'}
              </Button>,
            ]}
            author={comment.Fullname}
            avatar={comment.Avatar}
            content={(
              <>
                {editFeedback[comment.ID] && editFeedback[comment.ID].isOpen ? (
                  <EditFeedback
                    data={comment}
                    dataEdit={editFeedback}
                    setDataEdit={setEditFeedback}
                  />
                ) : (
                    editFeedback[comment.ID]?.value || comment.Content
                  )}
              </>
            )}
            datetime={(
              <span>
                {moment(comment.Created_At).fromNow()}
                {userUID === comment.UID && (
                  <ActionFeedback
                    handleDelete={handleDeleteFeedback}
                    id={comment.ID}
                    handleResolve={handleResolveFeedback}
                    handleEdit={handleEditFeedback}
                  />
                )}
              </span>
            )}
            key={comment.uuid}
          >
            {replyFeedback?.map(item => {
              return (
                comment.ID === item.FeedbackID && (
                  <div key={item.ID}>
                    <Comment
                      // actions={item.actions}
                      author={item.Fullname}
                      avatar={item.Avatar}
                      content={(
                        <>
                          {editReply[item.ID] && editReply[item.ID].isOpen ? (
                            <EditFeedback
                              data={item}
                              dataEdit={editReply}
                              setDataEdit={setEditReply}
                            />
                          ) : (
                              editReply[item.ID]?.value || item.Content
                            )}
                        </>
                      )}
                      datetime={(
                        <span>
                          {moment(item.Created_At).fromNow()}
                          {userUID === item.UID && (
                            <ActionFeedback
                              handleDelete={handleDeleteReply}
                              id={item.ID}
                              handleEdit={handleEditReply}
                              disableResolve
                            />
                          )}
                        </span>
                      )}
                    />
                  </div>
                )
              );
            })}

            {comment.ID === feedbackId[comment.ID]?.id && (
              <Input
                key={comment.uuid}
                value={value[comment.ID]?.value}
                placeholder="Reply feedback"
                style={{ display: !replyFeedback && 'none' }}
                onPressEnter={e => {
                  handleReplyFeedback(e, comment.ID);
                  setValue('');
                }}
                onChange={e => setValue({ [comment.ID]: { value: e.target.value } })}
              />
            )}
          </Comment>
        );
      })}
    </FeedbackWrapper>
  );
};

Feedback.propTypes = {
  feedback: PropTypes.arrayOf(PropTypes.object),
  replyFeedback: PropTypes.arrayOf(PropTypes.object),
  handleReplyFeedback: PropTypes.func,
  handleGetAllReply: PropTypes.func,
  userUID: PropTypes.string.isRequired,
  handleDeleteFeedback: PropTypes.func,
  handleResolveFeedback: PropTypes.func,
  handleEditFeedback: PropTypes.func,
  handleDeleteReply: PropTypes.func,
  handleEditReply: PropTypes.func,
  editFeedback: PropTypes.shape({}).isRequired,
  setEditFeedback: PropTypes.func.isRequired,
  editReply: PropTypes.shape({}).isRequired,
  setEditReply: PropTypes.func.isRequired,
};

Feedback.defaultProps = {
  feedback: [],
  replyFeedback: [],
  handleReplyFeedback: () => { },
  handleGetAllReply: () => { },
  handleDeleteFeedback: () => { },
  handleResolveFeedback: () => { },
  handleEditFeedback: () => { },
  handleDeleteReply: () => { },
  handleEditReply: () => { },
};

export default Feedback;
