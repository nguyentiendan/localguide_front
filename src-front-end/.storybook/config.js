import React from 'react';
import styled from 'styled-components';
import { configure, addDecorator } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

const Wrapper = styled.div`
  padding: 20px 40px;
`;

const context = require.context('../src/components', true, /\.stories\.js$/);

const loadStories = () => {
  context.keys().forEach(filename => context(filename));
};

addDecorator(withInfo({
  inline: true,
  header: false,
}));

addDecorator(story => <Wrapper>{story()}</Wrapper>);

// Gatsby's Link overrides:
// Gatsby defines a global called ___loader to prevent its method calls from creating console errors you override it here
global.___loader = {
  enqueue: () => {},
  hovering: () => {},
};
// Gatsby internal mocking to prevent unnecessary errors in storybook testing environment
global.__PATH_PREFIX__ = '';
// This is to utilized to override the window.___navigate method Gatsby defines and uses to report what path a Link would be taking us to if it wasn't inside a storybook
window.___navigate = pathname => {
  action('NavigateTo:')(pathname);
};

configure(loadStories, module);
