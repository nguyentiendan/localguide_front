import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { FiMenu } from 'react-icons/fi';

import Menu from '../Menu';
import Dropdown from '.';

const Header = styled.div`
  padding: 14px;
  border-bottom: 1px solid #f6f6f6;
`;

const Wrapper = styled.div`
  margin: 0 auto;
  width: 2rem;
`;

storiesOf('Dropdown', module)
  .add('default usage', () => (
    <Dropdown trigger={<FiMenu />}>
      <Header>User menu</Header>
      <Menu>
        <Menu.Item>
          <a href="#">Profile</a>
        </Menu.Item>
        <Menu.Item danger>Logout</Menu.Item>
      </Menu>
    </Dropdown>
  ))
  .add('right', () => (
    <Wrapper>
      <Dropdown trigger={<FiMenu />} position="right">
        <Header>User menu</Header>
        <Menu>
          <Menu.Item>
            <a href="#">Profile</a>
          </Menu.Item>
          <Menu.Item danger>Logout</Menu.Item>
        </Menu>
      </Dropdown>
    </Wrapper>
  ));
