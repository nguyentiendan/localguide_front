import React from 'react';
import PropTypes from 'prop-types';

import Feedback from './FeedbackItem';
import Editor from './Editor';

function FeedbackPanel({ createFeedback, loadingCreateFeedback, comments }) {
  return (
    <>
      {comments.map(comment => (
        <Feedback avatarImg={comment.avatar} username={comment.author} content={comment.content}>
          {/* <Feedback
            // avatarImg={require('../../../../static/mocks/avatars/avatar-2.jpg')}
            username="Nguyen"
            content="Thanks. Great service."
          /> */}
        </Feedback>
      ))}
      <Feedback
        username="Kevin"
        content={
          <Editor createFeedback={createFeedback} loadingCreateFeedback={loadingCreateFeedback} />
        }
      />
    </>
  );
}
export default FeedbackPanel;

FeedbackPanel.propTypes = {
  createFeedback: PropTypes.func.isRequired,
  loadingCreateFeedback: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(PropTypes.object),
};

FeedbackPanel.defaultProps = {
  comments: [],
};
