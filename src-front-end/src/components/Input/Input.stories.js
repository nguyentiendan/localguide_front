import React from 'react';
import { storiesOf } from '@storybook/react';
import { FiSearch } from 'react-icons/fi';

import Input from '.';

storiesOf('Input', module)
  .add('default', () => <Input />)
  .add('placeholder', () => <Input placeholder="Please enter your username" />)
  .add('label', () => <Input label="Username" />)
  .add('before icon', () => (
    <Input placeholder="Type something to search" beforeIcon={<FiSearch />} />
  ))
  .add('after icon', () => (
    <Input placeholder="Type something to search" afterIcon={<FiSearch />} />
  ))
  .add('loading', () => (
    <Input placeholder="Type something to search" loading afterIcon={<FiSearch />} />
  ))
  .add('message', () => <Input message="Succes message" />)
  .add('error', () => <Input message="Error message" hasError />);
