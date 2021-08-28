import React from 'react';
import { Badge } from 'antd';
import styled from 'styled-components';

const Title = styled.span`
  padding: 0 20px;
`;

function TabTitle({ icon, title, badge }) {
  return (
    <Badge count={badge}>
      <Title>{title}</Title>
    </Badge>
  );
}

export default TabTitle;
