import React from 'react';
import { navigate } from 'gatsby';
import styled from 'styled-components';
import { Result, Button } from 'antd';

const Wrapper = styled.div`
  max-width: 19rem;
  margin: 3rem auto;
  text-align: center;
`;

const NotFound = () => {
  return (
    <Wrapper>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={() => navigate('/')}>
            Back Home
          </Button>
        }
      />
    </Wrapper>
  );
};

export default NotFound;
