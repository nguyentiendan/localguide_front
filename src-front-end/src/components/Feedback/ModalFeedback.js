import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Modal, Spin, Input } from 'antd';
import PropTypes from 'prop-types';
import _ from 'lodash';

import * as API from '../../apis';
import Button from '../Button';
import Feedback from './index';

const { TextArea } = Input;

const ModalFeedback = ({ showModal, setShowModal, user, tour, id }) => {
  const [loading, setLoading] = useState(false);
  const [dataReply, setDataReply] = useState([]);
  const [dataFeedback, setDataFeedback] = useState([]);
  const [isFeedback, setIsFeedback] = useState(false);
  const [editFeedback, setEditFeedback] = useState({});
  const [editReply, setEditReply] = useState({});
  useEffect(() => {
    const fetchDataFeedback = async () => {
      if (showModal) {
        setLoading(true);
        let res = null;
        if (user.role === 3) {
          res = await API.handleGetAllFeedback({ uid: user.uid, id: tour?.rawID || id });
        } else {
          res = await API.getAllFeedbackOfGuide({ uid: user.uid, id });
        }
        const newData = res.data.map(item => {
          const newItem = { ...item };
          newItem.uuid = uuidv4();
          return newItem;
        });
        setDataFeedback(newData);
        setLoading(false);
      }
    };
    fetchDataFeedback();
  }, [
    setLoading,
    user?.uid,
    id,
    tour?.rawID,
    API.handleGetAllFeedback,
    setDataFeedback,
    showModal,
  ]);

  const handleCreateFeedback = async e => {
    const { data } = await API.handleCreateFeedback({
      uid: user.uid,
      tourId: tour?.rawID || id,
      content: e.target.value,
    });
    const newFeedback = { ...data[0] };
    newFeedback.uuid = uuidv4();
    setDataFeedback([...dataFeedback, newFeedback]);
  };

  const handleReplyFeedback = async (e, feedbackId) => {
    const { data } = await API.handleCreateReply({
      uid: user.uid,
      feedbackId,
      content: e.target.value,
    });
    const newFeedback = { ...data[0] };
    newFeedback.uuid = uuidv4();
    setDataReply([...dataReply, newFeedback]);
  };
  const handleGetAllReply = async idFeedback => {
    setLoading(true);
    const res = await API.handleGetAllReplyFeedback({ uid: user.uid, id: idFeedback });
    const newData = res.data.map(item => {
      const newItem = { ...item };
      newItem.uuid = uuidv4();
      return newItem;
    });
    setDataReply([...dataReply, ...newData]);
    setLoading(false);
  };

  const handleResolveFeedback = async idFeedback => {
    await API.handleResolveFeedback({ id: idFeedback });
  };
  const handleDeleteFeedback = async idFeedback => {
    const newDataRemove = _.remove(dataFeedback, item => {
      return item.ID !== idFeedback;
    });
    setDataFeedback(newDataRemove);
    await API.handleDeleteFeedback({ id: idFeedback });
  };
  const handleEditFeedback = idFeedback => {
    setEditFeedback({
      [idFeedback]: { id: idFeedback, value: editFeedback[idFeedback]?.value || '', isOpen: true },
    });
  };

  const handleDeleteReply = async idFeedback => {
    const newDataRemove = _.remove(dataReply, item => {
      return item.ID !== idFeedback;
    });
    setDataReply(newDataRemove);
    await API.handleDeleteReply({ id: idFeedback });
  };
  const handleEditReply = idReply => {
    setEditReply({
      [idReply]: { id: idReply, value: editReply[idReply]?.value || '', isOpen: true },
    });
  };

  return (
    <Modal
      title="Feedback"
      visible={showModal}
      onCancel={() => setShowModal(false)}
      footer={
        user?.role === 2 ? null : <Button onClick={() => setIsFeedback(true)}>New Feedback</Button>
      }
    >
      <Spin spinning={loading}>
        <Feedback
          feedback={dataFeedback}
          replyFeedback={dataReply}
          handleReplyFeedback={handleReplyFeedback}
          userUID={user.uid}
          handleGetAllReply={handleGetAllReply}
          handleDeleteFeedback={handleDeleteFeedback}
          handleResolveFeedback={handleResolveFeedback}
          handleEditFeedback={handleEditFeedback}
          editFeedback={editFeedback}
          setEditFeedback={setEditFeedback}
          editReply={editReply}
          setEditReply={setEditReply}
          handleDeleteReply={handleDeleteReply}
          handleEditReply={handleEditReply}
        />
        {isFeedback && (
          <TextArea
            rows={4}
            showCount
            maxLength={200}
            placeholder="Create feedback"
            onPressEnter={handleCreateFeedback}
            style={{ marginTop: 20 }}
          />
        )}
      </Spin>
    </Modal>
  );
};

ModalFeedback.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  user: PropTypes.shape({
    avatar: PropTypes.string,
    fullname: PropTypes.string,
    uid: PropTypes.string,
    role: PropTypes.number,
  }).isRequired,
  tour: PropTypes.shape({
    rawID: PropTypes.number,
  }),
  id: PropTypes.string,
};

ModalFeedback.defaultProps = {
  tour: {},
  id: '',
};

export default ModalFeedback;
