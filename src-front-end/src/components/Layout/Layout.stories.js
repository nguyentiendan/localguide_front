import React from 'react';
import { storiesOf } from '@storybook/react';

import Header from './Header';

storiesOf('Layout', module).add('header', () => <Header siteTitle="Site title" />);
