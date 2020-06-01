import React from 'react';
import { storiesOf } from '@storybook/react';

import SectionHeader from '.';

storiesOf('SectionHeader', module)
  .add('default', () => <SectionHeader title="Stories" />)
  .add('subtitle', () => <SectionHeader title="Stories" subTitle="View all" />)
  .add('subtitle with href', () => (
    <SectionHeader title="Stories" subTitle="View all" subTitleHref="http://google.com" />
  ));
