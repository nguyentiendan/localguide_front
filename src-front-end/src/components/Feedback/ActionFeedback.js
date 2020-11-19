/* eslint-disable prettier/prettier */
import React from 'react';
import { Popover, Button } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ActionFeedbackWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  && {
    .ant-btn-link {
      color: #555;
      padding: 0;
    }
  }
`;

const ActionFeedback = ({ handleDelete, id, handleResolve, handleEdit, disableResolve }) => {
  return (
    <Popover
      placement="right"
      content={(
        <ActionFeedbackWrapper>
          <Button type="link" onClick={() => handleEdit(id)}>Edit</Button>
          <Button type="link" onClick={() => handleDelete(id)}>Delete</Button>
          {!disableResolve && <Button type="link" onClick={() => handleResolve(id)}>Resolve</Button>}
        </ActionFeedbackWrapper>
      )}
      title={null}
      trigger="click"
    >
      <span style={{ marginLeft: 10, color: '#555', fontSize: '16px', cursor: 'pointer' }}>
        ...
      </span>
    </Popover>
  );
};

ActionFeedback.propTypes = {
  handleDelete: PropTypes.func,
  handleResolve: PropTypes.func,
  handleEdit: PropTypes.func,
  id: PropTypes.number.isRequired,
  disableResolve: PropTypes.bool,
};

ActionFeedback.defaultProps = {
  handleDelete: () => { },
  handleResolve: () => { },
  handleEdit: () => { },
  disableResolve: false,
};

export default ActionFeedback;
