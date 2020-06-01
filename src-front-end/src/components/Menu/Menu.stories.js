import React from 'react';
import { storiesOf } from '@storybook/react';
import { Link } from 'gatsby';

import Menu from '.';

storiesOf('Menu', module).add('default usage', () => (
  <Menu>
    <Menu.Item>
      <Link to="/profile">Profile</Link>
    </Menu.Item>
    <Menu.Item danger>Logout</Menu.Item>
  </Menu>
));
