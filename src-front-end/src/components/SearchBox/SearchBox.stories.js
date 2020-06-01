import React from 'react';
import { storiesOf } from '@storybook/react';

import SearchBox from '.';

storiesOf('SearchBox', module).add('default usage', () => <SearchBox placeholder="Tìm kiếm" />);
