import React, {createElement, useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DeleteOutlined, CheckOutlined, FormOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Input,Button, Comment, Avatar, Tooltip,Modal } from 'antd';
import moment from 'moment';
import { getUserProfile } from '../../apis';

const Wrapper = styled.div` 
`;
const { TextArea } = Input;

const UserReviewCommentListItem = ({ 
  comments,
  replyComment,
  handleGetAllReply,
  handleCreateReply,
  handleDeleteComment,
  handleDeleteReply,
  uid,
  className,
}) => {
  const [replyId, setReplyId] = useState({});
  const [value, setValue] = useState({});
  
  const confirmDeleteComment = (id) => {
    Modal.confirm({
      title: 'Confirmation',
      content: (
        <div>
          <p>Are you sure delete this comment?</p>
          All reply of this comment will be lose
        </div>
      ),
      closable:true,
      centered:true,
      okText: 'OK',      
      onOk() {                   
        handleDeleteComment(id)
      },
      onCancel() {
      },      
    });
  }

  const confirmDeleteReply = (id) => {
    Modal.confirm({
      title: 'Confirmation',
      content: (
        <div>
          <p>Are you sure delete this comment?</p>          
        </div>
      ),
      closable:true,
      centered:true,
      okText: 'OK',      
      onOk() {           
        handleDeleteReply(id)
      },
      onCancel() {
        //console.log('Cancel');
      },      
    });
  }
  
  return (
    <Wrapper className={className}>
      {comments?.map((comment, index) => {       
        return (
          <Comment
            key={index}
            actions={
              [
                comment.uid === uid && (
                  <div>
                    <Tooltip key="delete" title="Delete comment">                  
                      <span style={{marginLeft:-20}} onClick={() => confirmDeleteComment(comment.id) }>
                        {createElement(DeleteOutlined)}                   
                      </span>                                     
                    </Tooltip>
                  </div>
                ),
                /*<Tooltip key="resolve" title="Resolve comment">
                  <span>{createElement(CheckOutlined)}</span>
                </Tooltip>,*/
                <Tooltip key="reply" title="Reply comment">
                  <span
                    key="reply" 
                    onClick={() => {
                      setReplyId({ ...replyId, [comment.id]: { id: comment.id } });
                      handleGetAllReply(comment.id)
                    }}  
                  >
                    {comment.num} {createElement(FormOutlined)}
                  </span>
                </Tooltip>,                
              ]
            }
            author={comment.fullname}
            avatar={<Avatar src={comment.avatar} alt={comment.fullname} /> }
            content={
              <p>
                {comment.content}
              </p>
            }
            datetime={
              <Tooltip title={moment(comment.created_at).format('YYYY-MM-DD HH:mm:ss')}>
                <span>{moment(comment.created_at).fromNow()}</span>
              </Tooltip>
            }            
          >            
            {replyComment?.map(reply => {
              return (
                reply.commentId === comment.id && (
                  <div key={reply.id}>
                    <Comment
                      actions={
                        reply.uid === uid && (
                          [                          
                            <div>
                              <Tooltip key="delete" title="Delete reply">
                                <span style={{marginLeft:-20}} onClick={() => confirmDeleteReply(reply.id) }>
                                  {createElement(DeleteOutlined)}
                                </span>
                              </Tooltip>
                            </div>                                                    
                          ]
                        )
                      }
                      author={reply.fullname}
                      avatar={<Avatar src={reply.avatar} alt={reply.fullname} /> }
                      content={reply.content}
                      datetime={
                        <Tooltip title={moment(reply.created_at).format('YYYY-MM-DD HH:mm:ss')}>
                          <span>{moment(reply.created_at).fromNow()}</span>
                        </Tooltip>
                      }
                      style={{}}
                    />
                  </div>
                )
              );
            })}
            
            {comment.id === replyId[comment.id]?.id && (
              <>
              <TextArea
                rows={1}
                showCount
                key={comment.id}
                value={value[comment.id]?.value}
                placeholder="Reply comment"
                maxLength={200}
                //onPressEnter={e => {
                //  handleCreateReply(e, comment.id, uid);
                //  setValue('');
                //}}
                onChange={e => setValue({ [comment.id]: { value: (e.target.value).slice(0,200) } })}
                style={{ marginTop: 5 }}
                onBlur={e => {
                  handleCreateReply(e, comment.id, uid);
                  setValue('');                  
                }}
              />
              <span style={{color:'#525F6B',fontSize:11}}>Press Tab key to comment</span>
              </>
            )}
          </Comment>  
        );    
      })}   
    </Wrapper>
  )
};

UserReviewCommentListItem.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object),
  handleGetAllReply: PropTypes.func,
  handleCreateReply: PropTypes.func,
  handleDeleteComment: PropTypes.func,
  handleDeleteReply: PropTypes.func,
  uid: PropTypes.string,
};

UserReviewCommentListItem.defaultProps = {
  className: '',
  comments: [],
  replyComment: [],
};

export default UserReviewCommentListItem;
