import React from 'react';
import { storiesOf } from '@storybook/react';

import Markdown from '.';

storiesOf('Markdown', module).add('default usage', () => <Markdown source="**Bold** `code`" />);
