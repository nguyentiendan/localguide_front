import React from 'react';
import { storiesOf } from '@storybook/react';

import Spinner from '.';

storiesOf('Spinner', module)
  .add('default', () => <Spinner />)
  .add('color', () => <Spinner color="#10abe2" />)
  .add('size', () => <Spinner size="2rem" />);
