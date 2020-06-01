import { storiesOf } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';
import { FiEdit, FiInfo } from 'react-icons/fi';

import Button from '.';

const Row = styled.div`
  padding: 20px;

  & + & {
    padding-top: 0;
  }
`;

storiesOf('Button', module)
  .add('default usage', () => <Button>Button</Button>)
  .add('loading', () => <Button loading>Button</Button>)
  .add('disabled', () => (
    <Button loading disabled>
      Button
    </Button>
  ))
  .add('size', () => (
    <>
      <Row>
        <Button size="small">Small</Button>
      </Row>
      <Row>
        <Button size="default">Default</Button>
      </Row>
      <Row>
        <Button size="large">Large</Button>
      </Row>
    </>
  ))
  .add('icon', () => (
    <>
      <Row>
        <Button size="small" backgroundColor="#475993" icon={<FiInfo />}>
          Info
        </Button>
      </Row>
      <Row>
        <Button size="small" icon={<FiEdit />}>
          Edit
        </Button>
      </Row>
      <Row>
        <Button size="default" backgroundColor="#475993" icon={<FiInfo />}>
          Info
        </Button>
      </Row>
      <Row>
        <Button size="default" icon={<FiEdit />}>
          Edit
        </Button>
      </Row>
      <Row>
        <Button size="large" backgroundColor="#475993" icon={<FiInfo />}>
          Info
        </Button>
      </Row>
      <Row>
        <Button size="large" icon={<FiEdit />}>
          Edit
        </Button>
      </Row>
    </>
  ));
