/* eslint-disable prettier/prettier */
import React from 'react';
import { Popover, Button } from 'antd';
import styled from 'styled-components';

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

const ActionFeedback = () => {
  return (
    <Popover
      placement="right"
      content={(
        <ActionFeedbackWrapper>
          <Button type="link">Edit</Button>
          <Button type="link">Delete</Button>
          <Button type="link">Resolve</Button>
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
}

export default ActionFeedback
