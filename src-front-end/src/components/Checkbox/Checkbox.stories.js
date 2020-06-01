import React from 'react';
import { storiesOf } from '@storybook/react';

import Checkbox from '.';

const label = (
  <span>
    Welcome!
    <a href="#"> Nha</a>
  </span>
);

storiesOf('Checkbox', module)
  .add('default', () => <Checkbox label="Check box" />)
  .add('squared', () => <Checkbox squared label="Check box" />)
  .add('custom label', () => <Checkbox label={label} />);
